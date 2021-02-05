import { Router } from 'express'
import userController from './controllers/userController'

const routes = new Router()

routes.get('/', userController.getAll)
routes.delete('/delete/:id', userController.remover)
routes.post('/user', userController.create)
routes.put('/update/:id', userController.update)
routes.post('/login', userController.Login)

export default routes
