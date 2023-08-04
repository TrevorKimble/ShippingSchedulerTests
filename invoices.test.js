const app = require(`REDACTED`)
const supertest = require(`supertest`)
const dayjs = require(`dayjs`)
const request = supertest(app)

const rootDir = `REDACTED`

describe(`GET Invoices`, () => {
    test(`should return 200 and JSON object with array with valid input`, async () => {
        const customerId = `REDACTED`
        const carrierId = `REDACTED`
        const company = `REDACTED`

        const response = await request
            .get(`${rootDir}/${customerId}/${carrierId}/${company}`)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.rows)).toBeTruthy()
    })
    test(`should return 404 with incorrect data sent`, async () => {
        const customerId = ``
        const carrierId = ``
        const company = ``

        const response = await request
            .get(`${rootDir}/${customerId}/${carrierId}/${company}`)

        expect(response.status).toBe(404)
        expect(Array.isArray(response.body.rows)).toBeFalsy()
    })
})

describe(`GET Past Invoices`, () => {
    test(`should return 200 and JSON object with array with valid input`, async () => {
        const customerId = `REDACTED`
        const carrierId = `REDACTED`
        const company = `REDACTED`
        const shipdate = dayjs().format(`YYYYMMDD`)

        const response = await request
            .get(`${rootDir}/${customerId}/${carrierId}/${shipdate}/${company}`)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.rows)).toBeTruthy()
    })
    test(`should return 404 with incorrect data sent`, async () => {
        const customerId = ``
        const carrierId = ``
        const company = ``

        const response = await request
            .get(`${rootDir}/${customerId}/${carrierId}/${company}`)

        expect(response.status).toBe(404)
        expect(Array.isArray(response.body.rows)).toBeFalsy()
    })
})

describe(`Search Invoices`, () => {
    test(`should return 200 and JSON object with array with valid input`, async () => {
        const id = REDACTED

        const response = await request
            .get(`${rootDir}/${id}`)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.rows)).toBeTruthy()
    })
    test(`should return 404 with incorrect data sent`, async () => {
        const id = ``

        const response = await request
            .get(`${rootDir}/${id}`)

        expect(response.status).toBe(404)
        expect(Array.isArray(response.body.rows)).toBeFalsy()
    })
})

describe(`Update Invoices`, () => {
    test(`should return 200 and JSON object with array with valid input`, async () => {
        const id = REDACTED

        const response = await request
            .get(`${rootDir}/${id}`)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.rows)).toBeTruthy()
    })
    test(`should return 404 with incorrcet data sent`, async () => {
        const id = ``

        const response = await request
            .get(`${rootDir}/${id}`)

        expect(response.status).toBe(404)
        expect(Array.isArray(response.body.rows)).toBeFalsy()
    })
})

describe(`GET viewSalesOrder`, () => {
    test(`should return 200 and JSON object with array with valid input`, async () => {

        const response = await request
            .get(`${rootDir}/REDACTED/header`)
            .query({ REDACTED })
            .send()

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.rows)).toBeTruthy()
    })

    test(`should return 500 with invalid input`, async () => {

        const response = await request
            .get(`${rootDir}/REDACTED/header`)
            .query({ REDACTED })
            .send()

        expect(response.status).toBe(500)
        expect(Array.isArray(response.body.rows)).toBeFalsy()
    })
})

describe(`GET viewSalesOrderDetails`, () => {
    test(`should return 200 and JSON object with array with valid input`, async () => {

        const response = await request
            .get(`${rootDir}/REDACTED/REDACTED`)
            .query({ company: `REDACTED`, so: REDACTED, sysrowid: `REDACTED` })
            .send()

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.rows)).toBeTruthy()
    })

    test(`should return 500 with invalid input`, async () => {

        const response = await request
            .get(`${rootDir}/REDACTED/REDACTED`)
            .query({ company: `REDACTED`, so: REDACTED, sysrowid: REDACTED })
            .send()

        expect(response.status).toBe(500)
        expect(Array.isArray(response.body.rows)).toBeFalsy()
    })
})