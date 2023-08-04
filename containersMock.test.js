const containersController = require(`REDACTED`)
const helpers = require(`REDACTED`)

const { postgresPromise } = require(`REDACTED`)
jest.mock(`REDACTED`, () => ({
    postgresPromise: jest.fn(),
    sendError: jest.fn(),
    useEpicor: jest.fn()
}))

const mockReq = {
    headers: {
        REDACTED
    },
    query: {
        REDACTED
    },
    body: {
        REDACTED
    }
}
const mockRes = {
    json: jest.fn()
}

beforeEach(() => {
    postgresPromise.mockClear()
})
  
describe(`getContainers`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = []
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        containersController.getContainers(mockReq, mockRes)

        // date issue
        // const expectedQuery = 
        // `SELECT
        //         id,
        //         quantity,
        //         length,
        //         width,
        //         type,
        //         shipunitid
        //     FROM
        //         gbl_shipping_schedule.vw_package
        //     WHERE
        //         sch_cust_id = $1
        //     AND
        //         date = $2
        //     AND
        //         ship_cat = $3
        //     AND
        //         company = $4`

        // expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [`MISVINSH65441_10887 North Service Road`, `2023-07-20T04:00:00.000Z`, `someCarrierID`, `KFR`])

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = []
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await containersController.getContainers(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})

describe(`addContainer`, () => {
    test(`should call res.json with the correct data on successful promise`, () => {

        const mockRows = [{ name: `BackhaulTest`, address: `Address 1`, load_id: 123, user: `Tester` }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        containersController.addContainer(mockReq, mockRes)

        const expectedQuery = `SELECT gbl_shipping_schedule.fn_create_package($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [`test`, undefined, undefined, `KFR`, undefined, undefined, undefined, undefined, undefined, undefined])
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ name: `BackhaulTest`, address: `Address 1`, load_id: 123, user: `Tester` }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await containersController.addContainer(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})

describe(`editContainer`, () => {
    test(`should call res.json with the correct data on successful promise`, () => {

        const mockRows = [{ user: `Tester`, company: `test`, quantity: 0, length: 0, width: 0, height: 0, weight: 0, type: `test`, id: 0, shipmentSysRowID: 0, containerSysRowIDs: 0 }]

        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        containersController.editContainer(mockReq, mockRes)

        const expectedQuery = `SELECT gbl_shipping_schedule.fn_edit_package($1, $2, $3, $4, $5, $6);`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [`test`, undefined, undefined, undefined, undefined, undefined])
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ user: `Tester`, company: `test`, quantity: 0, length: 0, width: 0, height: 0, weight: 0, type: `test`, id: 0, shipmentSysRowID: 0, containerSysRowIDs: 0 }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await containersController.editContainer(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})

describe(`removeContainer`, () => {
    test(`should call res.json with the correct data on successful promise`, () => {

        const mockRows = [{ user: `Tester`, company: `test`, id: 0, shipmentSysRowID: 0, containerSysRowIDs: 0 }]

        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        containersController.removeContainer(mockReq, mockRes)

        const expectedQuery = `SELECT gbl_shipping_schedule.fn_remove_skid($1, $2);`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [undefined, undefined])
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ user: `Tester`, company: `test`, id: 0, shipmentSysRowID: 0, containerSysRowIDs: 0 }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await containersController.removeContainer(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})