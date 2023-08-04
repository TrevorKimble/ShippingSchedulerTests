const backhaulController = require(`REDACTED`)
const helpers = require(`REDACTED`)

const { postgresPromise } = require(`REDACTED`)
jest.mock(`REDACTED`, () => ({
    postgresPromise: jest.fn(),
    sendError: jest.fn()
}))

const mockReq = {
    params: {
        date: `20220822`,
        carrierid: `1`
    }
}
const mockRes = {
    json: jest.fn()
}

beforeEach(() => {
    postgresPromise.mockClear()
})
  
describe(`getBackhauls`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [{ id: 1, name: `Backhaul 1`, address: `Address 1`, load_id: 123 }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        backhaulController.getBackhauls(mockReq, mockRes)

        const expectedQuery = 
        `SELECT
            id,
            name,
            address,
            load_id
        FROM
            gbl_shipping_schedule.vw_backhaul
        WHERE
            date = $1
        AND
            ship_cat = $2`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [`20220822`, `1`])
        expect(helpers.postgresPromise).toHaveReturned()
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ id: 1, name: `Backhaul 1`, address: `Address 1`, load_id: 123 }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await backhaulController.getBackhauls(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
        expect(helpers.postgresPromise).toHaveReturned()
    })

})

describe(`getBackhaulTemplates`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [
            REDACTED
        ]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        backhaulController.getBackhaulTemplates(mockReq, mockRes)

        const expectedQuery = 
        `SELECT
            id,
            name,
            address
        FROM
            gbl_shipping_schedule.backhaul_template
        ORDER BY
            name`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery)
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ id: 1, name: `Backhaul 1`, address: `Address 1`, load_id: 123 }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await backhaulController.getBackhaulTemplates(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})

describe(`createBackhauls`, () => {
    test(`should call res.json with the correct data on successful promise`, () => {

        const mockRows = [{ name: `BackhaulTest`, address: `Address 1`, load_id: 123, user: `Tester` }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        backhaulController.createBackhaul(mockReq, mockRes)

        const expectedQuery = `SELECT gbl_shipping_schedule.fn_create_backhaul($1, $2, $3, $4)`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [undefined, undefined, undefined, undefined])
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ name: `BackhaulTest`, address: `Address 1`, load_id: 123, user: `Tester` }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await backhaulController.createBackhaul(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})

describe(`createBackhaulTemplate`, () => {
    test(`should call res.json with the correct data on successful promise`, () => {

        const mockRows = [{ name: `Backhaul 1`, address: `Address 1`, startdate: `1/1/1`, user: `Tester`, modArray: `test` }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        backhaulController.createBackhaulTemplate(mockReq, mockRes)

        const expectedQuery = `SELECT gbl_shipping_schedule.fn_create_backhaul_template($1, $2, $3, $4, $5)`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [`undefined`, `undefined`, undefined, `undefined`, undefined])
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ name: `Backhaul 1`, address: `Address 1`, startdate: `1/1/1`, user: `Tester`, modArray: `test` }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await backhaulController.createBackhaulTemplate(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})

describe(`deleteBackhaul`, () => {
    test(`should call res.json with the correct data on successful promise`, () => {

        const mockRows = [{ id: 1, user: `Tester` }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        backhaulController.deleteBackhaul(mockReq, mockRes)

        const expectedQuery = `SELECT * FROM gbl_shipping_schedule.fn_delete_backhaul($1, $2)`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [undefined, undefined])
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ id: 1, user: `Tester` }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await backhaulController.deleteBackhaul(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})

describe(`deleteBackhaulTemplate`, () => {
    test(`should call res.json with the correct data on successful promise`, () => {

        const mockRows = [{ id: 1, user: `Tester` }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        backhaulController.deleteBackhaulTemplate(mockReq, mockRes)

        const expectedQuery = `SELECT gbl_shipping_schedule.fn_delete_backhaul_template($1, $2)`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [undefined, undefined])
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ id: 1, user: `Tester` }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await backhaulController.deleteBackhaulTemplate(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})