import productModel from '../models/productModel'

async function register(req, res) {
  try {
    const { filename: image } = req.file

    const [name] = image.split('.')
    const filename = `${name}.jpg`

    await productModel.create({
      title: req.body.title,
      price: req.body.price,
      image: filename,
    })

    return res.status(201).send({ msg: 'Deu certo!!' })
  } catch (error) {
    return res.status(400).send({ msg: 'tudo cagado!', error })
  }
}

async function getAll(req, res) {
  try {
    const data = await productModel.find()

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ msg: 'Deu erro, tudo cagado!!' })
  }
}

async function getByTitle(req, res) {
  try {
    const data = await productModel.findOne({ title: req.body.title })

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ msg: 'Deu erro, tudo cagado!!' })
  }
}

async function getById(req, res) {
  try {
    const data = await productModel.findById(req.params.id)

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ msg: 'Deu erro, tudo cagado!!' })
  }
}

async function update(req, res) {
  try {
    await productModel.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        price: req.body.price,
      },
    })

    return res.status(200).send({ msg: 'Propduto editado!!' })
  } catch (error) {
    return res.status(400).send({ msg: 'Deu erro, tudo cagado!!' })
  }
}

async function deleteOne(req, res) {
  try {
    await productModel.findOneAndRemove(req.params.id)

    return res.status(201).send({ msg: 'Tudo apagado!!' })
  } catch (error) {
    return res.status(400).send({ msg: 'ERRO,, tudo Cagado!!', error })
  }
}

export default { register, getById, getAll, deleteOne, getByTitle, update }
