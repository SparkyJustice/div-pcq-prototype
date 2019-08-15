const { expect } = require('test/util/chai');
const Field = require('app/steps/Field');

describe('Field', () => {

  describe('#constructor', () => {
    it('returns Field with undefined value and errorMessage', () => {
      // This is by design so that calls to these params act
      // as the existing tests expect them to return undefined
      expect(new Field().value).to.eql(undefined);
      expect(new Field().errorMessage).to.eql(undefined);
    });

    it('constructs a Field', () => {
      expect(new Field('foo', 'error').value).to.eql('foo');
      expect(new Field('foo', 'error').errorMessage).to.eql('error');
    });
  });

  describe('#error', () => {
    it('returns false when no errorMessage', () => {
      const field = new Field();

      expect(field.error).to.be.false;
    });

    it('returns true when errorMessage', () => {
      const field = new Field();
      field.errorMessage = 'An Error';

      expect(field.error).to.be.true;
    });

    it('returns false if errorMessage is badly set', () => {
      expect(new Field('foo', []).error).to.be.false;
    });
  });

  describe('#looksLike', () => {
    it('returns true for a Field', () => {
      const field = new Field('foo', 'An error');
      expect(Field.looksLike(field)).to.be.true;
    });

    it('returns true for a deserialized Field', () => {
      const field = new Field('foo', 'An error');
      const fieldAsObj = JSON.parse(JSON.stringify(field));
      expect(Field.looksLike(fieldAsObj)).to.be.true;
    });

    it('returns true for an object with Field like params', () => {
      const field = { value: 'foo', errorMessage: 'An error' };
      expect(Field.looksLike(field)).to.be.true;
    });

    it('returns true for an object with an errorMessage', () => {
      const field = { errorMessage: 'An error' };
      expect(Field.looksLike(field)).to.be.true;
    });

    it('returns true for an object with a value', () => {
      const field = { value: 'foo' };
      expect(Field.looksLike(field)).to.be.true;
    });

    it('returns false for anything else', () => {
      expect(Field.looksLike('a string')).to.be.false;
      expect(Field.looksLike({ bar: 'baz' })).to.be.false;
      expect(Field.looksLike(1)).to.be.false;
      expect(Field.looksLike(undefined)).to.be.false;
      expect(Field.looksLike([])).to.be.false;
    });
  });

  describe('#parse', () => {
    it('returns the field you pass it', () => {
      const f = new Field('foo', 'An error');
      const field = Field.parse(f);
      expect(field).to.be.instanceof(Field);
      expect(field.value).to.eql(f.value);
      expect(field.errorMessage).to.eql(f.errorMessage);
    });

    it('returns a new field for a object (value, errorMessage)', () => {
      const f = { value: 'foo', errorMessage: 'An error'};
      const field = Field.parse(f);
      expect(field).to.be.instanceof(Field);
      expect(field.value).to.eql(f.value);
      expect(field.errorMessage).to.eql(f.errorMessage);
    });

    it('returns a new field for a object (value)', () => {
      const f = { value: 'foo' };
      const field = Field.parse(f);
      expect(field).to.be.instanceof(Field);
      expect(field.value).to.eql(f.value);
      expect(field.errorMessage).to.eql(f.errorMessage);
    });

    it('returns a new field for a object (errorMessage)', () => {
      const f = { errorMessage: 'An error'};
      const field = Field.parse(f);
      expect(field).to.be.instanceof(Field);
      expect(field.value).to.eql(f.value);
      expect(field.errorMessage).to.eql(f.errorMessage);
    });

    it('returns undefined for non field likes', () => {
      expect(Field.parse(undefined)).to.eql(undefined);
      expect(Field.parse([])).to.eql(undefined);
      expect(Field.parse({})).to.eql(undefined);
      expect(Field.parse('foo')).to.eql(undefined);
    });
  });
});
