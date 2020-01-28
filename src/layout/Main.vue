<template>
	<div id="main">
		<Header />
		<slot />
		<Footer />
	</div>
</template>

<script>
import { createComponent } from '@vue/composition-api'
import Header from './Header.vue'
import Footer from './Footer.vue'

const Main = createComponent({
	components: { Header, Footer },
})
export default Main
</script>

<style lang="scss" scoped>
#main {
	padding: 3rem;
}
</style>
