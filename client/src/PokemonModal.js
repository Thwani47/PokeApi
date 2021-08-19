import React from 'react';
import { Descriptions } from 'antd';

export default function PokemonModal({ pokemon }) {
	return (
		<div>
			<img
				alt="example"
				src={
					Object.keys(pokemon).length === 0 ? '' : pokemon.sprites.other['official-artwork']['front_default']
				}
			/>
			<Descriptions title="Pokemon Info" layout="horizontal">
				<Descriptions.Item label="Weight">{pokemon.weight}</Descriptions.Item>
				<Descriptions.Item label="Height">{pokemon.height}</Descriptions.Item>
                <Descriptions.Item label="HP">{pokemon.stats[0].base_stat}</Descriptions.Item>
                <Descriptions.Item label="Attack">{pokemon.stats[1].base_stat}</Descriptions.Item>
                <Descriptions.Item label="Defense">{pokemon.stats[2].base_stat}</Descriptions.Item>
                <Descriptions.Item label="Special Attack">{pokemon.stats[3].base_stat}</Descriptions.Item>
                <Descriptions.Item label="Special Defense">{pokemon.stats[4].base_stat}</Descriptions.Item>
                <Descriptions.Item label="Speed">{pokemon.stats[5].base_stat}</Descriptions.Item>
				
			</Descriptions>
		</div>
	);
}
