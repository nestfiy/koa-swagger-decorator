import {
    description,
    query,
    request,
    responses,
    summary,
    tags,
    tagsAll
} from '../../../lib'

@tagsAll(['store'])
export default class StoreRouter {
    @request('GET', '/store/inventory')
    @summary('Returns pet inventories by status')
    @description('Returns a map of status codes to quantities')
    @query({
        status: {
            type: 'string',
            description: 'Status values that need to be considered for filter',
            required: true
        }
    })
    @responses({
        200: { description: 'successful operation' },
        400: { description: 'Invalid ID supplied' },
        404: { description: 'Pet not found' }
    })
    static async getInventory(ctx) {
        const { status } = ctx.validatedBody
        const inventory = { status }
        ctx.body = { inventory }
    }

    @request('GET', '/store/order/{orderId}')
    @summary('Find purchase order by ID')
    @description(
        'For valid response try integer IDs with value <= 5. Anything above 5 or nonintegers will generate API errors'
    )
    @query({
        orderId: {
            type: 'string',
            description: 'ID of pet that needs to be fetched',
            required: true
        }
    })
    @responses({
        200: { description: 'successful operation' },
        400: { description: 'Invalid ID supplied' },
        404: { description: 'Pet not found' }
    })
    static async getOrderById(ctx) {
        const { orderId } = ctx.validatedBody
        const order = { orderId }
        ctx.body = { order }
    }

    @request('POST', '/store/order')
    @summary('Place an order for a pet')
    @description('Makes a POST request to /store/order')
    @query({
        body: {
            type: 'string',
            description: 'order placed for purchasing the pet',
            required: true
        }
    })
    @responses({
        200: { description: 'successful operation' },
        400: { description: 'Invalid body parameter' },
        404: { description: 'pet not found' }
    })
    static async placeOrder(ctx) {
        const { body } = ctx.validatedBody
        const order = { body }
        ctx.body = { order }
    }
}
