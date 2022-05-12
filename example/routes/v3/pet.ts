import { deprecate } from 'util'
import {
    request,
    summary,
    query,
    tags,
    responses,
    prefix,
    header,
    tagsAll,
    description,
    deprecated,
    body,
    path,
    formData
} from '../../../lib'

@tagsAll(['pet'])
export default class PetRouter {
    @request('POST', '/pet/{petId}/uploadImage')
    @summary('uploads an image')
    @description('uploads an image')
    @path({
        petId: {
            type: 'integer',
            format: 'int64',
            required: true,
            description: 'ID of pet to update'
        }
    })
    @formData({
        additionalMetadata: {
            type: 'string',
            required: false,
            description: 'Additional data to pass to server'
        },
        file: {
            type: 'file',
            required: false,
            description: 'file to upload'
        }
    })
    @responses({
        200: { description: 'successful operation' },
        400: { description: 'Invalid ID supplied' }
    })
    static async uploadImageById(ctx) {
        const { petId } = ctx.validatedParams
        const { file } = ctx.request.files
        const { additionalMetadata } = ctx.request.body
        const image = { petId, additionalMetadata, file }
        ctx.body = { image }
    }
    @request('GET', '/pet/findByTags')
    @query({
        tags: {
            type: 'string',
            required: true,
            description: 'Tags to filter by'
        }
    })
    @summary('Finds Pets by tags')
    @deprecated
    @description(
        'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.'
    )
    static async findPetsByTags(ctx) {
        const { tags } = ctx.validatedBody
        const pets = { tags }
        ctx.body = { pets }
    }

    @request('GET', '/pet/findByStatus')
    @summary('Finds Pets by status')
    @description(
        'Multiple status values can be provided with comma separated strings. Use status1,status2,status3 for testing.'
    )
    @query({
        status: {
            type: 'array',
            description: 'Status values that need to be considered for filter',
            required: true,
            items: {
                type: 'string',
                enum: ['available', 'pending', 'sold'],
                default: 'available',
                example: 'available,pending,sold'
            },
            // collectionFormat: 'multi',
            // uniqueItems: true,
            // minItems: 1,
            // maxItems: 3,
            swaggerDefinition: {
                type: 'array',
                description:
                    'Status values that need to be considered for filter',
                required: true,
                items: {
                    type: 'string',
                    enum: ['available', 'pending', 'sold'],
                    default: 'available',
                    example: 'available'
                },
                collectionFormat: 'multi',
                uniqueItems: true,
                minItems: 1,
                maxItems: 3,
                default: ['available'],
                example: ['available']
            }
        }
    })
    @responses({
        200: { description: 'successful operation' },
        400: { description: 'Invalid status value' },
        404: { description: 'Pet not found' }
    })
    static async findPetsByStatus(ctx) {
        const { status } = ctx.validatedQuery
        const pets = { status }
        ctx.body = { pets }
    }

    @request('POST', '/pet/{petId}')
    @summary('Updates a pet in the store with form data')
    @description('Updates a pet in the store with form data')
    static async updatePetWithForm(ctx) {
        const { petId } = ctx.validatedParams
        const { name, status } = ctx.validatedBody
        const pet = { petId, name, status }
        ctx.body = { pet }
    }

    @request('POST', '/pet')
    @summary('Add a new pet to the store')
    @description('Makes a POST request to /pet')
    @query({
        name: {
            type: 'string',
            description: 'Pet name',
            required: true
        },
        tag: {
            type: 'string',
            description: 'Pet tag',
            required: true
        }
    })
    @responses({
        200: { description: 'successful operation' },
        400: { description: 'Invalid ID supplied' },
        404: { description: 'Pet not found' }
    })
    static async addPet(ctx) {
        const { name, tag } = ctx.validatedBody
        const pet = { name, tag }
        ctx.body = { pet }
    }

    @request('GET', '/pet/{petId}')
    @summary('Find pet by ID')
    @description('Returns a single pet')
    @header({
        appKey: {
            type: 'string',
            description: 'app key'
        }
    })
    @query({
        petId: {
            type: 'string',
            description: 'ID of pet to return',
            required: true
        }
    })
    @responses({
        200: { description: 'successful operation' },
        400: { description: 'Invalid ID supplied' },
        404: { description: 'Pet not found' }
    })
    static async getPetById(ctx) {
        const { petId } = ctx.validatedParams
        const pet = { petId }
        ctx.body = { pet }
    }

    @request('PUT', '/pet')
    @summary('Update an existing pet')
    @description('Makes a PUT request to /pet')
    @header({
        appKey: {
            type: 'string',
            description: 'app key'
        }
    })
    @query({
        petId: {
            type: 'string',
            description: 'ID of pet that needs to be updated',
            required: true
        }
    })
    @responses({
        405: { description: 'Invalid input' }
    })
    static async updatePet(ctx) {
        const { petId } = ctx.validatedParams
        const pet = { petId }
        ctx.body = { pet }
    }

    @request('DELETE', '/pet/{petId}')
    @summary('Deletes a pet')
    @description('Deletes a pet')
    @header({
        appKey: {
            type: 'string',
            description: 'app key'
        }
    })
    @path({
        petId: {
            type: 'string',
            description: 'Pet id to delete',
            required: true
        }
    })
    @responses({
        400: { description: 'Invalid ID supplied' },
        404: { description: 'Pet not found' }
    })
    static async deletePet(ctx) {
        const { petId } = ctx.validatedParams
        const pet = { petId }
        ctx.body = { pet }
    }

    @request('POST', '/pet')
    @body({
        list: {
            type: 'array',
            description: 'List of pet ids',
            required: true,
            items: {
                type: 'string',
                description: 'ID of pet that needs to be fetched',
                required: true,
                example: 'fido'
            }
        }
        // list: {
        // type: 'array',
        // items: {
        //     type: 'object',
        //     properties: {
        //         key: { type: 'string' },
        //         value: { type: 'string' }
        //     }
        // }
        // }
    })
    @summary('Finds Pets by ids')
    @description('Makes a POST request to /pet')
    @responses({
        200: { description: 'successful operation' },
        400: { description: 'Invalid ID supplied' },
        404: { description: 'Pet not found' }
    })
    static async findPetsByIds(ctx) {
        const { list } = ctx.validatedBody
        const pets = { list }
        ctx.body = { pets }
    }
}
