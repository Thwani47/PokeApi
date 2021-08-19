const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const axios = require('axios');
const path = require('path');

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT = process.env.PORT || 3001;

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

app.get('/pokemon', async (req, res) => {
	try {
		const pokemon = await axios.get(`${POKEAPI_URL}?limit=100`);

		const pokemonList = pokemon.data.results;

		res.status(200).json({ success: true, result: pokemonList });
	} catch (err) {
		res.json({ err });
	}
});

app.get('/pokemon/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const pokemon = await axios.get(`${POKEAPI_URL}/${id}`);

		res.status(200).json({ success: true, result: pokemon.data });
	} catch (err) {
		res.json({ err });
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build.index.html'));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${3001}`);
});

// docker-compose up --build
