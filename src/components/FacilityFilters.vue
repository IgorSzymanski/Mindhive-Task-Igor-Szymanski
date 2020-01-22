<template>
	<div></div>
</template>

<script>
import { createComponent } from '@vue/composition-api'

const Filter = createComponent({
	props: {
		facilities: {
			type: Array,
			required: true,
		},
	},
	setup({ facilities }) {
		console.log(facilities)
		return {}
	},
})

export default Filter
</script>
