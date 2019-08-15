const { expect } = require('test/util/chai');
const { middleware } = require('app/services/flags');


function test(req, expected) {
  middleware(req, { locals: {} }, () => {});
  expect(req.flags.validation).to.eql(expected);
}

describe('flags#validation', () => {
  it('returns true if flag not set', () => {
    test({ session: { Flags: {} } }, true);
  });
  it('returns true if flags not set', () => {
    test({ session: {} }, true);
  });
  it('returns true if session not set', () => {
    test({}, true);
  });
  it('returns false if flag set to false', () => {
    test({ session: { Flags: { validation: 'false' } } }, false);
  });
  it('returns true if flag set to true', () => {
    test({ session: { Flags: { validation: 'true' } } }, true);
  });
});
