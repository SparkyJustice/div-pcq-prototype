module.exports = class Errors {

  constructor() {
     this.errors = [];
  }

  addError (fieldName, value, message) {
    this.errors.push (
      {
        param: fieldName,
        msg: message,
        value: value
      }
    );
  }

  getList () {
    return this.errors;
  }
};
