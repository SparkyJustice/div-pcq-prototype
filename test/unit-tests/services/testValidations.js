const { expect } = require(__dirname + 'test/util/chai');
const validations = require(__dirname + 'app/services/validations');

describe('Validations', () => {
  it('exposes express validator for consumption by app.js', () => {
    expect(validations).to.be.a('function');
  });
});
