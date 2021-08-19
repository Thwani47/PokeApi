import React, { useEffect, useState } from 'react';
import './App.css';
import { List, Button, Input, Typography} from 'antd';
import PokemonCard from './PokemonCard';
const axios = require('axios');

const {Title} = Typography

function App() {
	const [ pokemon, setPokemon ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [searchText, setSearchText]  = useState('')
  const [filteredPokemon, setFilteredPokemon] = useState([])

	useEffect(() => {
		const fetchPokemon = async () => {
			setIsLoading(true);
			const fetchedPokemon = await axios('/pokemon');
			setPokemon(fetchedPokemon.data.result);
			setIsLoading(false);
		};

		fetchPokemon();
  }, []);
  
  const handleChange = e => {
    setSearchText(e.target.value)

    const filteredPokemons = pokemon.filter(pk => pk.name.includes(e.target.value))

    setFilteredPokemon(filteredPokemons)
    
  }

	return (
		<div className="App">
			<Title style={{color: 'green'}}>Pokemon</Title>
			{isLoading ? (
				<Button type="primary" loading={isLoading} disabled={true}>
					Loading...
				</Button>
			) : (
        <>
        <Input placeholder="Search Pokemon" style={{marginTop: 20, marginBottom: 20, width: 250}} onChange={handleChange} value={searchText} />
				<List
					grid={{
						gutter: 16,
						xs: 1,
						sm: 1,
						md: 3,
						lg: 3,
						xl: 3,
						xxl: 3
					}}
					dataSource={searchText.length === 0 ? pokemon : filteredPokemon }
					renderItem={(item) => (
						<List.Item>
							<PokemonCard url={item.url} key={item.url} />
						</List.Item>
					)}
				/>
        </>
			)}
		</div>
	);
}

export default App;
