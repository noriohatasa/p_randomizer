import UpperFirstLetter from "../../helpers/UpperFirstLetter";

import "./Card.css";
import { useCallback } from "react";
import { UseAppContext } from "../../contexts/AppContext";

type args = {
	item: PokemonJson;
	onClick: (item: PokemonJson) => void;
	selected: boolean;
	isShiny?: boolean;
};

function Card({ item, onClick, selected, isShiny = false }: args) {
	const { imgPath, shinyImgPath } = UseAppContext();
	const imgSrc = isShiny
		? `${shinyImgPath}/${item.id ?? "0"}.png`
		: `${imgPath}/${item.id ?? "0"}.png`;

	const cardClick = useCallback(() => {
		onClick(item);
	}, []);

	return (
		<div
			className="card"
			onClick={cardClick}
			style={{
				boxShadow: `0px 0px 10px 1px ${
					selected ? "royalblue" : "gray"
				}`,
			}}
		>
			<img src={imgSrc} alt={item.name} />
			<span>{UpperFirstLetter(item.name)}</span>
		</div>
	);
}

export default Card;
