import DirectEnum from "../enums/direction-enum";

export default interface INextBlock {
	key: string;
	x: number;
	y: number;
	direction: DirectEnum;
}