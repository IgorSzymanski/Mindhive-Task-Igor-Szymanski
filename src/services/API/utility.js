export const JOIN = ' AND '

export const queryMap = col => ({
	equals: val => `${col}:"${val}"`,
	doesNotEqual: val => `NOT ${col}:"${val}"`,
	startsWith: val => `${col}:${val}*`,
	contains: val => (val ? `${col}:*${val}*` : undefined),
	doesNotContain: val => `NOT ${col}:*${val}*`,
	empty: val => (val ? `${col}:null` : `NOT ${col}:null`),
})

export const parseQuery = (query = {}) => sort => (page = 1) => (
	perPage = 20,
) => {
	if (typeof query !== 'object' || !query) {
		query = {}
	}
	if (!Array.isArray(sort)) {
		sort = undefined
	}

	return {
		q: stringifyQueryObject(query),
		page,
		per_page: perPage,
		sort: stringifySortArray(sort),
	}
}

// const query = {
// 	col: {
// 		equals: 'abc', // col:\"abc\"
// 		doesNotEqual: 'abc', // NOT col:\"abc\"
// 		startsWith: 'abc', // col:abc*
// 		contains: 'abc', // col:*abc*
// 		doesNotContain: '', // NOT col:*abc*
// 		empty: true, // col:null
// 	},
// }

export const stringifyQueryObject = (query = {}) => {
	if (typeof query !== 'object' || !query) {
		return ''
	}
	const columns = Object.keys(query)
	return columns
		.flatMap(column => stringifyQueryParam(column)(query[column]))
		.join(JOIN)
}

export const stringifyQueryParam = column => (param = {}) =>
	Object.keys(param)
		.map(key =>
			queryMap(column)[key] ? queryMap(column)[key](param[key]) : undefined,
		)
		.filter(e => !!e)

// const sort = ['col1', 'ASC']
export const stringifySortArray = array =>
	Array.isArray(array)
		? array[1].toUpperCase() !== 'ASC'
			? `-${array[0]}`
			: `${array[0]}`
		: undefined

export const columnMap = {
	col1: 'fid',
	col2: 'formaOchrony',
	col3: 'dokladnoscPolozenia',
	col4: 'nazwa',
	col5: 'chronologia',
	col6: 'funkcja',
	col7: 'wykazDokumentow',
	col8: 'dataWpisu',
	col9: 'wojewodztwo',
	col10: 'powiat',
	col11: 'gmina',
	col12: 'miejscowosc',
	col13: 'ulica',
	col14: 'nrAdresowy',
}

export const invertObject = object => {
	const newObject = {}
	Object.keys(object).forEach(key => {
		newObject[object[key]] = key
	})
	return newObject
}

export const columnRemap = invertObject(columnMap)

export const convertFacilityKeys = mapper => facility => {
	if (!facility) {
		return
	}
	const mapped = {}
	Object.keys(facility).forEach(key => {
		mapped[convertFacilityKey(mapper)(key)] = facility[key]
	})
	return mapped
}

export const convertFacilityKey = mapper => key => {
	return key ? mapper[key] || key : undefined
}
