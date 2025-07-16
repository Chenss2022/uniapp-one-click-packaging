<template>
	<NavigationScrollView>
		<q-view layout="vbox" style="min-width: 40px;max-width: 40px"> </q-view>
		<q-view layout="vbox" layout-spacing="15">
			<q-view layout="vbox" layout-spacing="15">
				<q-view layout="vbox" layout-spacing="0">
					<Title :titleText='i18n.iconConfig' :descriptionTitle="i18n.iconConfigSubTitle"></Title>
				</q-view>
				<q-view layout="vbox" layout-spacing="8">
					<JsonelementGroup>
						<Input @sendBtnclick="selectImageBtnclick" inputLableText='自动生成图标' inputLableSubText='仅用于自动生成图标，建议使用1024x1024的图标' :btnText='i18n.browse' :text="originalImagePath">
						</Input>
						<q-view layout="hbox" layout-spacing="5" style="margin-top: 5px;">
							<CheckBox text="不替换手动设置的图标" :checked='ignoreManualIcons' @sendClick="replaceImageCheck"></CheckBox>
							<q-button id="QPushButton" text="自动生成所有图标并替换" @clicked="autoGenerateIconsBtnclick"></q-button>
							<q-button id="QPushButton" text="浏览生成图标所在目录..." @clicked="openGenerateIconsBtnclick"></q-button>
							<q-view horizontal-size-policy="Expanding"></q-view>
						</q-view>
					</JsonelementGroup>
				</q-view>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle titleText="Android图标配置"></JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="8">
				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.iconsAndroidhdpi' :inputLableSubText='i18n.iconsAndroidhdpiTitle'
						:btnText='i18n.browse' :text="manifestJsonValue(formItem.androidHdpi)" :dataKey="formItem.androidHdpi" :errorText="error?.[formItem.androidHdpi.join('.')]">
					</Input>

				</JsonelementGroup>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.iconsAndroidxhdpi' :inputLableSubText='i18n.iconsAndroidxhdpiTitle'
						:btnText='i18n.browse' :text="manifestJsonValue(formItem.androidxHdpi)" :dataKey="formItem.androidxHdpi" :errorText="error?.[formItem.androidxHdpi.join('.')]"></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.iconsAndroidxxhdpi' :inputLableSubText='i18n.iconsAndroidxxhdpiTitle'
						:btnText='i18n.browse' :text="manifestJsonValue(formItem.androidxxHdpi)" :dataKey="formItem.androidxxHdpi" :errorText="error?.[formItem.androidxxHdpi.join('.')]"></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.iconsAndroidxxxhdpi' :inputLableSubText='i18n.iconsAndroidxxxhdpiTitle'
						:btnText='i18n.browse' :text="manifestJsonValue(formItem.androidxxxHdpi)" :dataKey="formItem.androidxxxHdpi" :errorText="error?.[formItem.androidxxxHdpi.join('.')]">
					</Input>
				</JsonelementGroup>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle titleText="iOS图标配置"></JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="8">
				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.iconsIosappstoreDescription' inputLableSubText='' :btnText='i18n.browse'
						:text="manifestJsonValue(formItem.appstore)" :dataKey="formItem.appstore" :errorText="error?.[formItem.appstore.join('.')]"></Input>
				</JsonelementGroup>
			</q-view>
			<q-view vertical-size-policy="Expanding"></q-view>
		</q-view>
		<q-view layout="vbox" style="min-width:40px; max-width:40px;"> </q-view>
	</NavigationScrollView>
</template>

<script>
	const hx = require('hbuilderx');
	const path = require('path');
	const fs = require('fs');
	export default {
		data() {
			return {
				formItem: {
					androidHdpi: ['app', 'distribute', 'icons', 'android', 'hdpi'],
					androidxHdpi: ['app', 'distribute', 'icons', 'android', 'xhdpi'],
					androidxxHdpi: ['app', 'distribute', 'icons', 'android', 'xxhdpi'],
					androidxxxHdpi: ['app', 'distribute', 'icons', 'android', 'xxxhdpi'],
					appstore: ['app', 'distribute', 'icons', 'ios', 'appstore']
				},
				ignoreManualIcons: true,
				originalImagePath: '',
				manifestJson: {},
				workspaceFolder: {},
				error: {}
			}
		},
		methods: {
			async replaceImageCheck(e) {
				this.ignoreManualIcons = e.target.checked
				this.$mitt.emit('updateIgnoreManualIcons', e.target.checked)
				await this.updateUi()
			},
			async selectImageBtnclick() {
				try {
					const [pngPath] = await hx.window.showOpenDialog({
						filters: '*.png'
					}) || []
					if (pngPath) {
						this.originalImagePath = pngPath;
						await this.updateUi()
					}
				} catch (error) {
					console.log(error);
				}
			},
			async autoGenerateIconsBtnclick() {
				try {
					if (!fs.existsSync(this.originalImagePath)) {
						await hx.window.showMessageBox({
							type: 'warning',
							title: "",
							text: '请先选择一个合法的png图片',
							buttons: ['确认']
						});
						return;
					}
					const generateIconsName = {
						"app.distribute.icons.android.hdpi": "72x72.png",
						"app.distribute.icons.android.xhdpi": "96x96.png",
						"app.distribute.icons.android.xxhdpi": "144x144.png",
						"app.distribute.icons.android.xxxhdpi": "192x192.png",
						"app.distribute.icons.ios.appstore": "1024x1024.png"
					}
					// this.ignoreManualIcons 为true时候不替换手动设置的

					const that = this
					for (var key in generateIconsName) {
						const value = generateIconsName[key];
						const [width, heigth] = value.split('.')[0].split("x")
						const keys = key.split(".");
						const oldValue = this.manifestJsonValue(keys)
						const dir = this.getIconsDir();
						const opt = {
							imagePath: this.originalImagePath,
							width,
							heigth,
							resizePath: path.resolve(dir, value),
							cb: (data) => {
								const e = {
									target: {
										'data-key': keys,
										text: that.relativePath(data)
									}
								}
								if (that.ignoreManualIcons && oldValue && oldValue !== e.target.text) {

								} else {
									that.setVueDataInfo(e)
								}
							}
						}
						this.$mitt.emit('resizeImage', opt)
					}
				} catch (error) {
					console.log(error);
					//TODO handle the exception
				}
			},
			async openGenerateIconsBtnclick() {
				const dir = this.getIconsDir();
				this.$mitt.emit('openFolder', dir)
			},
			getIconsDir() {
				var iconsPath = path.join(this.unpackagePath, "./res/icons");
				if (!fs.existsSync(iconsPath)) {
					fs.mkdirSync(iconsPath, {
						recursive: true
					})
				}
				iconsPath = iconsPath.replace(/\\/g, '/');
				return iconsPath;
			}
		}
	}
</script>


<style lang='qss'>
	* {}

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
</style>

<style when="isMac">
	#QPushButton {
		font-size: 14pt;
	}
</style>