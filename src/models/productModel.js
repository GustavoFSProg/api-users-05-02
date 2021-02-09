import { model, Schema } from 'mongoose'

const schema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
  },
})

export default model('productModel', schema)
