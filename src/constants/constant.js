const Constant = {
    geojson : {
        'type': 'FeatureCollection',
        'features': [
          {
            'id': 1,
            'type': 'feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-77.032, 38.913]
            },
            'properties': {
              'title': 'Washington DC Station',
              'location': 'Washington, D.C.',
              'address' : "123 Test Harbour Blvd Foster City"
            }
          },{
            'id': 2,
            'type': 'entertainment',
            'geometry': {
              'type': 'Point',
              'coordinates': [-122.414, 37.776]
            },
            'properties': {
              'title': 'Red Hot Chilli Pepper',
              'location': 'San Francisco, California',
              'address' : "6565-B 20th Ave San Mateo"
            },
            "details": {
              "contact": "100-345-4444",
              "time" : "1666711800000-1666755000000",
              "website": "espetus.com"
            }
          },{
            'id': 3,
            'type': 'entertainment',
            'geometry': {
              'type': 'Point',
              'coordinates': [-114.414, 35.776]
            },
            'properties': {
              'title': 'Rangoon Ruby',
              'location': 'Los Angeles, California',
              'address' : "855-B HeatherStone Dr San Ramon"
            },
            "details": {
              "contact": "333-455-1200",
              "time" : "1666715400000-1666753200000",
              "website": "turbent.com"
            }
          },{
            'id': 4,
            'type': 'entertainment',
            'geometry': {
              'type': 'Point',
              'coordinates': [-104.414, 35.776]
            },
            'properties': {
              'title': 'chevron-76',
              'location': 'Santa Fe, Texas',
              'address' : "192 S-B Street San Francisco"
            },
             "details": {
              "contact": "100-444-4444",
              "time" : "1666715400000-1666753200000",
              "website": "joggers.com"
            }
          }
        ]
      },
      cancelStyles : {
          border: "1px solid #1361B0",
          background: "#EDF3F9", 
          color:"#1361B0"
      },
      getStyles : {
          color: "#fff",
          background: "#075096"
      }
  }
  export default Constant;
