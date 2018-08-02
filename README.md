# Child Care Inspection API

A small app to provide API access to day care and child care facility inspection data managed by the New York State Office of Children and Family Services (OCFS).

New York State provides [open data on licensed and registered child care programs](https://data.ny.gov/Human-Services/Child-Care-Regulated-Programs-API/fymg-3wv3) on it's open data portal, but facility inspection data and compliance history is maintained in an [OCFS web application](https://apps.netforge.ny.gov/dcfs/). This web app provides a facility lookup feature, but only provides the data as HTML (and clunky markup at that).

This project scrapes the underlying compliance data from the OCFS web app based on facility ID. The hope is that this will support development of a more user friendly day care lookup tool for parents, and allow this data to be more easily accessed by other applications.

## Contributing

To contribute, open an [issue](https://github.com/UpstateData/child-care-inspection-api/issues) or submit a [pull request](https://github.com/UpstateData/child-care-inspection-api/pulls).

## Using this app

To use this app, clone the repo and install dependencies:

```bash
~$ git clone https://github.com/UpstateData/child-care-inspection-api.git && cd child-care-inspection-api
~$ npm install
```

Access the API by passing a facility ID as part of the route: `http://127.0.0.1:3000/9614`

Sample response:

```json
{
  "fields": [
    {
      "0": "Date",
      "1": "Regulation",
      "2": "Brief Description",
      "3": "Compliance Status as of last inspection"
    }
  ],
  "results": [
    {
      "0": "Jun 14, 2018",
      "1": "416.15(c)(13)",
      "2": "Must have on file a daily schedule documenting the arrival and departure times of each caregiver, employees and volunteers",
      "3": "Corrected"
    },
    {
      "0": "Sep 27, 2017",
      "1": "416.11(a)(7)",
      "2": "With the exception of children meeting the criteria of section 416.11(a)(5) or (6), children enrolled in the child day care must remain current with their immunizations in accordance with the current schedule for required immunizations established in the New York State Public Health Law",
      "3": "Corrected"
    },
    {
      "0": "Jun 8, 2017",
      "1": "416.15(c)(13)",
      "2": "Must have on file a daily schedule documenting the arrival and departure times of each caregiver, employees and volunteers",
      "3": "Corrected"
    },
    {
      "0": "Dec 19, 2016",
      "1": "416.4(d)",
      "2": "In addition to a smoke detector on each floor, there must be a smoke detector located either within rooms where children nap, or in adjoining rooms. In the case of rooms used for napping or sleeping which have doors, a smoke detector is required inside that room.",
      "3": "Corrected"
    },
    {
      "0": "Dec 19, 2016",
      "1": "416.11(c)(2)(i)",
      "2": "Health care plan must describe how a daily health check of each child for any indication of illness, injury, abuse or maltreatment will be conducted and documented",
      "3": "Corrected"
    }
  ]
}

```