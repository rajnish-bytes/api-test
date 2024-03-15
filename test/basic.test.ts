import { assert, beforeAll, describe, expect, expectTypeOf, test } from 'vitest'

// New user data type
interface Data {
      id: number,
      username: string,
      email: string,
      firstName: string,
      lastName: string,
      gender: string,
      image: string,
      token: string
}

let body: Data; // Register user data 

/** Register new user */
describe("user registerd Api test", () => {
      let response: any; // Api response

      /** Call before all test */
      beforeAll(async () => {
            response = await fetch('https://dummyjson.com/auth/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({

                        username: 'atuny0',
                        password: '9uQFF1Lh',

                  })

            })
            body = await response.json();
            console.log(body)
      }, 10000)

      /** Check Api response*/
      test('should have response status 200', () => {
            expect.soft(response.status).toBe(200)
            console.log(body)
      })

      /** Check data type of body */
      test('type of response data', () => {
            expectTypeOf(body).toBeArray
            console.log(body)
      })

      /** check register username is correct or not in response body */
      test('user name correct', () => {
            expect(body.username).toBe('atuny0')
      })

      /** check token genrated or not  */
      test('should have genrated Token', () => {
            expect(body).toHaveProperty('token')
      })
})

/**
 * Login Current user 
 * */ 
describe("current user login Api test", () => {
      let response: any;
      let userData: any;
      beforeAll(async () => {
            response = await fetch('https://dummyjson.com/auth/me', {
                  method: 'GET',
                  headers: {
                        'Authorization': body.token
                  },

            })
            userData = await response.json()
            console.log(userData)
      }, 10000)

      /** Check login user name is valid or not */
      test('User login', () => {
            expect(body.token).toBeDefined()
            assert.equal(body.username, userData.username)
      })

      /** Check Api response*/
      test('should have response status 200', () => {
            expect.soft(response.status).toBe(200)
            console.log(userData)
      })

      /** Check data type of login user data */
      test('type of response data', () => {
            expectTypeOf(userData).toBeArray
            console.log(userData)
      })

      /** Check username or password should be correct*/
      test('user name or password', () => {
            expect(userData.username).toBe('atuny0')
            expect(userData.password).toBe('9uQFF1Lh')
      })

})
