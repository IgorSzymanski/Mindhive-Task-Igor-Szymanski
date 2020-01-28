import { reactive, toRefs, computed } from '@vue/composition-api'

export const VisitedService = () => {
	const KEY = 'visited'

	const state = reactive({
		facilities: [],
		page: 1,
		perPage: 10,
	})

	const count = computed(() => state.facilities.length)

	const totalPages = computed(() =>
		!count.value ? 1 : Math.ceil(count.value / state.perPage),
	)

	const paginatedFacilities = computed(() =>
		state.facilities.slice(
			(state.page - 1) * state.perPage,
			state.page * state.perPage,
		),
	)

	const fetchVisited = () => {
		try {
			const visited = window.localStorage.getItem(KEY)
			const parsed = JSON.parse(visited)
			state.facilities = parsed
		} catch (e) {
			state.facilities = []
			saveVisited()
		}
		return state.facilities
	}

	const isVisited = id => state.facilities.find(fac => fac.id === id)

	const saveVisited = () => {
		window.localStorage.setItem(KEY, JSON.stringify(state.facilities))
	}

	const addToVisited = fac => {
		if (!isVisited(fac.id)) {
			state.facilities.push(fac)
			saveVisited()
		}
	}

	const removeFromVisited = id => {
		state.facilities = state.facilities.filter(fac => fac.id !== id)
		saveVisited()
	}

	const changePage = async page => {
		state.page = Number(page)
	}

	const changePerPage = async number => {
		state.perPage = Number(number)
	}

	return {
		...toRefs(state),
		fetchVisited,
		addToVisited,
		count,
		totalPages,
		changePage,
		changePerPage,
		isVisited,
		saveVisited,
		removeFromVisited,
		paginatedFacilities,
	}
}
