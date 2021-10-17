import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ message: 'teste' }));

app.listen(3333, () => console.log('teste carai'));
