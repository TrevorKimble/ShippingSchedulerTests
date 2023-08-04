const app = require(`REDACTED`)
const dayjs = require(`dayjs`)
const supertest = require(`supertest`)
const request = supertest(app)

describe(`Get Scheduled Customers`, () => {
    const date = dayjs().format(`YYYYMMDD`)
    test(`returns status 200 with valid input`, async () => {
        const response = await request.get(`/shipping-scheduler/customers/scheduled/${date}/${date}/1`)

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    })
    test(`returns status 404 if data is not sent`, async () => {
        const response = await request.get(`/shipping-scheduler/customers/scheduled/`)
        
        expect(response.status).toBe(404)
    })
})

describe(`Get Unsheduled Customers`, () => {
    test(`returns status 200 with valid input`, async () => {
        const response = await request.get(`/shipping-scheduler/customers/unscheduled/1/false/${dayjs().format(`YYYYMMDD`)}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    })
    test(`returns status 404 with invalid input`, async () => {
        const response = await request.get(`/shipping-scheduler/customers/unscheduled/`)

        expect(response.status).toBe(404)
    })
})

describe(`Update Customer`, () => {
    test(`returns status 200 with valid input`, async () => {
        const response = await request.patch(`/shipping-scheduler/customers/REDACTED/REDACTED/REDACTED/0/${dayjs().format(`YYYYMMDD`)}/1/REDACTED/deadbeef-dead-beef-dead-beefdeadbeef/REDACTED/REDACTED/REDACTED`)

        expect(response.status).toBe(200)

        expect(response.body).toBeTruthy()

        expect(response.body.rows).toBeTruthy()
        expect(response.body.rows.output).toBeTruthy()
    
    })
    test(`returns status 404 with invalid input`, async () => {
        const response = await request.patch(`/shipping-scheduler/customers/`)

        expect(response.status).toBe(404)
  
    })
})
// Need correct info
// describe(`Delete Customer`, () => {
//     test(`returns status 200 with valid input`, async () => {
//         const response = await request.delete(`/REDACTED/REDACTED/REDACTED/REDACTED?/${dayjs().format(`YYYYMMDD`)}/shipmentSysRowId?`)

//         expect(response.status).toBe(200)

//         expect(response.body).toBeTruthy()
//     })
// })
    
describe(`Get Customer Status`, () => {
    test(`returns status 200 with valid input`, async () => {
        const response = await request.get(`/shipping-scheduler/customers/status/REDACTED/1`)

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    })
    test(`returns status 404 with invalid input`, async () => {
        const response = await request.get(`/shipping-scheduler/customers/status/`)
        
        expect(response.status).toBe(404)
    })
})