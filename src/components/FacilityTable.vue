<template>
	<div class="facility-table">
		<div class="field">
			<b-checkbox v-model="table">Widok tablicy</b-checkbox>
		</div>
		<div class="timeline is-centered" v-if="!table">
			<b-select placeholder="Sortuj" v-model="sorted" @input="onMSort">
				<option
					v-for="(option, index) in sortable"
					:value="option.value"
					:key="index"
				>
					{{ option.label }}
				</option>
			</b-select>
			<template v-for="facility in facilities">
				<header class="timeline-header" :key="`head-${facility.id}`">
					<b-tooltip label="Wiek powstania">
						<span class="tag is-info">{{
							facility.chronologia | formatCentury
						}}</span>
					</b-tooltip>
				</header>
				<div class="timeline-item is-success" :key="`item-${facility.id}`">
					<div
						class="timeline-marker is-danger is-icon"
						v-if="isVisited(facility.id)"
					>
						<b-tooltip label="Usuń z odwiedzonych">
							<b-icon
								icon="map-marker-remove"
								size="is-small"
								class="click"
								@click.native="onRemoveFromVisited(facility.id)"
							/>
						</b-tooltip>
					</div>
					<div class="timeline-marker is-success is-icon" v-else>
						<b-tooltip label="Dodaj do odwiedzonych">
							<b-icon
								icon="map-marker-plus"
								size="is-small"
								class="click"
								@click.native="onAddToVisited(facility)"
							/>
						</b-tooltip>
					</div>
					<div class="timeline-content">
						<p class="heading">{{ facility.funkcja }}</p>
						<p class="fac-name">{{ facility.nazwa }}</p>
						<p>
							{{ facility.miejscowosc }}, Województwo {{ facility.wojewodztwo }}
						</p>
						<p>
							<b-tooltip label="Zobacz na mapie">
								<b-button
									icon-left="map"
									type="is-warning"
									size="is-small"
									rounded
									@click="openMap(facility)"
								/>
							</b-tooltip>
						</p>
					</div>
				</div>
			</template>
			<nav role="navigation" class="navbar is-fixed-bottom has-shadow nav-pag">
				<b-pagination
					:total="count"
					:current="page"
					rounded
					order="is-centered"
					@change="onPageChange"
					:per-page="perPage"
					:mobile-burger="false"
					size="is-small"
				/>
			</nav>
		</div>
		<b-table
			:data="facilities"
			:loading="loading"
			striped
			:backend-sorting="backendSorting"
			@sort="onSort"
			paginated
			:backend-pagination="backendPagination"
			@page-change="onPageChange"
			:current-page="page"
			:per-page="perPage"
			:total="count"
			pagination-position="both"
			v-else
		>
			<template slot-scope="props">
				<b-table-column field="nazwa" label="Nazwa" sortable>
					{{ props.row.nazwa }}
				</b-table-column>

				<b-table-column field="funkcja" label="Funkcja" sortable>
					{{ props.row.funkcja }}
				</b-table-column>

				<b-table-column field="wojewodztwo" label="Województwo" sortable>
					{{ props.row.wojewodztwo }}
				</b-table-column>

				<b-table-column field="miejscowosc" label="Miejscowość" sortable>
					{{ props.row.miejscowosc }}
				</b-table-column>

				<b-table-column field="chronologia" label="Wiek pochodzenia" sortable>
					<span :title="props.row.chronologia">{{
						props.row.chronologia | formatCentury
					}}</span>
				</b-table-column>

				<b-table-column>
					<b-tooltip label="Zobacz na mapie">
						<b-button
							icon-left="map"
							type="is-info"
							@click="openMap(props.row)"
						/>
					</b-tooltip>
				</b-table-column>
				<b-table-column v-if="isVisited" label="">
					<b-tooltip label="Usuń z odwiedzonych" v-if="isVisited(props.row.id)">
						<b-button
							type="is-danger"
							icon-left="map-marker-remove"
							@click="onRemoveFromVisited(props.row.id)"
						/>
					</b-tooltip>
					<b-tooltip label="Dodaj do odwiedzonych" v-else>
						<b-button
							type="is-success"
							icon-left="map-marker-plus"
							@click="onAddToVisited(props.row)"
						/>
					</b-tooltip>
				</b-table-column>
			</template>
			<template slot="empty">
				<section class="section">
					<div class="content has-text-grey has-text-centered">
						<p>
							<b-icon icon="emoticon-sad" size="is-large"> </b-icon>
						</p>
						<p>Nic tu nie ma.</p>
					</div>
				</section>
			</template>
		</b-table>
	</div>
</template>

<script>
import { createComponent, ref } from '@vue/composition-api'
import { formatCentury } from '@/filters/formatCentury'
import TableMobileSort from 'buefy/src/components/table/TableMobileSort.vue'

const FacilityTable = createComponent({
	components: { TableMobileSort },
	filters: { formatCentury },
	props: {
		facilities: {
			type: Array,
			required: true,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		page: {
			type: Number,
		},
		count: {
			type: Number,
		},
		totalPages: {
			type: Number,
		},
		perPage: {
			type: Number,
		},
		backendPagination: {
			type: Boolean,
			default: false,
		},
		backendSorting: {
			type: Boolean,
			default: false,
		},
		isVisited: {
			type: Function,
		},
	},
	setup(props, opts) {
		const table = ref(false)

		const sorted = ref(null)
		const sortable = ref([
			{
				label: 'Chronologia (rosnąco)',
				value: ['chronologia', 'ASC'],
			},
			{
				label: 'Chronologia (malejąco)',
				value: ['chronologia', 'DESC'],
			},
			{
				label: 'Nazwa (rosnąco)',
				value: ['nazwa', 'ASC'],
			},
			{
				label: 'Nazwa (malejąco)',
				value: ['nazwa', 'DESC'],
			},
		])

		const onSort = (...sort) => {
			opts.emit('sort', sort)
		}
		const onMSort = sort => {
			opts.emit('sort', sort)
		}

		const onPageChange = page => {
			opts.emit('pageChange', page)
		}

		const onFilterChange = filter => {
			opts.emit('filterChange', filter)
		}

		const onAddToVisited = filter => {
			opts.emit('addToVisited', filter)
		}

		const onRemoveFromVisited = id => {
			opts.emit('removeFromVisited', id)
		}

		const openMap = fac => {
			opts.emit(
				'mapRequest',
				[fac.ulica, fac.numerAdresowy, fac.miejscowosc, fac.wojewodztwo].join(
					' ',
				),
			)
		}
		return {
			onSort,
			onMSort,
			onPageChange,
			onFilterChange,
			onAddToVisited,
			onRemoveFromVisited,
			openMap,
			table,
			sorted,
			sortable,
		}
	},
})

export default FacilityTable
</script>

<style lang="scss" scoped>
.click {
	cursor: pointer;
}
.nav-pag {
	display: block;
	padding: 1rem;
}

.timeline-header {
	cursor: help;
	.tag {
		text-transform: uppercase;
	}
}

.fac-name {
	text-transform: uppercase;
	font-weight: bold;
}
</style>
