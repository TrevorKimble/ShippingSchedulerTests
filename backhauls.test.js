const app = require(`../../config`)
const dayjs = require(`dayjs`)
const supertest = require(`supertest`)

const request = supertest(app)
const appName = `/shipping-scheduler` 
const rootDir = `${appName}/backhauls`

let createdLoad
let createdBackhaul
let createdBackhaulTemplate

async function createLoad() {
    const date = dayjs().format(`YYYYMMDD`)
    const loadDate = dayjs().format(`YYYYMMDD`)
    const loadTime = dayjs().format(`hh:mm:ss`)
    const lane = `REDACTED`
    const carrierId = REDACTED
    const user = `REDACTED`

    const response = await request
        .post(`${appName}/loads/${date}/${loadDate}/${loadTime}/${lane}/${carrierId}/${user}`)

    createdLoad = {
        id: response.body.rows[0].fn_create_load,
        date: date,
        carrierId: carrierId
    }

    return createdLoad
}

async function deleteLoad() {
    const user = `Test Test`
    await request
        .delete(`${appName}/loads/${createdLoad.id}/${user}`)
}

describe(`create backhaul`, () => {
    test(`should return 200 with valid input`, async () => {
        const name = `Test McTesty`
        const address = `123 Some St, Middle-of-Nowhere, YZ 56789`
        const load = await createLoad()
        const user = `Test`

        const response = await request
            .post(`${rootDir}/${name}/${address}/${load.id}/${user}`)

        createdBackhaul = {
            id: response.body.rows[0].fn_create_backhaul,
            date: load.date,
            carrierId: load.carrierId
        }

        expect(response.status).toBe(200)
    })
})

describe(`get matching backhaul`, () => {
    test(`should return 200 and JSON object with array containing created backhaul`, async () => {
        const response = await request
            .get(`${rootDir}/${createdBackhaul.date}/${createdBackhaul.carrierId}`)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.rows)).toBeTruthy()
        expect(response.body.rows.some(row => row.id === createdBackhaul.id)).toBeTruthy()
    })
})

describe(`delete matching backhaul`, () => {
    test(`should return 200 with valid input`, async () => {
        const user = `Test Test`
        
        const response = await request
            .delete(`${rootDir}/${createdBackhaul.id}/${user}`)

        expect(response.status).toBe(200)

        deleteLoad()
    })
})

describe(`create backhaul template`, () => {
    test(`should return 200 with valid input`, async () => {
        const name = `Test McTesty`
        const address = `123 Some St, Middle-of-Nowhere, YZ 56789`
        const startDate = dayjs().format(`YYYY-MM-DD`)
        const modArray = `{1,2,3}`
        const user = `Test`

        const response = await request
            .post(`${rootDir}/template/${name}/${address}/${startDate}/${modArray}/${user}`)

        createdBackhaulTemplate = {
            id: response.body.rows[0].fn_create_backhaul_template,
        }

        expect(response.status).toBe(200)
    })
})

describe(`get all backhaul templates`, () => {
    test(`should return 200 and JSON object with array containing created backhaul template`, async () => {
        const response = await request
            .get(`${rootDir}/template`)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.rows)).toBeTruthy()
        expect(response.body.rows.some(row => row.id === createdBackhaulTemplate.id)).toBeTruthy()
    })
})

describe(`delete matching backhaul template`, () => {
    test(`should return 200 with valid input`, async () => {
        const user = `Test Test`
        
        const response = await request
            .delete(`${rootDir}/template/${createdBackhaul.id}/${user}`)

        expect(response.status).toBe(200)
    })
})