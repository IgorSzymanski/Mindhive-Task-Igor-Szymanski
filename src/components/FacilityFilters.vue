<template>
	<form @submit.prevent="submit" class="filters">
		<b-field grouped>
			<b-field label="Nazwa" expanded>
				<b-input v-model="nazwa.contains" placeholder="Nazwa"></b-input>
			</b-field>
			<b-field label="Miejscowość" expanded>
				<b-input
					v-model="miejscowosc.contains"
					placeholder="Miejscowość"
				></b-input>
			</b-field>
			<b-field label="Województwo" expanded>
				<b-autocomplete
					v-model="wojewodztwo.contains"
					:data="voivodeships"
					placeholder="Województwo"
					keep-first
				>
				</b-autocomplete>
			</b-field>
			<b-field label="Funkcja" expanded>
				<b-autocomplete
					v-model="funkcja.contains"
					:data="facilities.map(fac => fac.funkcja)"
					placeholder="Funkcja"
					keep-first
				>
				</b-autocomplete>
			</b-field>
		</b-field>
		<b-field>
			<b-button
				type="is-primary"
				icon-left="magnify"
				native-type="submit"
				expanded
				>Szukaj</b-button
			>
		</b-field>
	</form>
</template>

<script>
import { createComponent, toRefs, reactive } from '@vue/composition-api'

const Filter = createComponent({
	props: {
		facilities: {
			type: Array,
			required: true,
		},
		voivodeships: {
			type: Array,
			required: true,
		},
		tableView: {
			type: Boolean,
		},
	},
	setup(_, opts) {
		const state = reactive({
			nazwa: {
				contains: null,
			},
			miejscowosc: {
				contains: null,
			},
			wojewodztwo: {
				contains: null,
			},
			funkcja: {
				contains: null,
			},
		})

		const submit = () => {
			opts.emit('filter', { ...state })
		}

		return {
			...toRefs(state),
			state,
			submit,
		}
	},
})

export default Filter
</script>

<style lang="scss" scoped>
.filters {
	margin-bottom: 2rem;
}
</style>
