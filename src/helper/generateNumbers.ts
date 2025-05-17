/**
|--------------------------------------------------
| Generate an array of numbers from start to end
|--------------------------------------------------
|
| @param {number} end - The ending number
| @param {number} start - The starting number
| @returns {number[]} - An array of numbers from start to end
|
*/
export default function generateNumberArray(start: number, end: number): number[] {
	if (start > end) return [];

	/**
	|--------------------------------------------------
	| Returns an array of numbers
	|--------------------------------------------------
	*/
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
