var lodash = require('lodash'); //required for the object merging that happens below
const config = require('app/config.js'),
      packageJson = require('package.json'),
      relation = require('app/utils/DivorceRelation');

module.exports = (req, res, next) => {
    function expand(mystr, value)
    // this function expands object strings (in dot notation) passed in the url query,
    // and turns them into objects
    // eg. claimCosts.agreesToPay=Yes
    // This might be passed in the url and this function will turn it into an object.
    // See code further down....
    // Borrowed from https://stackoverflow.com/questions/31464393/javascript-how-to-create-an-object-from-a-dot-separated-string
    //
{
    var items = mystr.split(".") // split on dot notation
    var output = {} // prepare an empty object, to fill later
    var ref = output // keep a reference of the new object

    //  loop through all nodes, except the last one
    for(var i = 0; i < items.length - 1; i ++)
    {
        ref[items[i]] = {} // create a new element inside the reference
        ref = ref[items[i]] // shift the reference to the newly created object
    }

    ref[items[items.length - 1]] = value // apply the final value

    return output // return the full object
}
  res.locals.asset_path = '/public/';
  res.locals.session = req.session;
  res.locals.query = req.query;
  // go through each string passed in the query, turn it into an object and merge it with the local session values
  // this allows you to set or override values in the session to affect the behaviour of a page
  // the values you change won't persist unless you include the special key persist=Yes in the url
  for (key in req.query)
    {
      res.locals.session = lodash.merge(expand(key, req.query[key]), res.locals.session);
      // Make the passed values persist in the session, overwriting any values that are already there and staying on subsequent pages
      if (req.query.persist == "Yes"){
          lodash.merge(req.session, expand(key, req.query[key]));
      }
    }

  res.locals.serviceName = req.session.serviceName;
  res.locals.cookieText = config.cookieText;
  res.locals.releaseVersion = 'v' + packageJson.version;
  res.locals.path = encodeURIComponent(req.path);

  res.locals.petsHusbandOrWife = function() {
    return relation.petsHusbandOrWife(req.session);
  };
  res.locals.respsHusbandOrWife = function() {
    return relation.respsHusbandOrWife(req.session);
  };
  res.locals.petsName = function() {
    return relation.petsName(req.session);
  };
  res.locals.respsName = function() {
    return relation.respsName(req.session);
  };
  res.locals.petsSpouseName = function() {
    return relation.petsSpouseName(req.session);
  };
  res.locals.respsSpouseName = function() {
    return relation.respsSpouseName(req.session);
  };
  res.locals.petsEmail = function() {
    return relation.petsEmail(req.session);
  };
  res.locals.respsEmail = function() {
    return relation.respsEmail(req.session);
  };
  res.locals.husbandOrWife = function() {
    return relation.divorceWho(req.session);
  };
  next();
};
