export type IvValue = {
	short: string;
	name: string;
	value: number;
};

export default function GetRandomIvs(
	ivsArray: IvJson[],
	isShiny: boolean
): IvValue[] {
	return ivsArray.map(item => {
		const iv = Math.trunc(Math.random() * 32);
		return { ...item, value: isShiny && iv < 20 ? 20 : iv };
	});
}
