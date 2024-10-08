import NaturesJson from "../assets/jsons/natures.json";

const NaturesArray = Object.values(NaturesJson);

export function GetRandomNature() {
	const natIndex = Math.trunc(Math.random() * NaturesArray.length);
	return NaturesArray[natIndex].name;
}
