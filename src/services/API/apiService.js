import { reactive, toRefs, computed } from '@vue/composition-api'
import Axios from 'axios'
import {
	parseQuery,
	convertFacilityKeys,
	columnMap,
	columnRemap,
	convertFacilityKey,
} from './utility'

export const APIService = baseURL => {
	const url = path => `${baseURL}${path}`

	const state = reactive({
		facilities: [],

		start: url('/resources/21261/data'),
		query: null,
		sort: null,
		page: 1,
		perPage: 10,

		count: 10000,

		loading: false,
		error: false,
	})

	const totalPages = computed(() =>
		!state.count ? 1 : Math.ceil(state.count / state.perPage),
	)

	const fetch = url => async (params = {}) => {
		state.loading = true
		state.error = false
		try {
			const res = await Axios.get(url, { params })
			state.facilities = res.data.data.map(({ id, attributes }) =>
				convertFacilityKeys(columnMap)({
					id,
					...attributes,
				}),
			)
			state.count = res.data.meta.count > 10000 ? 10000 : res.data.meta.count
		} catch (e) {
			state.error = true
		} finally {
			state.loading = false
		}
	}

	const fetchFacilities = async query => {
		if (query) {
			state.query = query.query
			state.sort = query.sort
			state.page = query.page
			state.perPage = query.perPage
		}

		const params = parseQuery(convertFacilityKeys(columnRemap)(state.query))(
			state.sort
				? [convertFacilityKey(columnRemap)(state.sort[0]), state.sort[1]]
				: state.sort,
		)(state.page)(state.perPage)

		return await fetch(state.start)(params)
	}

	const changePage = async page => {
		state.page = Number(page)
		await fetchFacilities()
	}

	const changeSort = async sort => {
		state.sort = sort
		await fetchFacilities()
	}

	const changeFilter = async filter => {
		state.query = filter
		await changePage(1)
	}

	const changePerPage = async number => {
		state.perPage = Number(number)
		await changePage(1)
	}

	return {
		...toRefs(state),
		fetchFacilities,
		totalPages,
		changePage,
		changeSort,
		changePerPage,
		changeFilter,
	}
}
