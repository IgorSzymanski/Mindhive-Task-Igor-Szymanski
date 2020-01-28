<template>
	<b-navbar fixed-top shadow>
		<template slot="start">
			<b-navbar-item>
				<router-link :to="{ name: 'home' }">
					Strona główna
				</router-link>
			</b-navbar-item>
			<b-navbar-item>
				<router-link :to="{ name: 'visited' }">
					Odwiedzone
				</router-link>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script>
import { createComponent } from '@vue/composition-api'

const Navbar = createComponent({})

export default Navbar
</script>
