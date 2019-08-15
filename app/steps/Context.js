const Field = require('app/steps/Field');
const { array: isArray, string: isString } = require('check-types');

/**
 * Represents the context of fields needed to render or validate an html form
 * Acts as a shared common ground between express-validator (until we get rid
 * of it) and the request body that gets sent by an html form.
 * */
module.exports = class Context {

  /**
   * Add an error to a field
   * @param key {string} The field name to attach the error to.
   *                     This doesn't have to exist yet.
   * @param message {string} The error message to attach to the field. */
  error(key, message) {
    this[key] = this[key] || new Field();
    this[key].errorMessage = message;
    return this;
  }

  /**
   * Whether any fields in the Context have errors attached
   * @return {boolean} True if any field has an error */
  hasErrors() {
    return Context.fields(this).some(({ field }) => field.error);
  }

  /**
   * Merge the fields of two Contexts together
   * @param other {Context} The other Context to merge with this one */
  merge(other = new Context()) {
    Context.fields(other).forEach(({ key, field }) => {
      this[key] = field;
    });
    return this;
  }

  /**
   * Add values to fields, or create new fields with those values
   * @param values {object} key->value pairs of fields to add/modify */
  withValues(values = {}) {
    Object.keys(values).forEach(key => {
      this[key] = this[key] || new Field();
      this[key].value = values[key];
    });
    return this;
  }

  /**
   * @return {object} field->value pairs for all fields in the Context */
  values() {
    const values = {};
    Context.fields(this)
      .filter(({ field }) => isString(field.value) || isArray(field.value))
      .forEach(({ key, field }) => {
        values[key] = field.value;
      });
    return values;
  }

  /**
   * Add errors to fields, or create new fields with those errors
   * @param errors {array} express-validator style errors array */
  withErrors(errors = []) {
    if (!isArray(errors)) return this;
    errors.forEach(error => {
      const { param, msg, value } = error;
      this[param] = this[param] || new Field();
      this[param].errorMessage = msg;
      this[param].value = value || this[param].value;
    });
    return this;
  }

  /**
   * @return {array} express-validator style errors array for all fields */
  errors() {
    return Context.fields(this)
      .filter(({ field }) => field.error)
      .map(({ key, field }) => {
        return {
          param: key,
          msg: field.errorMessage,
          value: field.value
        };
      });
  }

  /**
   * Get all the fields of an object
   * @param obj {object} An object with fields (or field likes) attached to it
   * @return {array(key, field)} A list of field names and parsed fields */
  static fields(obj) {
    return Object.keys(obj)
      .filter(key => Field.looksLike(obj[key]))
      .map(key => {
        return { key: key, field: Field.parse(obj[key]) };
      });
  }
};
