import express from 'express'

const app = express()

app.get('/', (request, response) =>
  response.json({ message: 'mensagem muito maior vamos ver o que rola' })
)

app.listen(3333, () => console.log('teste carai'))
