<template>
	<SubTitle :titleText="inputLableText" :descriptionTitle="inputLableSubText"></SubTitle>
	<q-view layout="hbox">
		<q-input :ref="inputRef" id="QLineEdit" horizontal-size-policy="Expanding" vertical-size-policy="Preferred" :readOnly='readOnly' :text="text" @textChanged="textChanged" :data-key="dataKey"></q-input>
		<q-button :visible="btnText" id="QPushButton" horizontal-size-policy="Preferred" vertical-size-policy="Preferred" :enabled='enabled' :text='btnText' @clicked="btnClick" :data-key="dataKey"></q-button>
	</q-view>
	<q-view layout="vbox" id="ErrorWidgetView" :visible='!!errorText'>
		<q-label id="ErrorLabel" :text="`${inputLableText}: ${errorText}`"></q-label>
	</q-view>
</template>

<script>
	export default {
		data() {
			return {
				inputRef: `inputRef-${new Date()}`
			}
		},
		emits: ['sendTextChanged', 'sendBtnclick'],
		props: {
			inputLableText: {
				default: ''
			},
			inputLableSubText: {
				default: ''
			},
			text: {
				default: ''
			},
			dataKey: {
				default: []
			},
			errorText: {
				default: ''
			},
			btnText: {
				default: ''
			},
			readOnly: {
				default: false
			},
			enabled: {
				default: true
			}

		},
		methods: {
			async textChanged(e) {
				this.$emit('sendTextChanged', e);
			},
			async btnClick(e) {
				this.$emit('sendBtnclick', e);
			},
			setFocus() {
				this.$refs[this.inputRef].$el.setFocus()
			}
		},
	}
</script>

<style lang='qss'>
	#QPushButton {
		color: @button.foreground@;
		background-color: @button.background@;
		border: none;
		padding: 5px 10px 5px 10px;
		font-size: 10pt;
	}

	#QPushButton:hover {
		background-color: @button.hoverBackground@;
	}

	#QLineEdit {
		height: 26px;
		color: @settings.textInputForeground@;
		font-size: 10pt;
		border: 1px solid @settings.textInputBorder@;
		padding-left: 5px;
		padding-right: 5px;
		background-color: @settings.textInputBackground@;
	}

	#QLineEdit:focus {
		border: 1px solid @inputOption.activeBorder@;
	}

	#QLineEdit:disabled {
		background-color: @settings.textInputDisableBackground@;
	}

	#QLineEdit[readOnly="true"] {
		background-color: @settings.textInputDisableBackground@;
	}

	#navigationScrollView #ErrorWidgetView {
		background-color: @inputValidation.errorBackground@;
	}

	#ErrorLabel {
		padding: 5px 0px;
		color: @editorError.foreground@;
		font-weight: bold;
		background-color: @inputValidation.errorBackground@;
	}
</style>


<style when="isMac">
	#QLineEdit {
		font-size: 14pt;
	}

	#QPushButton {
		font-size: 14pt;
	}
</style>