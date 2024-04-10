import { camelizeErrorResponse, camelizeResponse, decamelizeRequest } from '@/api/middleware'

describe('middleware', () => {
  describe('decamelizeRequest', () => {
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

      const result = decamelizeRequest(request)

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
  })

  describe('camelizeResponse', () => {
    it('should camelize data from json response', () => {
      const response: any = {
        data: {
          example_field: 'test',
          anotherExampleField: 123
        },
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      const result = camelizeResponse(response)

      expect(result).toEqual({
        data: {
          exampleField: 'test',
          anotherExampleField: 123
        },
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
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
          'Content-Type': 'text/html'
        }
      }

      const result = camelizeResponse(response)

      expect(result).toEqual(response)
    })
  })

  describe('camelizeErrorResponse', () => {
    it('should camelize error response data', () => {
      const error: any = {
        message: 'Error message',
        response: {
          data: {
            example_field: 'test',
            anotherExampleField: 123
          }
        }
      }

      expect(() => camelizeErrorResponse(error)).rejects.toEqual({
        message: 'Error message',
        response: {
          data: {
            exampleField: 'test',
            anotherExampleField: 123
          }
        }
      })
    })
  })
})
