<template>
	<div id="home">
		<FacilityFilters :facilities="[]" />
	</div>
</template>

<script>
import { createComponent } from '@vue/composition-api'
import FacilityFilters from '@/components/FacilityFilters.vue'

const Home = createComponent({
	components: { FacilityFilters },
})

export default Home
</script>
