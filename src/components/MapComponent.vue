<template>
	<div v-show="!error">
		<vl-map data-projection="EPSG:4326" style="height: 400px" v-if="!error">
			<vl-view
				v-if="coordinates"
				:zoom.sync="zoom"
				:center="coordinates"
			></vl-view>

			<vl-layer-tile>
				<vl-source-osm></vl-source-osm>
			</vl-layer-tile>

			<vl-feature v-if="coordinates">
				<vl-geom-point :coordinates="coordinates"></vl-geom-point>
			</vl-feature>
		</vl-map>
	</div>
</template>

<script>
import {
	createComponent,
	ref,
	reactive,
	toRefs,
	watch,
} from '@vue/composition-api'
import { GeoService } from '@/services/geo/geoService'

const MapComponent = createComponent({
	props: {
		search: {
			type: String,
			required: true,
		},
	},
	setup(props, opts) {
		const coordinates = ref(null)
		const state = reactive({
			zoom: 14,
			rotation: null,
		})
		const error = ref(true)
		const geoService = GeoService(process.env.VUE_APP_MAP_TOKEN)(
			process.env.VUE_APP_MAP_URL,
		)

		watch(
			() => props.search,
			() => {
				geoService
					.searchLocation(props.search)
					.then(places => {
						const place = places[0]
						if (!place) {
							opts.emit('error')
							error.value = true
							return
						}
						error.value = false
						coordinates.value = [Number(place.lon), Number(place.lat)]
					})
					.catch(() => {
						opts.emit('error')
						error.value = true
					})
			},
		)

		return {
			coordinates,
			...toRefs(state),
			error,
		}
	},
})

export default MapComponent
</script>
