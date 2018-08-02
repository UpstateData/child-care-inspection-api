const express = require('express');
const request = require('request');
var cheerio = require('cheerio');
var tabletojson = require('tabletojson');

// Base URL for the web site that shows day care & child care inspection data.
const url_base = 'https://apps.netforge.ny.gov/dcfs/Profile/Index/';

const app = express()

app.get('/', (req, res) => {
    res.status(400).json({ error: 'Append URL with facility ID' });
});

// e.g., {api-endpoint/9614}
app.get('/:id', (req, res) => {

    // rejectUnauthorized used because the cert for the website is not set up properly.
    request({ url: url_base + req.params.id, rejectUnauthorized: false }, (error, response, body) => {
        if (!error && response.statusCode == 200) {

            // Parse the HTML response
            $ = cheerio.load(body);

            // Find the <div> with the compliance results.
            let complianceHistory = $('#compliancehistoryDivImg')
                .find('table')
                .next()
                .html();

            // $.find() removes the table element, so add it back before passing to tabletojson.
            let complianceTable = '<table>' + complianceHistory + '</table>';
            let responseJson = tabletojson.convert(complianceTable);

            // If there are compliance results, create a new object to return.
            if (responseJson.length > 0) {
                let complianceResults = new Object();
                complianceResults.fields = responseJson[0].splice(0, 1);
                complianceResults.results = responseJson[0].splice(1, (responseJson[0].length - 5));
                res.json(complianceResults);
            }
            // Otherwise, compliance history table does not exist.
            else {
                res.json({ response: 'No compliance history found' });
            }
        }
        else {
            res.status(500).json(error);
        }
    });
});

app.listen(3000);
