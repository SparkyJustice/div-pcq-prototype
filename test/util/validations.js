const validations = require(__dirname + 'app/services/validations');

function stubReq({ body } = {}) {
  const req = {
    body: body || {},
    query: {},
    params: {},
    param: name => this.params[name]
  };
  validations(req, {}, () => {});
  return req;
}

module.exports = {
  stubReq
};
