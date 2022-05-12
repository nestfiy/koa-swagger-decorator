import { SwaggerRouter } from '../../../lib'

const routerOpts = { prefix: '/api/v3' }
const swaggerOpts = {
    title: 'API V3 Server',
    description: 'API DOC',
    version: '1.0.0'
}
const router = new SwaggerRouter(routerOpts, swaggerOpts)

// swagger docs avaliable at http://localhost:3000/api/v3/swagger-html
router.swagger()

router.mapDir(__dirname, {
    recursive: true,
    doValidation: true
})

export default router
