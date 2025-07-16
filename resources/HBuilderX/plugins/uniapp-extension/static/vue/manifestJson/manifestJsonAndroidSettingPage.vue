<template>
	<NavigationScrollView>
		<q-view layout="vbox" style="min-width:40px; max-width:40px;"> </q-view>
		<q-view layout="vbox" layout-spacing="15">
			<q-view layout="vbox" layout-spacing="0">
				<Title titleText='安卓App其它配置' descriptionTitle=""></Title>
			</q-view>

			<q-view layout="vbox">
				<!-- 布局使用 -->
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle titleText="Android云打包权限配置"
					descriptionTitle="云打包默认会自动根据App引擎、原生插件所声明的权限打包。您也可以额外添加或强制移除某些权限。<a style='color:#298bdb' href='https://uniapp.dcloud.net.cn/tutorial/app-permission-android.html'>[详情]</a>">
				</JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="8">
				<JsonelementGroup>
					<Editor titleText="额外添加的权限" :text="manifestJsonValue(formItem.permissions)" :dataKey="formItem.permissions" @sendTextChanged="setVueDataInfo"
						:errorText="error?.[formItem.permissions.join('.')]"></Editor>
				</JsonelementGroup>

				<JsonelementGroup>
					<Editor titleText="强制移除的权限" :text="manifestJsonValue(formItem.excludePermissions)" :dataKey="formItem.excludePermissions" @sendTextChanged="setVueDataInfo"
						:errorText="error?.[formItem.excludePermissions.join('.')]"></Editor>
				</JsonelementGroup>

				<JsonFormTitle titleText="minSdkVersion"></JsonFormTitle>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo"
						inputLableSubText="应用兼容的最低Android版本（API等级）；<a style='color:#298bdb' href='https://uniapp.dcloud.io/tutorial/app-android-minsdkversion'>参考文档</a>"
						:text="manifestJsonValue(formItem.minSdkVersion)" :dataKey="formItem.minSdkVersion" :errorText="error?.[formItem.minSdkVersion.join('.')]">
					</Input>
				</JsonelementGroup>

				<JsonFormTitle titleText="targetSdkVersion"></JsonFormTitle>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo"
						inputLableSubText="应用适配的目标Android版本（API等级），部分应用市场要求设置较高的targetSdkVersion才能提交审核；<a style='color:#298bdb' href='https://uniapp.dcloud.io/tutorial/app-android-targetsdkversion'>参考文档</a>"
						:text="manifestJsonValue(formItem.targetSdkVersion)" :dataKey="formItem.targetSdkVersion" :errorText="error?.[formItem.targetSdkVersion.join('.')]">
					</Input>
				</JsonelementGroup>

				<JsonFormTitle titleText="支持CPU类型"></JsonFormTitle>

				<JsonelementGroup>
					<JsonFormItem descriptionTitle="<a style='color:#298bdb' href='https://uniapp.dcloud.io/tutorial/app-android-abifilters'>参考文档</a>">
						<q-view layout="vbox" id="checkBoxBorder" layout-spacing="8">
							<CheckBox text="armeabi-v7a" :checked="manifestJsonValueCheckbox(formItem.abiFilters,'armeabi-v7a')" :dataKey="formItem.abiFilters" @sendClick="setVueDataInfoCheckBoxArray"
								dataValue="armeabi-v7a">
							</CheckBox>
							<CheckBox text="arm64-v8a" :checked="manifestJsonValueCheckbox(formItem.abiFilters,'arm64-v8a')" :dataKey="formItem.abiFilters" @sendClick="setVueDataInfoCheckBoxArray"
								dataValue="arm64-v8a">
							</CheckBox>
							<CheckBox text="x86" :checked="manifestJsonValueCheckbox(formItem.abiFilters,'x86')" :dataKey="formItem.abiFilters" @sendClick="setVueDataInfoCheckBoxArray"
								dataValue="x86">
							</CheckBox>
						</q-view>
					</JsonFormItem>
				</JsonelementGroup>
			</q-view>
			<q-view vertical-size-policy="Expanding"></q-view>
		</q-view>
		<q-view layout="vbox" style="min-width:40px; max-width:40px;"> </q-view>
	</NavigationScrollView>
</template>

<script>
	export default {
		data() {
			return {
				formItem: {
					permissions: ['app', 'distribute', 'android', 'permissions'],
					excludePermissions: ['app', 'distribute', 'android', 'excludePermissions'],
					minSdkVersion: ['app', 'distribute', 'android', 'minSdkVersion'],
					targetSdkVersion: ['app', 'distribute', 'android', 'targetSdkVersion'],
					abiFilters: ['app', 'distribute', 'android', 'abiFilters']
				},
				manifestJson: {},
				workspaceFolder: {},
				error: {},
				step: ''
			}
		},
		methods: {

		}
	}
</script>


<style lang='qss'>
	* {}

	#checkBoxBorder {
		border: 1px solid @settings.textInputBorder@;
		padding: 5px;
	}
</style>