import { SwaggerRouter } from '../../lib'

import ApiRouter from './v1'
import Api2Router from './v2'
import Api3Router from './v3'

const router = new SwaggerRouter()

router.use('/api/v1', ApiRouter.routes())

router.use(Api2Router.routes())

router.use(Api3Router.routes())

// swagger docs avaliable at http://localhost:3000/swagger-html
// router.mapDir(__dirname)

export default router
