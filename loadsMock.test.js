const loadsController = require(`REDACTED`)
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

describe(`getLoadsByDateRange`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [{ REDACTED }]
    
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        loadsController.getLoadsByDateRange(mockReq, mockRes)

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveReturned()
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ REDACTED }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await loadsController.getLoadsByDateRange(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
        expect(helpers.postgresPromise).toHaveReturned()
    })
})

describe(`createLoad`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [{ REDACTED }]
    
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        loadsController.createLoad(mockReq, mockRes)

        const expectedQuery = `SELECT gbl_shipping_schedule.fn_create_load($1, $2, $3, $4, $5, $6)`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [undefined, undefined, undefined, undefined, undefined, undefined])
        expect(helpers.postgresPromise).toHaveReturned()
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ REDACTED }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await loadsController.createLoad(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
        expect(helpers.postgresPromise).toHaveReturned()
    })
})

describe(`updateLoad`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [{ REDACTED }]
    
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        loadsController.updateLoad(mockReq, mockRes)

        const expectedQuery = `SELECT * FROM gbl_shipping_schedule.fn_update_load($1, $2, $3, $4, $5, $6, $7)`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [undefined, undefined, undefined, undefined, undefined, undefined])
        expect(helpers.postgresPromise).toHaveReturned()
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ REDACTED }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await loadsController.updateLoad(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
        expect(helpers.postgresPromise).toHaveReturned()
    })
})

describe(`deleteLoad`, () => {
    test(`should call postgresPromise with the correct parameters`, () => {

        const mockRows = [{ REDACTED }]
    
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        loadsController.deleteLoad(mockReq, mockRes)

        const expectedQuery = `SELECT * FROM gbl_shipping_schedule.fn_delete_load($1, $2);`

        expect(helpers.postgresPromise).toHaveBeenCalledTimes(1)
        expect(helpers.postgresPromise).toHaveBeenCalledWith(expectedQuery, [undefined, undefined, undefined, undefined, undefined, undefined])
        expect(helpers.postgresPromise).toHaveReturned()
    })
    test(`should call res.json with the correct data on successful promise`, async () => {
        const mockRows = [{ REDACTED }]
        helpers.postgresPromise.mockResolvedValueOnce(mockRows)

        await loadsController.deleteLoad(mockReq, mockRes)

        expect(mockRes.json).toHaveBeenCalledWith({ rows: mockRows })
        expect(helpers.postgresPromise).toHaveReturned()
    })
})