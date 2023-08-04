const customersController = require(`REDACTED`)
const helpers = require(`REDACTED`)

const { postgresPromise } = require(`REDACTED`)

jest.mock(`REDACTED`, () => ({
    postgresPromise: jest.fn(),
    sendError: jest.fn(),
    epicorBAQPromise: jest.fn(),
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
    },
    params: {
        REDACTED
    }
}
const mockRes = {
    json: jest.fn()
}

beforeEach(() => {
    postgresPromise.mockClear()
})

describe(`updateCustomer`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [{ id: 1, name: `Backhaul 1`, address: `Address 1`, load: 123, company: `TEST`, priority: `TEST`, date: `TEST`, carrier: `TEST`, user: `TEST`, shipunitid: 0, shipmentSysRowId: 0 }]
    
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        customersController.updateCustomer(mockReq, mockRes)

        const expectedQuery = `SELECT gbl_shipping_schedule.fn_update_customer($1, $2, $3, $4, $5, $6, $7, $8, $9)`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [`undefined`, `undefined`, `undefined`, undefined, undefined, undefined, undefined, undefined, undefined])
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ id: 1, name: `Backhaul 1`, address: `Address 1`, load: 123, company: `TEST`, priority: `TEST`, date: `TEST`, carrier: `TEST`, user: `TEST`, shipunitid: 0, shipmentSysRowId: 0 }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await customersController.updateCustomer(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})

describe(`removeCustomer`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [{ id: 1, name: `Backhaul 1`, address: `Address 1`, load: 123, company: `TEST`, priority: `TEST`, date: `TEST`, carrier: `TEST`, user: `TEST`, shipunitid: 0, shipmentSysRowId: 0 }]
    
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        customersController.removeCustomer(mockReq, mockRes)

        const expectedQuery = `SELECT gbl_shipping_schedule.fn_remove_customer_by_shipunitid($1, $2)`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [undefined, undefined])
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ id: 1, name: `Backhaul 1`, address: `Address 1`, load: 123, company: `TEST`, priority: `TEST`, date: `TEST`, carrier: `TEST`, user: `TEST`, shipunitid: 0, shipmentSysRowId: 0 }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await customersController.removeCustomer(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})

describe(`getCustomerStatus`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [{ id: 1, carrierid: 1 }]
    
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        customersController.getCustomerStatus(mockReq, mockRes)

        const expectedQuery = 
        `SELECT
            first_unscheduled::date::text,
            checked_dates
        FROM gbl_shipping_schedule.vw_customer_status
        WHERE sch_cust_id = $1
            AND ship_cat = $2`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [undefined, undefined])
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ id: 1, carrierid: 1 }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await customersController.getCustomerStatus(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
    })
})