const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const tabletojson = require('tabletojson');

// Import config settings.
const config = require('./config');

const app = express()

app.get('/', (req, res) => {
    res.status(400).json({ error: 'Append URL with facility ID' });
});

// e.g., {api-endpoint/9614}
app.get('/:id', (req, res) => {

    // rejectUnauthorized used because the cert for the website is not set up properly.
    request({ url: config.settings.url_base + req.params.id, rejectUnauthorized: false }, (error, response, body) => {
        if (!error && response.statusCode == 200) {

            let parsedResponse = parseResponse(body);
            let responseJson = tabletojson.convert(parsedResponse);

            // If there are compliance results, create a new object to return.
            if (responseJson.length > 0) {
                let complianceResults = new Object();
                complianceResults.id = req.params.id;
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

app.listen(config.settings.port);

// Parse the HTML response.
parseResponse = (body) => {
    
    $ = cheerio.load(body);

    // Find the <div> with the compliance results.
    let complianceHistory = $('#compliancehistoryDivImg')
        .find('table')
        .next()
        .html();

    // $.find() removes the table element, so add it back before passing to tabletojson.
    let complianceTable = '<table>' + complianceHistory + '</table>';
    return complianceTable;
};
