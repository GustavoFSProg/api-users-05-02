import { Router } from 'express'
import userController from './controllers/userController'
import Authorize from './services/auth'

const routes = new Router()

routes.get('/', userController.getAll)
routes.delete('/delete/:id', Authorize, userController.remover)
routes.post('/user', Authorize, userController.create)
routes.put('/update/:id', Authorize, userController.update)
routes.post('/login', userController.Login)

export default routes
