import {
  camelizeErrorResponseData,
  camelizeResponseData,
  decamelizeRequestData
} from '@/api/middleware'

describe('middleware', () => {
  describe('decamelizeRequestData', () => {
    it('should decamelize request data', () => {
      const request: any = {
        data: {
          oldPassword: 'password1',
          newPassword: 'password2',
          passwordConfirmation: 'password2'
        },
        otherData: {
          someOtherData: 'test'
        }
      }

      const result = decamelizeRequestData(request)

      expect(result).toEqual({
        data: {
          old_password: 'password1',
          new_password: 'password2',
          password_confirmation: 'password2'
        },
        otherData: {
          someOtherData: 'test'
        }
      })
    })

    it('should do nothing if request has no data', () => {
      const request: any = {
        otherData: {
          someOtherData: 'test'
        }
      }

      const result = decamelizeRequestData(request)

      expect(result).toEqual(request)
    })
  })

  describe('camelizeResponseData', () => {
    it('should camelize data from json response', () => {
      const response: any = {
        data: {
          example_field: 'test',
          anotherExampleField: 123
        },
        headers: {
          'content-type': 'application/json; charset=utf-8'
        }
      }

      const result = camelizeResponseData(response)

      expect(result).toEqual({
        data: {
          exampleField: 'test',
          anotherExampleField: 123
        },
        headers: {
          'content-type': 'application/json; charset=utf-8'
        }
      })
    })

    it ('should not camelize data from non-json response', () => {
      const response: any = {
        data: {
          example_field: 'test',
          anotherExampleField: 123
        },
        headers: {
          'content-type': 'text/html'
        }
      }

      const result = camelizeResponseData(response)

      expect(result).toEqual(response)
    })

    it('should do nothing if response has no data', () => {
      const response: any = {
        headers: {
          'content-type': 'application/json; charset=utf-8'
        }
      }

      const result = camelizeResponseData(response)

      expect(result).toEqual(response)
    })
  })

  describe('camelizeErrorResponseData', () => {
    it('should camelize json data from error response', () => {
      const error = {
        example_field: 'test',
        response: {
          headers: {
            'content-type': 'application/json; charset=utf-8'
          },
          data: {
            message: 'Error message',
            errors: {
              example_field: ['test'],
              another_example_field: 123
            }
          }
        }
      }

      expect(() => camelizeErrorResponseData(error)).rejects.toEqual({
        example_field: 'test',
        response: {
          headers: {
            'content-type': 'application/json; charset=utf-8'
          },
          data: {
            message: 'Error message',
            errors: {
              exampleField: ['test'],
              anotherExampleField: 123
            }
          }
        }
      })
    })

    it('should not camelize data from non-json error response', () => {
      const error = {
        example_field: 'test',
        response: {
          headers: {
            'content-type': 'text/html'
          },
          data: {
            example_field: 'test'
          }
        }
      }

      expect(() => camelizeErrorResponseData(error)).rejects.toEqual(error)
    })

    it('should do nothing if error has no response data', () => {
      const error = {
        example_field: 'test',
        response: {
          headers: {
            'content-type': 'text/html'
          }
        }
      }

      expect(() => camelizeErrorResponseData(error)).rejects.toEqual(error)
    })
  })
})
