<template>
	<header id="header">
		<Navbar />
	</header>
</template>

<script>
import { createComponent } from '@vue/composition-api'
import Navbar from './Navbar.vue'

const Header = createComponent({
	components: { Navbar },
})

export default Header
</script>
