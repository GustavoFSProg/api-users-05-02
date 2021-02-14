import md5 from 'md5'
import userModel from '../models/userModel'
import { generateToken } from '../services/token'
import send from '../services/email-service'

async function getAll(req, res) {
  try {
    const data = await userModel.find()

    return res.status(201).send(data)
  } catch (error) {
    return res.status(400).send('Erro tudo cagado!!!')
  }
}

async function getOne(req, res) {
  try {
    const data = await userModel.findById(req.params.id)
    return res.status(201).send(data)
  } catch (error) {
    return res.status(400).send('Erro tudo cagado!!!')
  }
}

async function create(req, res) {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }

    const email = {
      name: req.body.name,
      email: req.body.email,
    }

    await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password, process.env.GLOBAL_SALT_KEY),
    })
    const token = await generateToken(data)

    send(email)

    return res.status(201).send({ msg: 'Deu Certo!!', Token: token })
  } catch (error) {
    return res.status(400).send({ error, msg: 'Deu errado, ,Tudo Cagado!!' })
  }
}

async function update(req, res) {
  try {
    await userModel.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password, process.env.GOLBAL_SALT_KEY),
      },
    })

    return res.status(201).send({ msg: 'Tudo Editado!!' })
  } catch (error) {
    return res.status(400).send({ msg: 'ERRO: Tudo Cagado!!' })
  }
}

async function remover(req, res) {
  try {
    await userModel.findByIdAndDelete(req.params.id)

    return res.status(201).send({ msg: 'Tudo apagado!!!' })
  } catch (error) {
    return res.status(400).send({ msg: 'Erro, tudo cagado!!' })
  }
}

async function Login(req, res) {
  try {
    const { email, password } = req.body

    const data = await userModel.findOne({
      email,
      password: md5(password, process.env.GLOBAL_SALTKEY),
    })

    if (!data) {
      const retorno = res
        .status(400)
        .send({ Erro: 'Email or Password are incorrect!!!' })

      return res.status(400).send(retorno)
    }
    const token = await generateToken(data)
    return res.status(201).send({ data, token })
  } catch (error) {
    return res.status(400).send({ msg: 'Usuario nan~encontrado', error })
  }
}

export default { getAll, getOne, remover, create, update, Login }
