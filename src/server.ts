import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ message: 'teste' }));
app.get('/post', (request, response) => {
  const { a, b } = request.body;
});

app.get('/post', (request, response) => {
  const { a, b } = request.body;
});

app.get('/post', (request, response) => {
  const { a, b } = request.body;
});

app.listen(3333, () => console.log('teste carai'));
