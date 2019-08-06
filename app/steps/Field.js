const { like: isLike,
        object: isObject,
        nonEmptyString: isNonEmpty,
        instance: isInstance } = require('check-types');

/** Class that represents a field in an HTML form */
module.exports = class Field {

  /**
   * @param value {string} the contents of the field
   * @param errorMessage {string} the error to display on this field in the page */
  constructor(value=undefined, errorMessage=undefined) {
    this.errorMessage = errorMessage;
    this.value = value;
  }

  /**
   * @return {boolean} if there is a problem with the value of this field */
  get error() {
    return isNonEmpty(this.errorMessage);
  }

  /**
   * Could this object be parsed as a Field
   * Useful for filtering lists of objects before parsing
   * @return {boolean} can be parsed as a Field */
  static looksLike(obj) {
    return isObject(obj) && (
      isInstance(obj, Field) ||
      isLike(obj, { value: '' }) ||
      isLike(obj, { errorMessage: '' })
    );
  }

  /**
   * Parse the object as a Field or return it if it is a Field
   * @param {object} the object to parse
   * @return {Field} the object or a Field parsed from the object */
  static parse(obj) {
    if (!Field.looksLike(obj)) return undefined;
    if (isInstance(obj, Field)) return obj;
    return new Field(obj.value, obj.errorMessage);
  }
};
