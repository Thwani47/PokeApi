import React, { useState, useEffect } from 'react';
import { Card, Skeleton, Modal, Button} from 'antd';
import PokemonModal from './PokemonModal';
const axios = require('axios');

const { Meta } = Card;

export default function PokemonCard({ url }) {
	const [ pokemon, setPokemon ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(
        
		() => {
			const fetchPokemon = async () => {
                const id = url.split('https://pokeapi.co/api/v2/pokemon/')[1].split('/')[0]
				setIsLoading(true);
                const fetchedPokemon = await axios(`/pokemon/${id}`);
				setPokemon(fetchedPokemon.data.result);
				setIsLoading(false);
			};

            fetchPokemon();
		},
		[ url ]
	);
	return (
        <>
        {isLoading ? (
            <Skeleton loading={isLoading} avatar active>
            <Meta
             
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        ) : (
            <Card
            onClick={() => setIsModalVisible(true)}
			loading={isLoading}
			style={{ width: 300, marginBottom: 10 }}
			title={Object.keys(pokemon).length === 0 ? "" : pokemon.id}
			cover={<img alt="example" src={Object.keys(pokemon).length === 0 ? "" : pokemon.sprites.other["official-artwork"]["front_default"]} />}
		>
			<Meta title={Object.keys(pokemon).length === 0 ? "" : pokemon.name} />
		</Card>
        )
}

<Modal
        title={pokemon.name}
        centered
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
        footer={[
            <Button key="back" onClick={() => setIsModalVisible(false)}>
              Close
            </Button>,
            
          ]}
      >
       <PokemonModal pokemon={pokemon} />
      </Modal>
</>
	);
}
