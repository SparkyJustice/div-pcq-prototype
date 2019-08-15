var restler = require('restler');

var Url = function (url) {
  this.url = url;
  this.params = [];
};

Url.prototype.withParam = function (param, value) {
  if (typeof value !== 'undefined') {
    this.params.push({
      param: param,
      value: value
    });
  }
  return this;
};

Url.prototype.toString = function () {
  var str = this.url;
  var splitter = '?';
  this.params.forEach(function (item) {
    str += splitter + item.param + '=' + item.value;
    splitter = '&';
  });
  return str;
};

var addressLookup = module.exports = {
  key: function () {
    if (typeof process.env.PA_KEY === 'undefined') {
      throw new Error('No PA_KEY set');
    }
    return process.env.PA_KEY;
  },
  url: function (postcode) {
    return new Url('http://services.postcodeanywhere.co.uk/CapturePlus/Interactive/Find/v2.10/json3.ws')
        .withParam('Key', addressLookup.key())
        .withParam('SearchTerm', postcode)
        .toString();
  },
  lookup: function (postcode, callback) {
    var url = addressLookup.url(postcode);
    restler.get(url)
        .on('complete', function (result) {
          var addresses = result.Items.map(function (item) {
            return item.Text;
          });
          callback(addresses);
        });
  },
  fakeLookup: function(postcode, callback) {
   var addresses = [
       {id: '1', address: address('24-25', 'Hand Court', 'London')},
       {id: '2', address: address('Childreach International', '23A Hand Court', 'London')},
       {id: '3', address: address('Datapact Ltd', '18 Hand Court', 'London')},
       {id: '4', address: address('Experience lab', '22 Hand Court', 'London')},
       {id: '5', address: address('Flat 1', '23 Hand Court', 'London')},
       {id: '6', address: address('Flat 2', '23 Hand Court', 'London')},
       {id: '7', address: address('Flat 3', '23 Hand Court', 'London')},
       {id: '8', address: address('Flat 4', '23 Hand Court', 'London')},
       {id: '9', address: address('Flat 5', '23 Hand Court', 'London')},
       {id: '10', address: address('Flat 6', '23 Hand Court', 'London')},
       {id: '11', address: address('Gorrie Whitson Chartered Accountants', '18 Hand Court', 'London')},
       {id: '12', address: address('Serco', '22 Hand Court', 'London')},
       {id: '13', address: address('The Dominican Republic Embassy', '18 Hand Court','London')}];
    callback(addresses);
  }
};

var address = function(street1, street2, county) {
    return {
        street1: street1,
        street2: street2,
        county: county,
        display: [street1, street2, county].filter(function (val) {
            return val;
        }).join(', ')
    };
};


