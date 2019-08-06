var request = require('request');
var mockData = require('./postcodeLookupMockData.json');
module.exports = function (req, res) {

  if(process.env.POST_CODE_ACCESS_TOKEN){

    request({
      url: "https://postcodeinfo.service.justice.gov.uk/addresses/?postcode=" + req.query.postcode,
      headers: {
        'Authorization': process.env.POST_CODE_ACCESS_TOKEN
      }
    }, function(err, resp){
      res.send(resp.body);
    });

  }else{

    res.send(mockData);

  }



}