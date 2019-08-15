const { expect } = require('test/util/chai');
const Errors = require('app/utils/Errors');

describe('Errors', () => {

  describe('#constructor', () => {
    it('initializes with the proper values', () => {
      const errors = new Errors();

      expect(errors.errors).to.eql([]);
    });
  });

  describe('#addError', () => {
    it('adds an error object when values are valid', () => {
      const errors = new Errors();
      errors.addError('fieldName', 'value', 'message');

      expect(errors.errors.length).to.eql(1);
      expect(errors.errors[0]).to.eql({
        param: 'fieldName',
        msg: 'message',
        value: 'value'
      });
    });
  });

  describe('#getList', () => {
    it('returns list of errors', () => {
      const errors = new Errors();
      errors.addError('fieldName1', 'value1', 'message1');
      errors.addError('fieldName2', 'value2', 'message2');
      const result = errors.getList();

      expect(result.length).to.eql(2);
      expect(result[0]).to.eql({
        param: 'fieldName1',
        msg: 'message1',
        value: 'value1'
      });
      expect(result[1]).to.eql({
        param: 'fieldName2',
        msg: 'message2',
        value: 'value2'
      });
    });
  });
});
