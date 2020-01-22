import {
	formatCentury,
	extractYear,
	extractCentury,
	yearToCentury,
} from '../../../src/filters/formatCentury'

describe('Testing formatCentury', () => {
	it(`Should handle a year ex. "1895 r."`, () => {
		expect(formatCentury('1 r.')).toBe('I')
		expect(formatCentury('1895 r.')).toBe('XIX')
	})

	it(`Should handle a year range ex. "1525 - 1535"`, () => {
		expect(formatCentury('1 - 50')).toBe('I')
		expect(formatCentury('1525 - 1535')).toBe('XVI')
	})

	it(`Should handle just a century ex. "XVIII w."`, () => {
		expect(formatCentury('I w.')).toBe('I')
		expect(formatCentury('XVIII w.')).toBe('XVIII')
	})

	it(`Should handle begining of a century ex. "pocz. XIX w."`, () => {
		expect(formatCentury('pocz. I w.')).toBe('I')
		expect(formatCentury('pocz. XIX w.')).toBe('XIX')
	})

	it(`Should handle end of a century ex. "koniec XV w."`, () => {
		expect(formatCentury('koniec I w.')).toBe('I')
		expect(formatCentury('koniec XV w.')).toBe('XV')
	})

	it(`Should handle halves of a century ex. "2. poł. XVIII w."`, () => {
		expect(formatCentury('1. poł. I w.')).toBe('I')
		expect(formatCentury('2. poł. XVIII w.')).toBe('XVIII')
	})

	it(`Should handle quarters of a century ex. "4. ćw. XIX w."`, () => {
		expect(formatCentury('1. ćw. I w.')).toBe('I')
		expect(formatCentury('4. ćw. XIX w.')).toBe('XIX')
	})

	it(`Should handle middle of a century ex. "poł. XIX w."`, () => {
		expect(formatCentury('poł. I w.')).toBe('I')
		expect(formatCentury('poł. XIX w.')).toBe('XIX')
	})

	it(`Should handle turn of a century ex. "przełom XVIII/XIX w."`, () => {
		expect(formatCentury('przełom I/II w.')).toBe('I')
		expect(formatCentury('przełom XVIII/XIX w.')).toBe('XVIII')
	})

	it(`Should handle "data nieznana" string`, () => {
		expect(formatCentury('data nieznana')).toBe('data nieznana')
	})

	it(`Should handle random string string`, () => {
		expect(formatCentury('abcdefgh')).toBe('abcdefgh')
	})

	it(`Should handle empty parameter`, () => {
		expect(formatCentury()).toBe('')
	})

	it(`Should handle non-string parameter`, () => {
		expect(formatCentury(7)).toBe('')
	})
})

describe('Test extractCentury', () => {
	it(`Should handle random string`, () => {
		expect(extractCentury('Lorem Ipsum')).toBe('L')
		expect(extractCentury('Harry Potter')).toBeUndefined()
	})

	it(`Should handle proper string`, () => {
		expect(extractCentury('XIV w.')).toBe('XIV')
		expect(extractCentury('I')).toBe('I')
	})
})

describe('Test extractYear', () => {
	it(`Should handle proper input`, () => {
		expect(extractYear('Lorem 1739 ipsum')).toBe(1739)
	})
	it(`Should handle slightly off input`, () => {
		expect(extractYear('Lorem 0739 ipsum')).toBe(739)
	})
	it(`Should handle improper input`, () => {
		expect(extractYear('Lorem ipsum')).toBeUndefined()
		expect(extractYear('Lorem 0 ipsum')).toBeUndefined()
	})
})

describe('Test yearToCentury', () => {
	it(`Should handle positive year`, () => {
		expect(yearToCentury(1739)).toBe(18)
		expect(yearToCentury(999)).toBe(10)
		expect(yearToCentury(1000)).toBe(10)
		expect(yearToCentury(1001)).toBe(11)
	})
	it(`Should handle negative year`, () => {
		expect(yearToCentury(-1739)).toBe(-18)
		expect(yearToCentury(-999)).toBe(-10)
		expect(yearToCentury(-1000)).toBe(-10)
		expect(yearToCentury(-1001)).toBe(-11)
	})
	it(`Should handle 0 year`, () => {
		expect(yearToCentury(0)).toBeUndefined()
	})
})
