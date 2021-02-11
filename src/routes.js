/* eslint-disable import/extensions */
import { Router } from 'express'
import multer from 'multer'
import userController from './controllers/userController'
// eslint-disable-next-line import/no-unresolved
import productController from './controllers/productController'
import Authorize from './services/auth'
import uploadConfig from './config/uploadConfig'

const upload = multer(uploadConfig)

const routes = new Router()

routes.get('/', userController.getAll)
routes.delete('/delete/:id', Authorize, userController.remover)
routes.post('/user', Authorize, userController.create)
routes.put('/update/:id', Authorize, userController.update)
routes.post('/login', userController.Login)

routes.get('/product', productController.getAll)
routes.put('/product/update/:id', productController.update)
routes.get('/by-title', productController.getByTitle)
routes.get('/product/:id', productController.getById)
routes.post(
  '/product/register',
  upload.single('image'),
  productController.register
)
routes.delete('/product/delete/:id', productController.deleteOne)

export default routes
