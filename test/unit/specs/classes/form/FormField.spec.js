import mockFormDescriptorCustomerInformation from '@/api/mock/form/formDescriptor/formDescriptorCustomerInformation'
import FormField from '@/classes/form/FormField'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Class: FormField --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: asFormFields() ::', () => {
    it('should Create An Array Of FormFields', () => {
      sinon.spy(FormField, 'asFormFields')
      let mockFields = mockFormDescriptorCustomerInformation.field_sets[0].form_fields

      let fields = FormField.asFormFields(mockFields)

      sinon.assert.match(fields.length, mockFields.length)

      expect(FormField.asFormFields).callCount(1)
      expect(FormField.asFormFields).calledWith(mockFields)
      FormField.asFormFields.restore()
    })
  })

  describe(':: asFormField() ::', () => {
    it('should Create A FormField', () => {
      sinon.spy(FormField, 'asFormField')
      let mockField = mockFormDescriptorCustomerInformation.field_sets[0].form_fields[0]

      let formField = FormField.asFormField(mockField)

      sinon.assert.match(formField.id, mockField.id)

      expect(FormField.asFormField).callCount(1)
      expect(FormField.asFormField).calledWith(mockField)
      FormField.asFormField.restore()
    })
  })

  describe(':: parseValue() ::', () => {
    let result

    beforeEach(() => {
      sinon.spy(FormField, 'parseValue')
    })

    afterEach(() => {
      expect(FormField.parseValue).callCount(1)
      FormField.parseValue.restore()
    })

    describe('> IF NOT value <', () => {
      it('should Return Null', () => {
        result = FormField.parseValue(null, 'text')

        sinon.assert.match(result, null)

        expect(FormField.parseValue).calledWith(null, 'text')
      })
    })

    describe('> IF value <', () => {
      describe('> IF type EQUALS date <', () => {
        it('should Return Date Object', () => {
          let dateString = '1995-03-31'
          result = FormField.parseValue(dateString, 'date')

          sinon.assert.match(result, dateString)

          expect(FormField.parseValue).calledWith(dateString, 'date')
        })
      })

      describe('> ELSE IF type EQUALS number <', () => {
        it('should Return Integer', () => {
          let number = 1
          result = FormField.parseValue(number.toString(), 'number')

          sinon.assert.match(result, number)

          expect(FormField.parseValue).calledWith(number.toString(), 'number')
        })
      })

      describe('> ELSE IF type EQUALS checkbox <', () => {
        it('should Return Boolean', () => {
          let boolean = true
          result = FormField.parseValue(boolean.toString(), 'checkbox')

          sinon.assert.match(result, boolean)

          expect(FormField.parseValue).calledWith(boolean.toString(), 'checkbox')
        })
      })

      describe('> ELSE <', () => {
        it('should Return value unmodified', () => {
          let text = 'test'
          result = FormField.parseValue(text, 'text')

          sinon.assert.match(result, text)

          expect(FormField.parseValue).calledWith(text, 'text')
        })
      })
    })
  })

  describe(':: validateValue() ::', () => {
    let result
    let value
    let type
    let validation

    beforeEach(() => {
      sinon.spy(FormField, 'validateValue')
    })

    afterEach(() => {
      expect(FormField.validateValue).callCount(1)
      FormField.validateValue.restore()
    })

    describe('> IF NOT validation.properties <', () => {
      it('should Return True', () => {
        value = null
        type = null
        validation = {
          properties: {}
        }

        result = FormField.validateValue(value, type, validation)

        sinon.assert.match(result, true)

        expect(FormField.validateValue).calledWith(value, type, validation)
      })
    })

    describe('> IF validation.properties <', () => {
      describe('> IF value <', () => {
        describe('> IF validation_pattern <', () => {
          describe('> IF isTextField OR isNumberField <', () => {
            describe('> IF value NOT reg <', () => {
              it('should Return False', () => {
                value = 'e'
                type = 'number'
                validation = {
                  properties: {
                    validation_pattern: '[0-9]'
                  }
                }

                result = FormField.validateValue(value, type, validation)

                sinon.assert.match(result, false)

                expect(FormField.validateValue).calledWith(value, type, validation)
              })
            })
          })

          describe('> IF NOT isTextField OR isNumberField <', () => {
            it('should Return True', () => {
              value = '2000-01-01'
              type = 'date'
              validation = {
                properties: {
                  validation_pattern: '[0-9]+-[0-9]+-[0-9]+'
                }
              }

              result = FormField.validateValue(value, type, validation)

              sinon.assert.match(result, true)

              expect(FormField.validateValue).calledWith(value, type, validation)
            })
          })
        })

        describe('> IF max_value <', () => {
          describe('> IF isNumberField <', () => {
            describe('> IF number AND number GREATER maxNumber <', () => {
              it('should Return False', () => {
                value = '999'
                type = 'number'
                validation = {
                  properties: {
                    max_value: '1'
                  }
                }

                result = FormField.validateValue(value, type, validation)

                sinon.assert.match(result, false)

                expect(FormField.validateValue).calledWith(value, type, validation)
              })
            })
          })

          describe('> ELSE IF isDateField <', () => {
            describe('> IF date GREATER maxDate <', () => {
              it('should Return False', () => {
                value = '2017-07-20'
                type = 'date'
                validation = {
                  properties: {
                    max_value: '2000-01-01'
                  }
                }

                result = FormField.validateValue(value, type, validation)

                sinon.assert.match(result, false)

                expect(FormField.validateValue).calledWith(value, type, validation)
              })
            })
          })

          describe('> ELSE <', () => {
            it('should Return True', () => {
              value = '999'
              type = 'text'
              validation = {
                properties: {
                  max_value: '1'
                }
              }

              result = FormField.validateValue(value, type, validation)

              sinon.assert.match(result, true)

              expect(FormField.validateValue).calledWith(value, type, validation)
            })
          })
        })

        describe('> IF min_value <', () => {
          describe('> IF isNumberField <', () => {
            describe('> IF number AND number LOWER minNumber <', () => {
              it('should Return False', () => {
                value = '1'
                type = 'number'
                validation = {
                  properties: {
                    min_value: '999'
                  }
                }

                result = FormField.validateValue(value, type, validation)

                sinon.assert.match(result, false)

                expect(FormField.validateValue).calledWith(value, type, validation)
              })
            })
          })

          describe('> ELSE IF isDateField <', () => {
            describe('> IF date LOWER minDate <', () => {
              it('should Return False', () => {
                value = '2000-01-01'
                type = 'date'
                validation = {
                  properties: {
                    min_value: '2017-07-20'
                  }
                }

                result = FormField.validateValue(value, type, validation)

                sinon.assert.match(result, false)

                expect(FormField.validateValue).calledWith(value, type, validation)
              })
            })
          })

          describe('> ELSE <', () => {
            it('should Return True', () => {
              value = '1'
              type = 'text'
              validation = {
                properties: {
                  min_value: '999'
                }
              }

              result = FormField.validateValue(value, type, validation)

              sinon.assert.match(result, true)

              expect(FormField.validateValue).calledWith(value, type, validation)
            })
          })
        })
      })

      describe('> ELSE <', () => {
        describe('> IF input_required <', () => {
          it('should Return False', () => {
            value = null
            type = 'text'
            validation = {
              properties: {
                input_required: true
              }
            }

            result = FormField.validateValue(value, type, validation)

            sinon.assert.match(result, false)

            expect(FormField.validateValue).calledWith(value, type, validation)
          })
        })

        describe('> ELSE <', () => {
          it('should Return True', () => {
            value = null
            type = 'number'
            validation = {
              properties: {
                max_value: '1'
              }
            }

            result = FormField.validateValue(value, type, validation)

            sinon.assert.match(result, true)

            expect(FormField.validateValue).calledWith(value, type, validation)
          })
        })
      })

      describe('> IF all passed <', () => {
        describe('> IF isNumberField <', () => {
          it('should Return True', () => {
            value = '100'
            type = 'number'
            validation = {
              properties: {
                input_required: true,
                max_value: '999',
                min_value: '1',
                validation_pattern: '[0-9]+'
              }
            }

            result = FormField.validateValue(value, type, validation)

            sinon.assert.match(result, true)

            expect(FormField.validateValue).calledWith(value, type, validation)
          })
        })

        describe('> IF isDateField <', () => {
          it('should Return True', () => {
            value = '2000-01-01'
            type = 'date'
            validation = {
              properties: {
                input_required: true,
                max_value: '2999-09-09',
                min_value: '1999-09-09',
                validation_pattern: '[0-9]+-[0-9]+-[0-9]+'
              }
            }

            result = FormField.validateValue(value, type, validation)

            sinon.assert.match(result, true)

            expect(FormField.validateValue).calledWith(value, type, validation)
          })
        })
      })
    })
  })

  describe(':: isTextField() ::', () => {
    beforeEach(() => {
      sinon.spy(FormField, 'isTextField')
    })

    afterEach(() => {
      expect(FormField.isTextField).callCount(1)
      FormField.isTextField.restore()
    })

    describe('> IF type EQUALS text <', () => {
      it('should Return True', () => {
        let result = FormField.isTextField('text')

        sinon.assert.match(result, true)

        expect(FormField.isTextField).calledWith('text')
      })
    })

    describe('> ELSE IF type NOT text <', () => {
      it('should Return False', () => {
        let result = FormField.isTextField('something')

        sinon.assert.match(result, false)

        expect(FormField.isTextField).calledWith('something')
      })
    })
  })

  describe(':: isNumberField() ::', () => {
    beforeEach(() => {
      sinon.spy(FormField, 'isNumberField')
    })

    afterEach(() => {
      expect(FormField.isNumberField).callCount(1)
      FormField.isNumberField.restore()
    })

    describe('> IF type EQUALS number <', () => {
      it('should Return True', () => {
        let result = FormField.isNumberField('number')

        sinon.assert.match(result, true)

        expect(FormField.isNumberField).calledWith('number')
      })
    })

    describe('> ELSE IF type NOT number <', () => {
      it('should Return False', () => {
        let result = FormField.isNumberField('something')

        sinon.assert.match(result, false)

        expect(FormField.isNumberField).calledWith('something')
      })
    })
  })

  describe(':: isDateField() ::', () => {
    beforeEach(() => {
      sinon.spy(FormField, 'isDateField')
    })

    afterEach(() => {
      expect(FormField.isDateField).callCount(1)
      FormField.isDateField.restore()
    })

    describe('> IF type EQUALS date <', () => {
      it('should Return True', () => {
        let result = FormField.isDateField('date')

        sinon.assert.match(result, true)

        expect(FormField.isDateField).calledWith('date')
      })
    })

    describe('> ELSE IF type NOT date <', () => {
      it('should Return False', () => {
        let result = FormField.isDateField('something')

        sinon.assert.match(result, false)

        expect(FormField.isDateField).calledWith('something')
      })
    })
  })

  describe(':: isFileField() ::', () => {
    beforeEach(() => {
      sinon.spy(FormField, 'isFileField')
    })

    afterEach(() => {
      expect(FormField.isFileField).callCount(1)
      FormField.isFileField.restore()
    })

    describe('> IF type EQUALS date <', () => {
      it('should Return True', () => {
        let result = FormField.isFileField('file')

        sinon.assert.match(result, true)

        expect(FormField.isFileField).calledWith('file')
      })
    })

    describe('> ELSE IF type NOT file <', () => {
      it('should Return False', () => {
        let result = FormField.isFileField('something')

        sinon.assert.match(result, false)

        expect(FormField.isFileField).calledWith('something')
      })
    })
  })

  describe(':: isCheckboxField() ::', () => {
    beforeEach(() => {
      sinon.spy(FormField, 'isCheckboxField')
    })

    afterEach(() => {
      expect(FormField.isCheckboxField).callCount(1)
      FormField.isCheckboxField.restore()
    })

    describe('> IF type EQUALS date <', () => {
      it('should Return True', () => {
        let result = FormField.isCheckboxField('checkbox')

        sinon.assert.match(result, true)

        expect(FormField.isCheckboxField).calledWith('checkbox')
      })
    })

    describe('> ELSE IF type NOT checkbox <', () => {
      it('should Return False', () => {
        let result = FormField.isCheckboxField('something')

        sinon.assert.match(result, false)

        expect(FormField.isCheckboxField).calledWith('something')
      })
    })
  })

  describe(':: isRadioField() ::', () => {
    beforeEach(() => {
      sinon.spy(FormField, 'isRadioField')
    })

    afterEach(() => {
      expect(FormField.isRadioField).callCount(1)
      FormField.isRadioField.restore()
    })

    describe('> IF type EQUALS date <', () => {
      it('should Return True', () => {
        let result = FormField.isRadioField('radio')

        sinon.assert.match(result, true)

        expect(FormField.isRadioField).calledWith('radio')
      })
    })

    describe('> ELSE IF type NOT radio <', () => {
      it('should Return False', () => {
        let result = FormField.isRadioField('something')

        sinon.assert.match(result, false)

        expect(FormField.isRadioField).calledWith('something')
      })
    })
  })

  describe(':: isSelectField() ::', () => {
    beforeEach(() => {
      sinon.spy(FormField, 'isSelectField')
    })

    afterEach(() => {
      expect(FormField.isSelectField).callCount(1)
      FormField.isSelectField.restore()
    })

    describe('> IF type EQUALS select <', () => {
      it('should Return True', () => {
        let result = FormField.isSelectField('select')

        sinon.assert.match(result, true)

        expect(FormField.isSelectField).calledWith('select')
      })
    })

    describe('> ELSE IF type NOT select <', () => {
      it('should Return False', () => {
        let result = FormField.isSelectField('something')

        sinon.assert.match(result, false)

        expect(FormField.isSelectField).calledWith('something')
      })
    })
  })
})
