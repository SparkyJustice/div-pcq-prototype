const { expect } = require('test/util/chai');
const Context = require('app/steps/Context');

describe('Context', () => {

  describe('#values', () => {
    it('returns values from Context', () => {
      const origValues = { foo: 'foo' };
      const fields = new Context().withValues(origValues);
      const values = fields.values();

      expect(values).to.eql(origValues);
    });

    it('doesn\'t return keys that only have errors', () => {
      const errors = [{ msg: 'Not provided', param: 'foo' }];
      const fields = new Context();
      fields.withErrors(errors);
      const values = fields.values();

      expect(values).to.not.have.key('foo');
    });
  });

  describe('#errors', () => {
    it('returns errors in the express-validator style', () => {
      const errors = [{ param: 'foo', msg: 'An Error', value: undefined }];
      const fields = new Context().withErrors(errors);

      expect(fields.errors()).to.eql(errors);
    });
    it('doesn\'t return things that aren\'t errors', () => {
      const fields = new Context().withValues({ foo: 'foo' });

      expect(fields.errors()).to.eql([]);
    });
  });

  describe('#merge', () => {
    it('merges two Context together', () => {
      const other = new Context().withValues({ foo: 'foo' });
      const fields = new Context();
      fields.merge(other);

      expect(fields).to.eql(other);
    });

    it('handles Context that have been serialized', () => {
      const other = new Context().withValues({ foo: 'foo' });
      const otherAsObj = JSON.parse(JSON.stringify(other));
      const fields = new Context();
      fields.merge(otherAsObj);

      expect(fields).to.eql(other);
    });
  });

  describe('#withValues', () => {
    it('adds all keys in the object passed to fields', () => {
      const fields = new Context();
      fields.withValues({ foo: 'foo', bar: 1, baz: { baz: 'baz' } });

      expect(fields.foo.value).to.eql('foo');
      expect(fields.bar.value).to.eql(1);
      expect(fields.baz.value).to.eql({ baz: 'baz' });
    });

    it('prefers new values over old values', () => {
      const fields = new Context();

      fields.withValues({ foo: 'foo' });
      expect(fields.foo.value).to.eql('foo');
      fields.withValues({ foo: 'bar' });
      expect(fields.foo.value).to.eql('bar');
    });

    it('protects itself from being badly called', () => {
      const fields = new Context();

      expect(() => { fields.withValues(undefined); }).to.not.throw(Error);
    });

    it('returns itself so we can chain calls', () => {
      const fields = new Context();

      const f = fields.withValues({ foo: 'foo' });
      expect(f).to.eql(fields);
    });
  });

  describe('#withErrors', () => {
    it('adds error messages to fields that exist', () => {
      const fields = new Context();
      fields.withValues({ foo: 'foo', bar: 'bar' });
      fields.withErrors([
        { param: 'foo', msg: 'There was an error' },
        { param: 'bar', msg: 'You failed' }
      ]);

      expect(fields.foo.errorMessage).to.eql('There was an error');
      expect(fields.foo.value).to.eql('foo');
      expect(fields.bar.errorMessage).to.eql('You failed');
      expect(fields.bar.value).to.eql('bar');
    });
    it('maintains the value of fields that exist', () => {
      const fields = new Context();
      fields.withValues({ foo: 'foo', bar: 'bar' });
      fields.withErrors([
        { param: 'foo', msg: 'There was an error' },
        { param: 'bar', msg: 'You failed' }
      ]);

      expect(fields.foo.value).to.eql('foo');
      expect(fields.bar.value).to.eql('bar');
    });
    it('overrides the old value with the error value', () => {
      const fields = new Context();
      fields.withValues({ foo: 'foo', bar: 'bar' });
      fields.withErrors([
        { param: 'foo', msg: 'There was an error', value: 'notfoo' },
        { param: 'bar', msg: 'You failed', value: 'notbar' }
      ]);

      expect(fields.foo.value).to.eql('notfoo');
      expect(fields.bar.value).to.eql('notbar');
    });

    it('returns itself so that we can chain calls', () => {
      const fields = new Context();

      const f = fields.withErrors([
        { param: 'foo', msg: 'There was an error', value: 'notfoo' }
      ]);
      expect(f).to.eql(fields);
    });

    it('protects itself from being badly called', () => {
      const fields = new Context();

      expect(() => { fields.withErrors(undefined); }).to.not.throw(Error);
    });

    it('protects itself from express-validators returning false', () => {
      const fields = new Context();

      expect(() => { fields.withErrors(false); }).to.not.throw(Error);
    });
  });

  describe('#error', () => {
    it('adds a field and attaches an error to it', () => {
      const fields = new Context();
      expect(fields.foo).to.eql(undefined);

      fields.error('foo', 'There was an error');
      expect(fields).to.have.key('foo');
      expect(fields.foo.errorMessage).to.eql('There was an error');
    });
    it('doesn\'t delete an existing value', () => {
      const fields = new Context();
      fields.withValues({ foo: 'foo' });
      fields.error('foo', 'There was an error');

      expect(fields.foo.value).to.eql('foo');
    });
    it('returns itself so that we can chain', () => {
      const fields = new Context();
      const f = fields.error('foo', 'There was an error');

      expect(f).to.eql(fields);
    });
  });
});
