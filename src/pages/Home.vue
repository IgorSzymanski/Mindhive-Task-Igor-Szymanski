<template>
	<div id="home">
		<b-modal :active="mapShown" @close="closeMap">
			<Map :search="search" :key="search" @error="mapError" />
		</b-modal>
		<FacilityFilters
			:facilities="facilities"
			:voivodeships="voivodeships"
			@filter="changeFilter"
		/>
		<FacilityTable
			:facilities="facilities"
			:page="page"
			:per-page="perPage"
			:total-pages="totalPages"
			:loading="loading"
			:isVisited="isVisited"
			:count="count"
			@mapRequest="showMap"
			@pageChange="onPageChange"
			@sort="onSort"
			@addToVisited="onAddToVisited"
			@removeFromVisited="onRemoveFromVisited"
			backend-pagination
			backend-sorting
		/>
	</div>
</template>

<script>
import { createComponent, ref } from '@vue/composition-api'
import FacilityFilters from '@/components/FacilityFilters.vue'
import MapComponent from '@/components/MapComponent.vue'
import { APIService } from '@/services/API/apiService'
import { VisitedService } from '@/services/visited/visitedService'
import { formatCentury } from '@/filters/formatCentury'
import FacilityTable from '@/components/FacilityTable.vue'
import { voivodeships } from '@/services/API/voivodeships'

const Home = createComponent({
	components: { FacilityFilters, FacilityTable, Map: MapComponent },
	filters: { formatCentury },
	setup(_, opts) {
		const mapShown = ref(false)
		const search = ref('')

		const service = APIService(process.env.VUE_APP_API_URL)
		const visitedService = VisitedService()

		service.fetchFacilities()
		visitedService.fetchVisited()

		const onSort = sort => {
			service.changeSort(sort)
		}
		const onPageChange = page => {
			service.changePage(page)
		}

		const showMap = searchString => {
			search.value = searchString
			mapShown.value = true
		}

		const closeMap = () => {
			search.value = ''
			mapShown.value = false
		}

		const mapError = () => {
			closeMap()
			opts.root.$buefy.notification.open({
				message: 'Nie znaleziono miejsca na mapie!',
				type: 'is-danger',
				duration: 0,
			})
		}

		const onAddToVisited = fac => {
			visitedService.addToVisited(fac)
		}

		const onRemoveFromVisited = id => {
			visitedService.removeFromVisited(id)
		}

		return {
			...service,
			onSort,
			onPageChange,
			onAddToVisited,
			onRemoveFromVisited,
			showMap,
			mapShown,
			search,
			closeMap,
			mapError,
			isVisited: visitedService.isVisited,
			voivodeships,
		}
	},
})

export default Home
</script>
