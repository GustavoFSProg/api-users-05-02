import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'

dotenv.config()

mongoose.connect(process.env.DATABASE_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

// eslint-disable-next-line new-cap
const app = new express()

app.use(express.json())
app.use(cors())
app.use(routes)

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`Api on PORT: ${PORT} Bucetão Grande!`)
})

export default app
