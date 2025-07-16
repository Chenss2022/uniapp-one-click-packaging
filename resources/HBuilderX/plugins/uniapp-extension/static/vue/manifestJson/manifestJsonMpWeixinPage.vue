<template>
	<NavigationScrollView>
		<q-view layout="vbox" style="min-width: 40px;max-width: 40px"> </q-view>
		<q-view layout="vbox" layout-spacing="15">

			<q-view layout="vbox" layout-spacing="0">
				<Title :titleText='i18n.mpWeixinConfig' :descriptionTitle="i18n.mpWeixinConfigSubTitle"></Title>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonelementGroup>
					<Input ref="mp-weixin.appid" @sendTextChanged="setVueDataInfo" :inputLableText="i18n['properties.mp-weixin.properties.appid.title']"
						:text="manifestJsonValue(['mp-weixin','appid'])" :dataKey="['mp-weixin','appid']" :errorText="error?.['mp-weixin.appid']"></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<CheckBox :text="i18n['properties.mp-weixin.properties.setting.properties.es6.title']" :checked="manifestJsonValue(['mp-weixin','setting','es6'])"
						:dataKey="['mp-weixin','setting','es6']" @sendClick="setVueDataInfo">
					</CheckBox>
				</JsonelementGroup>

				<JsonelementGroup>
					<CheckBox :text="i18n['properties.mp-weixin.properties.setting.properties.postcss.title']" :checked="manifestJsonValue(['mp-weixin','setting','postcss'])"
						:dataKey="['mp-weixin','setting','postcss']" @sendClick="setVueDataInfo">
					</CheckBox>
				</JsonelementGroup>

				<JsonelementGroup>
					<CheckBox :text="i18n['properties.mp-weixin.properties.setting.properties.minified.title']" :checked="manifestJsonValue(['mp-weixin','setting','minified'])"
						:dataKey="['mp-weixin','setting','minified']" @sendClick="setVueDataInfo">
					</CheckBox>
				</JsonelementGroup>

				<JsonelementGroup>
					<CheckBox :text="i18n['properties.mp-weixin.properties.setting.properties.urlcheck.title']" :checked="manifestJsonValue(['mp-weixin','setting','urlCheck'])"
						:dataKey="['mp-weixin','setting','urlCheck']" @sendClick="setVueDataInfo">
					</CheckBox>
				</JsonelementGroup>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle :titleText="i18n['mp-weixin.permission.title']"></JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonelementGroup>
					<CheckBox :useDefault="false" checkedValue="" unCheckedValue="deleteParent" :text="i18n['properties.mp-weixin.properties.permission.properties.scope.userlocation.title']"
						:checked="manifestJsonValueCheckbox(['mp-weixin','permission','scope.userLocation','desc'])" :dataKey="['mp-weixin','permission','scope.userLocation','desc']"
						@sendClick="setVueDataInfo">
						<Input @sendTextChanged="setVueDataInfo" :inputLableText="i18n['properties.mp-weixin.properties.permission.properties.scope.userlocation.properties.desc.title']"
							:inputLableSubText="i18n['properties.mp-weixin.properties.permission.properties.scope.userlocation.properties.desc.description']"
							:text="manifestJsonValue(['mp-weixin','permission','scope.userLocation','desc'])" :dataKey="['mp-weixin','permission','scope.userLocation','desc']"
							:errorText="error?.['mp-weixin.permission.scope.userLocation.desc']"></Input>
					</CheckBox>
				</JsonelementGroup>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle :titleText="i18n['mp-weixin.moduleConfigure.title']"></JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonelementGroup>
					<CheckBox :text="i18n['properties.moduleuni-push.title']" :checked="manifestJsonValue(['mp-weixin','unipush','enable'])" :dataKey="['mp-weixin','unipush','enable']"
						:lableText="i18n['properties.module.uni-push.description']" @sendClick="setVueDataInfo">
					</CheckBox>
				</JsonelementGroup>
				<JsonelementGroup>
					<CheckBox :text="i18n['properties.properties.secureNetwork.properties.enable.title']" :checked="manifestJsonValue(['mp-weixin','secureNetwork','enable'])"
						:dataKey="['mp-weixin','secureNetwork','enable']" :lableText="i18n['properties.properties.secureNetwork.properties.enable.description']" @sendClick="setVueDataInfo">
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
				error: {}
			}
		}
	}
</script>

<style lang='qss'>
	* {}
</style>