export default function GetRandomShiny(shinyRoll: number) {
	const roll = Math.trunc(Math.random() * shinyRoll);
	return roll === 0;
}
