import axios from 'axios';
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
describe("user registerd Api test", async () => {
      let response: any; // Api response

      /** Call before all test */
      response = await axios.post('https://dummyjson.com/auth/login', {
            username: 'atuny0',
            password: '9uQFF1Lh',
      });
      body = response.data
      console.log(body)


      /** Check Api response*/
      test('should have response status 200', () => {
            expect.soft(response.status).toBe(200)
      })

      /** Check data type of body */
      test('type of response data', () => {
            expectTypeOf(body).toBeArray
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
describe("current user login Api test", async () => {
      let response: any;
      let userData: any;
      response = await axios.get('https://dummyjson.com/auth/me', {
            headers: {
                  Authorization: body.token,
            },
      });

      userData = response.data;
      console.log(userData)

      /** Check login user name is valid or not */
      test('User login', () => {
            expect(body.token).toBeDefined()
            assert.equal(body.username, userData.username)
      })

      /** Check Api response*/
      test('should have response status 200', () => {
            expect.soft(response.status).toBe(200)
      })

      /** Check data type of login user data */
      test('type of response data', () => {
            expectTypeOf(userData).toBeArray
      })

      /** Check username or password should be correct*/
      test('user name or password', () => {
            expect(userData.username).toBe('atuny0')
            expect(userData.password).toBe('9uQFF1Lh')
      })

})
