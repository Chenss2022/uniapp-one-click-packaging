<template>
	<q-scroll-view id="navigationScrollView" layout="hbox">
		<slot></slot>
	</q-scroll-view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {},
		mounted() {},
	}
</script>

<style lang='qss'>
	#navigationScrollView {
		border: none;
		padding: 0px;
		background: @editor.background@;
	}

	#navigationScrollView QFrame {
		background: transparent;
		background-color: transparent;
	}

	#navigationScrollView QAbstractScrollArea::corner {
		background: transparent;
	}
</style>