const app = require(`REDACTED`)
const dayjs = require(`dayjs`)
const supertest = require(`supertest`)

const request = supertest(app)
const appName = `/shipping-scheduler` 
const rootDir = `${appName}/containers` 

async function createContainer() {
    const user = REDACTED
    const company = REDACTED

    const body = {
        REDACTED
    }

    const responseC = {
        REDACTED
    }

    return responseC
}

async function editContainer() {
    const user = REDACTED
    const company = REDACTED

    const body = {
        REDACTED
    }

    const responseE = {
        REDACTED
    }

    return responseE
}

async function deleteContainer() {
    const user = REDACTED
    const company = REDACTED

    const body = {
        REDACTED
    }

    const responseD = {
        REDACTED
    }

    return responseD

}

// Tests

describe(`add container`, () => {
    test(`should return 200 with valid input`, async () => {
        const container = await createContainer()

        const response = await request.post(rootDir).set(`user`, container.user).set(`company`, container.company).send(container.body)
        expect(response.status).toBe(200)
    })
    test(`should return 500 with lack of data sent`, async () => {
        const response = await request.post(rootDir)
        expect(response.status).toBe(500)
    })
})

describe(`edit container`, () => {
    test(`should return 200 with valid input`, async () => {

        const container = await editContainer()

        const response = await request.patch(rootDir).set(`user`, container.user).set(`company`, container.company).send(container.body)
        expect(response.status).toBe(200)
    })
})

describe(`get container`, () => {
    test(`should return 200 status with valid input`, async () => {
        const response = await request
            .get(rootDir)
            .set(`company`, `KFR`)
            .query({ REDACTED }) 
            .send()
        expect(response.status).toBe(200)
    })
    test(`should return 500 with lack of data sent`, async () => {
        const response = await request.get(rootDir)
        expect(response.status).toBe(500)
    })
})

describe(`get existing container`, () => {
    test(`should return 200 status with valid input`, async () => {
        const response = await request
            .get(rootDir)
            .set(`company`, `KFR`)
            .query({ REDACTED }) 
            .send()
        expect(response.status).toBe(200)
    })
    test(`should return 500 with lack of data sent`, async () => {
        const response = await request.get(rootDir)
            .send()
        expect(response.status).toBe(500)
    })
})

describe(`delete container`, () => {
    test(`should return 200 with valid input`, async () => {

        const delContainer = await deleteContainer()
       
        const response = await request.delete(rootDir).set(`user`, delContainer.user).set(`company`, delContainer.company).send(delContainer.body)

        expect(response.status).toBe(200)
    })
})