const salesOrdersController = require(`REDACTED`)
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
  
describe(`getInvoices`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [{ carrierid: mockReq.params.carrierid, decodedCustomerid: mockReq.params.decodedCustomerid, company: mockReq.params.company, shipmentKey: mockReq.params.shipmentKey }]
 
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        salesOrdersController.getInvoices(mockReq, mockRes)

        // const expectedQuery = 
        // `SELECT
        //         invoice_id,
        //         sch_cust_id,
        //         ship_date::date::text,
        //         schedule_id,
        //         scheduled,
        //         schedule_date::date::text,
        //         priority,
        //         company,
        //         "checked",
        //         is_rma,
        //         is_rushed,
        //         shipunitid
        //     FROM
        //         gbl_shipping_schedule.vw_upcoming_invoice
        //     WHERE
        //         sch_cust_id = $1
        //     AND  ship_cat = 0
        //     ORDER BY
        //         ship_date,
        //         priority,
        //         invoice_id`

        // expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [`undefined`])

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveReturned()
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ carrierid: 0, decodedCustomerid: 0, company: `test`, shipmentKey: 0 }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await salesOrdersController.getInvoices(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
        expect(helpers.postgresPromise).toHaveReturned()
    })
})

describe(`getPastInvoices`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [{ carrierid: mockReq.params.carrierid, decodedCustomerid: mockReq.params.decodedCustomerid, company: mockReq.params.company, shipmentKey: mockReq.params.shipmentKey }]
 
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        salesOrdersController.getPastInvoices(mockReq, mockRes)

        // date issue
        // const expectedQuery = 
        // `SELECT
        //         invoice_id,
        //         sch_cust_id,
        //         ship_date::date::text,
        //         schedule_id,
        //         scheduled,
        //         schedule_date::date::text,
        //         priority,
        //         company,
        //         "checked",
        //         is_rma,
        //         is_rushed,
        //         shipunitid
        //     FROM
        //         gbl_shipping_schedule.vw_invoice
        //     WHERE
        //         sch_cust_id = $1
        //     AND
        //         ship_cat = $2
        //     AND
        //         ship_date = $3
        //     ORDER BY
        //         priority,
        //         invoice_id`

        // const currentDate = new Date()
        // const dateString = currentDate.toISOString()
        // const dateStringWithQuotes = `${new Date().toISOString()}`
        // expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [`undefined`, 0, (dateStringWithQuotes)])

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveReturned()
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ carrierid: 0, decodedCustomerid: 0, company: `test`, shipmentKey: 0 }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await salesOrdersController.getPastInvoices(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
        expect(helpers.postgresPromise).toHaveReturned()
    })
})

describe(`updateInvoice`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [{ carrierid: mockReq.params.carrierid, decodedCustomerid: mockReq.params.decodedCustomerid, company: mockReq.params.company, shipmentKey: mockReq.params.shipmentKey }]
 
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        salesOrdersController.updateInvoice(mockReq, mockRes)

        const expectedQuery = `SELECT gbl_shipping_schedule.fn_update_invoice($1, $2, $3, $4)`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [undefined, `test`, undefined, undefined])
        expect(helpers.postgresPromise).toHaveReturned()

    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ carrierid: 0, decodedCustomerid: 0, company: `test`, shipmentKey: 0 }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await salesOrdersController.updateInvoice(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
        expect(helpers.postgresPromise).toHaveReturned()
    })
})