const { expect } = require('test/util/chai');
const DateValidator = require('app/validators/DateValidator');

describe('DateValidator', () => {
  const field = (val) => { return { value: val }; };

  describe('#constructor', () => {
    it('initializes with the fields correctly', () => {
      const day = field(1),
            month = field(1),
            year = field(1);
      const dateValidator = new DateValidator(day, month, year);

      expect(dateValidator.day).to.eql(day.value);
      expect(dateValidator.month).to.eql(month.value);
      expect(dateValidator.year).to.eql(year.value);
    });
    it('initializes even if fields are not present', () => {
      const dateValidator = new DateValidator();

      expect(dateValidator.day).to.eql(undefined);
      expect(dateValidator.month).to.eql(undefined);
      expect(dateValidator.year).to.eql(undefined);
    });
    it('initializes even if fields don\'t have a value', () => {
      const dateValidator = new DateValidator({}, {}, {});

      expect(dateValidator.day).to.eql(undefined);
      expect(dateValidator.month).to.eql(undefined);
      expect(dateValidator.year).to.eql(undefined);
    });
  });

  describe('#dayMissing', () => {
    const test = (fields, expects = () => {}) => {
      const date = new DateValidator(fields.day, fields.month, fields.year);
      return (done) => {
        expects(date);
        done();
      };
    };
    it('returns true if not provided (empty)', test(
      {},
      date => expect(date.dayMissing()).to.be.true
    ));
    it('returns true if not provided (undefined)', test(
      { day: field(undefined) },
      date => expect(date.dayMissing()).to.be.true
    ));
    it('returns true if not provided (empty string)', test(
      { day: field('') },
      date => expect(date.dayMissing()).to.be.true
    ));
    it('returns false if provided', test(
      { day: field('1') },
      date => expect(date.dayMissing()).to.be.false
    ));
  });

  describe('#monthMissing', () => {
    const test = (fields, expects = () => {}) => {
      const date = new DateValidator(fields.day, fields.month, fields.year);
      return (done) => {
        expects(date);
        done();
      };
    };
    it('returns true if not provided (empty)', test(
      {},
      date => expect(date.monthMissing()).to.be.true
    ));
    it('returns true if not provided (undefined)', test(
      { month: field(undefined) },
      date => expect(date.monthMissing()).to.be.true
    ));
    it('returns true if not provided (empty string)', test(
      { month: field('') },
      date => expect(date.monthMissing()).to.be.true
    ));
    it('returns false if provided', test(
      { month: field('1') },
      date => expect(date.monthMissing()).to.be.false
    ));
  });

  describe('#yearMissing', () => {
    const test = (fields, expects = () => {}) => {
      const date = new DateValidator(fields.day, fields.month, fields.year);
      return (done) => {
        expects(date);
        done();
      };
    };
    it('returns true if not provided (empty)', test(
      {},
      date => expect(date.yearMissing()).to.be.true
    ));
    it('returns true if not provided (undefined)', test(
      { year: field(undefined) },
      date => expect(date.yearMissing()).to.be.true
    ));
    it('returns true if not provided (empty string)', test(
      { year: field('') },
      date => expect(date.yearMissing()).to.be.true
    ));
    it('returns false if provided', test(
      { year: field('1') },
      date => expect(date.yearMissing()).to.be.false
    ));
  });

  describe('#notAnswered (and #answered)', () => {
    const test = (fields, expects = () => {}) => {
      const date = new DateValidator(fields.day, fields.month, fields.year);
      return (done) => {
        expects(date);
        done();
      };
    };
    it('returns true if all fields not provided (empty)', test(
      {},
      date => {
        expect(date.notAnswered()).to.be.true;
        expect(date.answered()).to.be.false;
      }
    ));
    it('returns true if all fields not provided (undefined)', test(
      { day: field(undefined), month: field(undefined), year: field(undefined) },
      date => {
        expect(date.notAnswered()).to.be.true;
        expect(date.answered()).to.be.false;
      }
    ));
    it('returns true if all fields not provided (empty string)', test(
      { day: field(''), month: field(''), year: field('') },
      date => {
        expect(date.notAnswered()).to.be.true;
        expect(date.answered()).to.be.false;
      }
    ));
    it('returns false if only year field provided', test(
      { year: field('1') },
      date => {
        expect(date.notAnswered()).to.be.false;
        expect(date.answered()).to.be.false;
      }
    ));
    it('returns false if only month field provided', test(
      { month: field('1') },
      date => {
        expect(date.notAnswered()).to.be.false;
        expect(date.answered()).to.be.false;
      }
    ));
    it('returns false if only day field provided', test(
      { day: field('1') },
      date => {
        expect(date.notAnswered()).to.be.false;
        expect(date.answered()).to.be.false;
      }
    ));
    it('returns false if all fields provided', test(
      { day: field('1'), month: field('12'), year: field('1999') },
      date => {
        expect(date.notAnswered()).to.be.false;
        expect(date.answered()).to.be.true;
      }
    ));
  });

  describe('#valid', () => {
    const test = (fields, expects = () => {}) => {
      const date = new DateValidator(fields.day, fields.month, fields.year);
      return (done) => {
        expects(date);
        done();
      };
    };
    it('returns false if not provided (empty)', test(
      {},
      date => expect(date.valid()).to.be.false
    ));
    it('returns false if not provided (undefined)', test(
      { day: field(undefined), month: field(undefined), year: field(undefined) },
      date => expect(date.valid()).to.be.false
    ));
    it('returns false if not provided (empty string)', test(
      { day: field(''), month: field(''), year: field('') },
      date => expect(date.valid()).to.be.false
    ));
    it('returns true if date is valid', test(
      { day: field('1'), month: field('12'), year: field('1999') },
      date => expect(date.valid()).to.be.true
    ));
  });

  describe('#basicDateValidation', () => {
    const test = (input, errors={}) => {
      const date = new DateValidator(input.day, input.month, input.year);
      let results = {
        dayMissing: false, monthMissing: false, yearMissing: false,
        invalid: false, notAnswered: false
      };
      const valid = date.basicDateValidation({
        dayMissingError: () => results.dayMissing = true,
        monthMissingError: () => results.monthMissing = true,
        yearMissingError: () => results.yearMissing = true,
        notAnsweredError: () => results.notAnswered = true,
        invalidError: () => results.invalid = true
      });

      if(errors === {}) {
        expect(valid).to.be.equal(true, 'result wasn\'t valid');
      } else {
        Object.keys(results).forEach(key => {
          if (typeof errors[key] === 'undefined') {
            expect(results[key]).to.be.equal(false, `${key} was true`);
          } else {
            expect(results[key]).to.eql(errors[key], `${key} was ${results[key]}`);
          }
        });
      }
    };

    it('no errors for a valid payload', () => {
      test({ day: field('10'), month: field('12'), year: field('1999') });
    });

    it('errors if date is not provided (empty strings)', () => {
      test(
        { day: field(''), month: field(''), year: field('') },
        { notAnswered: true }
      );
    });

    it('errors if date is not provided (undefined)', () => {
      test({}, { notAnswered: true });
    });

    it('errors if day is not provided (empty string)', () => {
      test(
        { day: field(''), month: field('12'), year: field('1999') },
        { dayMissing: true }
      );
    });

    it('errors if day is not provided (undefined)', () => {
      test(
        { month: field('12'), year: field('1999') },
        { dayMissing: true }
      );
    });

    it('errors if month is not provided (empty string)', () => {
      test(
        { day: field('1'), month: field(''), year: field('1999') },
        { monthMissing: true }
      );
    });

    it('errors if month is not provided (undefined)', () => {
      test(
        { day: field('1'), year: field('1999') },
        { monthMissing: true }
      );
    });

    it('errors if year is not provided (empty string)', () => {
      test(
        { day: field('1'), month: field('12'), year: field('') },
        { yearMissing: true }
      );
    });

    it('errors if year is not provided (undefined)', () => {
      test(
        { day: field('1'), month: field('12') },
        { yearMissing: true }
      );
    });

    it('errors if invalid date provided (characters instead of digits)', () => {
      test(
        { day: field('a'), month: field('b'), year: field('c') },
        { invalid: true }
      );
    });

    it('errors if invalid date provided (digits)', () => {
      test(
        { day: field('30'), month: field('2'), year: field('1999') },
        { invalid: true }
      );
    });
  });
});
