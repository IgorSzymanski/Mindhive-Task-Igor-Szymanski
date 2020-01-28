<template>
	<div id="visited">
		<b-progress
			v-if="!loading"
			:value="facilities.length"
			:max="fullCount"
			size="is-large"
			show-value
			type="is-info"
		>
			Odwiedzono {{ facilities.length }} z {{ fullCount }} zabytków
		</b-progress>
		<b-modal :active="mapShown" @close="closeMap">
			<Map :search="search" :key="search" @error="mapError" />
		</b-modal>
		<FacilityTable
			:facilities="paginatedFacilities"
			:page="page"
			:per-page="perPage"
			:total-pages="totalPages"
			:loading="loading"
			:isVisited="isVisited"
			:count="count"
			backend-pagination
			@mapRequest="showMap"
			@pageChange="onPageChange"
			@sort="onSort"
			@removeFromVisited="onRemoveFromVisited"
		/>
	</div>
</template>

<script>
import { createComponent, ref } from '@vue/composition-api'
import MapComponent from '@/components/MapComponent.vue'
import { VisitedService } from '@/services/visited/visitedService'
import { APIService } from '@/services/API/apiService'
import { formatCentury } from '@/filters/formatCentury'
import FacilityTable from '@/components/FacilityTable.vue'

const Visited = createComponent({
	components: { FacilityTable, Map: MapComponent },
	filters: { formatCentury },
	setup(_, opts) {
		const mapShown = ref(false)
		const search = ref('')

		const service = VisitedService()
		const apiService = APIService('https://api.dane.gov.pl')

		apiService.fetchFacilities()
		service.fetchVisited()

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

		const onRemoveFromVisited = id => {
			service.removeFromVisited(id)
		}

		return {
			...service,
			onSort,
			onPageChange,
			onRemoveFromVisited,
			showMap,
			mapShown,
			search,
			closeMap,
			mapError,
			fullCount: apiService.count,
			loading: apiService.loading,
		}
	},
})

export default Visited
</script>
