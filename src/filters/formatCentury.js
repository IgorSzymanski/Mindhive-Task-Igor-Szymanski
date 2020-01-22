import { toRoman } from 'romannumerals'
import { Maybe } from 'monet'

/**
 * Extracts date from API's chronology property and formats it as a string.
 * If date param format is unknown, return the value without changing it.
 * If date param is not a string, return empty string.
 * @param {string} date
 * @returns {string}
 */
export const formatCentury = date =>
	typeof date === 'string'
		? extractCentury(date) ??
		  Maybe.fromFalsy(yearToCentury(extractYear(date)))
				.map(toRoman)
				.orUndefined() ??
		  date
		: ''

/**
 * Extracts the first century string matching the pattern.
 * If none found, returns undefined.
 * I has no idea, if it's century BC.
 * @param {string} century
 * @returns {string | undefined}
 */
export const extractCentury = century =>
	century
		.match(
			/(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})/g,
		)?.[0]
		.trim()

/**
 * Extracts the first string matching to a year format, and returns it as a number.
 * Otherwise, returns undefined.
 * I has no idea, if it's a year BC.
 * @param {string | number} year
 * @returns { number | undefined }
 */
export const extractYear = year =>
	Maybe.fromFalsy(String(year).match(/([1-9][0-9]*)/g)?.[0])
		.map(value => Number(value))
		.orUndefined()

/**
 * Converts a year to a century in decimal.
 * If a year is 0, returns null.
 * If year is negative, the century is also negative.
 * @param {number} year
 * @returns {number | undefined}
 */
export const yearToCentury = year => {
	// If year is 0 or a fraction, return undefined.
	if (year === 0 || year % 1 !== 0) {
		return
	}
	const diff = year > 0 ? 1 : -1
	const action = year > 0 ? 'floor' : 'ceil'
	return Math[action]((year - diff) / 100) + diff
}
