const { expect } = require('test/util/chai');
const validations = require('app/services/validations');

describe('Validations', () => {
  it('exposes express validator for consumption by app.js', () => {
    expect(validations).to.be.a('function');
  });
});
