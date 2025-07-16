<template>
	<NavigationScrollView>
		<q-view layout="vbox" style="min-width: 40px;max-width: 40px"> </q-view>
		<q-view layout="vbox" layout-spacing="15">

			<q-view layout="vbox" layout-spacing="0">
				<Title :titleText="i18n.webConfig" :descriptionTitle="i18n.webConfigSubTitle"></Title>
			</q-view>

			<q-view layout="vbox" layout-spacing="8">
				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" :inputLableText="i18n['properties.h5.properties.title.title']" :inputLableSubText="i18n['properties.h5.properties.title.description']"
						:text="manifestJsonValue(['web','title'])" :dataKey="['web','title']" :errorText='error?.["web.title"]'></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnTemplateClick" :inputLableText="i18n['properties.h5.properties.template.title']" :btnText='i18n.browse'
						:inputLableSubText="i18n['properties.h5.properties.template.description']" :text="manifestJsonValue(['web','template'])" :dataKey="['web','template']"
						:errorText='error?.["web.template"]'></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Select :items="routerItems" placeholderText="请选择路由模式" @editTextChanged="setVueDataInfo" :editable="false" :currentText="manifestJsonValue(['web','router','mode'])"
						@currentIndexChanged="setVueDataInfo" :dataKey="['web','router','mode']" :inputLableText="i18n['properties.h5.properties.router.properties.mode.title']"
						:inputLableSubText="i18n['properties.h5.properties.router.properties.mode.description']"></Select>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input ref="web.router.base" @sendTextChanged="setVueDataInfo" :inputLableText="i18n['properties.h5.properties.router.properties.base.title']"
						:inputLableSubText="i18n['properties.h5.properties.router.properties.base.description']" :text="manifestJsonValue(['web','router','base'])" :dataKey="['web','router','base']"
						:errorText='error?.["web.router.base"]'></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<CheckBox :text="i18n['properties.h5.properties.devserver.properties.https.title']" :checked="manifestJsonValueCheckbox(['web','devServer','https'])"
						:dataKey="['web','devServer','https']" @sendClick="setVueDataInfo">
					</CheckBox>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input ref="web.devServer.port" @sendTextChanged="setVueDataInfo" :inputLableText="i18n['properties.h5.properties.devserver.properties.port.title']"
						:inputLableSubText="i18n['properties.h5.properties.devserver.properties.port.description']" :text="manifestJsonValue(['web','devServer','port'])"
						:dataKey="['web','devServer','port']" :errorText='error?.["web.devServer.port"]'></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<CheckBox :text="i18n['properties.h5.properties.optimization.properties.treeshaking.properties.enable.title']"
						:checked="manifestJsonValue(['web','optimization','treeShaking','enable'])" :dataKey="['web','optimization','treeShaking','enable']"
						:lableText="i18n['properties.h5.properties.optimization.properties.treeshaking.properties.enable.description']" @sendClick="setVueDataInfo">
					</CheckBox>
				</JsonelementGroup>

				<JsonelementGroup>
					<CheckBox :text="i18n['properties.moduleuni-push.title']" :checked="manifestJsonValue(['web','unipush','enable'])" :dataKey="['web','unipush','enable']"
						:lableText="i18n['properties.module.uni-push.description']" @sendClick="setVueDataInfo">
					</CheckBox>
				</JsonelementGroup>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle :titleText="i18n['properties.h5.properties.sdkconfigs.properties.maps.title']"
					:descriptionTitle="i18n['properties.h5.properties.sdkconfigs.properties.maps.description']"></JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonelementGroup>
					<CheckBox :useDefault="false" :checkedValue="manifestJsonValue(['web','sdkConfigs','maps','tencent','key'])" unCheckedValue="deleteParent"
						:text="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.qqmap.title']" @sendClick="setVueDataInfo"
						:checked="manifestJsonValueCheckbox(['web','sdkConfigs','maps','tencent','key'])" :dataKey="['web','sdkConfigs','maps','tencent','key']">
						<Input @sendTextChanged="setVueDataInfo" :inputLableText="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.qqmap.properties.key.title']"
							:inputLableSubText="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.qqmap.properties.key.description']"
							:text="manifestJsonValue(['web','sdkConfigs','maps','tencent','key'])" :dataKey="['web','sdkConfigs','maps','tencent','key']"
							:errorText="error?.['web.sdkConfigs.maps.tencent.key']"></Input>
					</CheckBox>
				</JsonelementGroup>
				<JsonelementGroup>
					<CheckBox :useDefault="false" :checkedValue="manifestJsonValue(['web','sdkConfigs','maps','google','key'])" unCheckedValue="deleteParent"
						:text="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.google.title']" @sendClick="setVueDataInfo"
						:checked="manifestJsonValueCheckbox(['web','sdkConfigs','maps','google','key'])" :dataKey="['web','sdkConfigs','maps','google','key']">
						<Input @sendTextChanged="setVueDataInfo" :inputLableText="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.google.properties.key.title']"
							:inputLableSubText="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.google.properties.key.description']"
							:text="manifestJsonValue(['web','sdkConfigs','maps','google','key'])" :dataKey="['web','sdkConfigs','maps','google','key']"
							:errorText="error?.['web.sdkConfigs.maps.google.key']"></Input>
					</CheckBox>
				</JsonelementGroup>
				<JsonelementGroup>
					<CheckBox :useDefault="false" :checkedValue="manifestJsonValue(['web','sdkConfigs','maps','amap','key'])" unCheckedValue="deleteParent"
						:text="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.amap.title']" @sendClick="setVueDataInfo"
						:checked="manifestJsonValueCheckbox(['web','sdkConfigs','maps','amap','key'])" :dataKey="['web','sdkConfigs','maps','amap','key']">
						<Input @sendTextChanged="setVueDataInfo" :inputLableText="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.amap.properties.key.title']"
							:inputLableSubText="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.amap.properties.key.description']"
							:text="manifestJsonValue(['web','sdkConfigs','maps','amap','key'])" :dataKey="['web','sdkConfigs','maps','amap','key']"
							:errorText="error?.['web.sdkConfigs.maps.amap.key']"></Input>
						<Input @sendTextChanged="setVueDataInfo" :inputLableText="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.amap.properties.securityJsCode.title']"
							:inputLableSubText="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.amap.properties.securityJsCode.description']"
							:text="manifestJsonValue(['web','sdkConfigs','maps','amap','securityJsCode'])" :dataKey="['web','sdkConfigs','maps','amap','securityJsCode']"
							:errorText="error?.['web.sdkConfigs.maps.amap.securityJsCode']"></Input>
						<Input @sendTextChanged="setVueDataInfo" :inputLableText="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.amap.properties.serviceHost.title']"
							:inputLableSubText="i18n['properties.h5.properties.sdkconfigs.properties.maps.properties.amap.properties.serviceHost.description']"
							:text="manifestJsonValue(['web','sdkConfigs','maps','amap','serviceHost'])" :dataKey="['web','sdkConfigs','maps','amap','serviceHost']"
							:errorText="error?.['web.sdkConfigs.maps.amap.serviceHost']"></Input>
					</CheckBox>
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
				manifestJson: {},
				workspaceFolder: {},
				error: {},
				routerItems: [{
						label: 'hash',
						data: "hash",
					},
					{
						label: 'history',
						data: "history"
					},
				]
			}
		},
		methods: {}
	}
</script>

<style lang='qss'>
	* {}
</style>