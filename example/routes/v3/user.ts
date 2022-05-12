import {
    body,
    description,
    middlewares,
    path,
    request,
    summary,
    tagsAll
} from '../../../lib'

const userSchema = {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true }
}
@tagsAll(['user'])
export default class UserRouter {
    @request('POST', '/user/register')
    @summary('register user')
    @description('example of api')
    // @middlewares([logTime()])
    @body(userSchema)
    static async register(ctx) {
        const { name } = ctx.validatedBody
        const user = { name }
        ctx.body = { user }
    }

    @request('post', '/user/login')
    @summary('user login, password is 123456')
    @body(userSchema)
    static async login(ctx) {
        const { name, password } = ctx.validatedBody
        if (password !== '123456') throw new Error('wrong password')
        const user = { name }
        ctx.body = { user }
    }

    @request('get', '/user')
    @summary('user list')
    static async getAll(ctx) {
        const users = [{ name: 'foo' }, { name: 'bar' }]
        ctx.body = { users }
    }

    @request('get', '/user/{id}')
    @summary('get user by id')
    @path({ id: { type: 'string', required: true } })
    static async getById(ctx) {
        const { id } = ctx.validatedParams
        const user = { name: 'foo' }
        ctx.body = { user }
    }

    @request('delete', '/user/{id}')
    @summary('delete user by id')
    @path({ id: { type: 'string', required: true } })
    static async deleteById(ctx) {
        const { id } = ctx.validatedParams
        console.log('id:', id)
        const user = { name: 'foo' }
        ctx.body = { user }
    }
}
