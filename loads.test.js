const app = require(`REDACTED`)
const dayjs = require(`dayjs`)
const supertest = require(`supertest`)
const request = supertest(app)

const rootDir = `/REDACTED/REDACTED`
let createdLoad

describe(`create load`, () => {
    test(`return 200 status with valid input`, async () => {
        const date = dayjs().format(`YYYYMMDD`)
        const loadDate = dayjs().format(`YYYYMMDD`)
        const loadTime = dayjs().format(`hh:mm:ss`)

        const lane = `REDACTED`
        const carrierId = REDACTED
        const user = `REDACTED`

        const response = await request
            .post(`${rootDir}/${date}/${loadDate}/${loadTime}/${lane}/${carrierId}/${user}`)

        createdLoad = {
            id: response.body.rows[0].fn_create_load,
            date: date,
            lane: lane,
            carrierId: carrierId
        }

        expect(response.status).toBe(200)
    })
    test(`return 404 status with invalid data`, async () => {

        const response = await request
            .post(`${rootDir}/`)

        expect(response.status).toBe(404)
    })
})

describe(`get matching load`, () => {
    test(`should return 200 status and JSON object with array containing created load`, async () => {
        const startDate = createdLoad.date
        const endDate = createdLoad.date
        const carrierId = createdLoad.carrierId
        
        const response = await request
            .get(`${rootDir}/${startDate}/${endDate}/${carrierId}`)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.rows)).toBeTruthy()
        expect(response.body.rows.some(row => row.id === createdLoad.id)).toBeTruthy()
    })
    test(`should return 404 with invalid data`, async () => {
        const response = await request
            .get(`${rootDir}`)

        expect(response.status).toBe(404)
    })
})

describe(`update matching load`, () => {
    test(` return 200 status with valid data`, async () => {
        const loadId = createdLoad.id
        const loadDate = dayjs().format(`YYYYMMDD`)
        const loadTime = dayjs().format(`hh:mm:ss`)
        const lane = createdLoad.lane
        const itemWrap = `white`
        const user = `Test Test`
        const note = `Test note.`

        const response = await request
            .patch(`${rootDir}/${loadId}/${loadDate}/${loadTime}/${lane}/${itemWrap}/${user}/${note}`)

        expect(response.status).toBe(200)
    })
    test(`return 404 status with invalid data`, async () => {

        const response = await request
            .patch(`${rootDir}`)

        expect(response.status).toBe(404)
    })
})

describe(`ship matching load`, () => {
    test(`return 200 status with valid data`, async () => {
        const loadId = createdLoad.id
        const user = `Test Test`
        const lane = createdLoad.lane

        const response = await request
            .patch(`${rootDir}/ship/${loadId}/${user}/${lane}`)

        expect(response.status).toBe(200)
    })
    test(`return 404 status with invalid data`, async () => {

        const response = await request
            .patch(`${rootDir}/ship`)

        expect(response.status).toBe(404)
    })
})

describe(`delete matching load`, () => {
    test(`return 200 status with valid data`, async () => {
        const loadId = createdLoad.id
        const user = `Test Test`

        const response = await request
            .delete(`${rootDir}/${loadId}/${user}`)

        expect(response.status).toBe(200)
    })
    test(`return 404 status with invalid data`, async () => {
        const response = await request
            .delete(`${rootDir}`)

        expect(response.status).toBe(404)
    })
})