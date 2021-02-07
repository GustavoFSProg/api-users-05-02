import jwt from 'jsonwebtoken'

async function Authorize(req, res, next) {
  try {
    const token =
      req.body.token ||
      req.params.token ||
      req.query.token ||
      req.headers.authorization

    if (!token) {
      res.status(401).json({
        message: 'Acesso Restrito',
      })
    } else {
      // eslint-disable-next-line func-names
      // eslint-disable-next-line no-unused-vars
      await jwt.verify(token, process.env.GLOBAL_SALT_KEY, (error, decoded) => {
        if (error) {
          res.status(401).json({
            message: 'Token Inválido!',
          })
        } else {
          next()
        }
      })
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`error:${error}`)
    return res.status(400).send({ error })
  }
}

export default Authorize
