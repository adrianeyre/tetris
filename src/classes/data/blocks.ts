import DirectEnum from "../enums/direction-enum";
import INextBlock from '../interfaces/next-block';

const blocksData: INextBlock[] = [
	{
		key: 'sprite01',
		x: 16,
		y: 4,
		direction: DirectEnum.LEFT,
	},
	{
		key: 'sprite02',
		x: 15,
		y: 4,
		direction: DirectEnum.LEFT,
	},
	{
		key: 'sprite03',
		x: 17,
		y: 4,
		direction: DirectEnum.LEFT,
	},
	{
		key: 'sprite04',
		x: 14,
		y: 4,
		direction: DirectEnum.RIGHT,
	},
	{
		key: 'sprite05',
		x: 15,
		y: 4,
		direction: DirectEnum.DOWN,
	},
	{
		key: 'sprite06',
		x: 15,
		y: 4,
		direction: DirectEnum.DOWN,
	}
	,
	{
		key: 'sprite07',
		x: 15,
		y: 4,
		direction: DirectEnum.DOWN,
	}
];

export default blocksData;