<template>
	<div id="app">
		<Main>
			<router-view />
		</Main>
	</div>
</template>

<script>
import { createComponent } from '@vue/composition-api'
import Main from '@/layout/Main.vue'

const App = createComponent({
	components: { Main },
})
export default App
</script>

<style lang="scss">
@import './assets/css/main.scss';
</style>
