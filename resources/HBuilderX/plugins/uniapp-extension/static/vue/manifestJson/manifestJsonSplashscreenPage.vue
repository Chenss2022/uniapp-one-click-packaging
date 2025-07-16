<template>
	<NavigationScrollView>
		<q-view layout="vbox" style="min-width: 40px;max-width: 40px"> </q-view>
		<q-view layout="vbox" layout-spacing="15">
			<q-view layout="vbox" layout-spacing="0">
				<Title :titleText='i18n.splashscreenConfig' :descriptionTitle="i18n.splashscreenConfigSubTitle"></Title>
			</q-view>

			<q-view layout="vbox">
				<!-- 布局使用 -->
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle :titleText="i18n.distributeSplashscreenTitle" :descriptionTitle="i18n.distributeSplashscreenDescription"></JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="8">
				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.splashscreensAndroidXhdpi'
						:inputLableSubText='i18n.splashscreensAndroidXhdpiDescription' :btnText='i18n.browse' :text="manifestJsonValue(formItem.androidxHdpi)" :dataKey="formItem.androidxHdpi"
						:errorText="error?.[formItem.androidxHdpi.join('.')]"></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.splashscreensAndroidXxhdpi'
						:inputLableSubText='i18n.splashscreensAndroidXxhdpiDescription' :btnText='i18n.browse' :text="manifestJsonValue(formItem.androidxxHdpi)" :dataKey="formItem.androidxxHdpi"
						:errorText="error?.[formItem.androidxxHdpi.join('.')]"></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.splashscreensAndroidXxxhdpi'
						:inputLableSubText='i18n.splashscreensAndroidXxxhdpiDescription' :btnText='i18n.browse' :text="manifestJsonValue(formItem.androidxxxHdpi)" :dataKey="formItem.androidxxxHdpi"
						:errorText="error?.[formItem.androidxxxHdpi.join('.')]"></Input>
				</JsonelementGroup>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle :titleText="i18n.splashscreensAndroid12Title" :descriptionTitle="i18n.splashscreensAndroid12Description"></JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="8">
				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" :inputLableText='i18n.splashscreensAndroid12BackgroundTitle' :inputLableSubText='i18n.splashscreensAndroid12BackgroundDescription'
						:text="manifestJsonValue(formItem.android12Background)" :dataKey="formItem.android12Background" :errorText="error?.[formItem.android12Background.join('.')]"></Input>
				</JsonelementGroup>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle :titleText="i18n.splashscreensAndroid12IconTitle" :descriptionTitle="i18n.splashscreensAndroid12IconDescription"></JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="8">
				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.splashscreensAndroid12IconXhdpi'
						:inputLableSubText='i18n.splashscreensAndroid12IconXhdpiDescription' :btnText='i18n.browse' :text="manifestJsonValue(formItem.android12IconxHdpi)"
						:dataKey="formItem.android12IconxHdpi" :errorText="error?.[formItem.android12IconxHdpi.join('.')]"></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.splashscreensAndroid12IconXxhdpi'
						:inputLableSubText='i18n.splashscreensAndroid12IconXxhdpiDescription' :btnText='i18n.browse' :text="manifestJsonValue(formItem.android12IconxxHdpi)"
						:dataKey="formItem.android12IconxxHdpi" :errorText="error?.[formItem.android12IconxxHdpi.join('.')]"></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.splashscreensAndroid12IconXxxhdpi'
						:inputLableSubText='i18n.splashscreensAndroid12IconXxxhdpiDescription' :btnText='i18n.browse' :text="manifestJsonValue(formItem.android12IconxxxHdpi)"
						:dataKey="formItem.android12IconxxxHdpi" :errorText="error?.[formItem.android12IconxxxHdpi.join('.')]"></Input>
				</JsonelementGroup>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle :titleText="i18n.splashscreensAndroid12BrandTitle" :descriptionTitle="i18n.splashscreensAndroid12BrandDescription"></JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="8">
				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.splashscreensAndroid12BrandXhdpi'
						:inputLableSubText='i18n.splashscreensAndroid12BrandXhdpiDescription' :btnText='i18n.browse' :text="manifestJsonValue(formItem.android12BrandxHdpi)"
						:dataKey="formItem.android12BrandxHdpi" :errorText="error?.[formItem.android12BrandxHdpi.join('.')]"></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.splashscreensAndroid12BrandXxhdpi'
						:inputLableSubText='i18n.splashscreensAndroid12BrandXxhdpiDescription' :btnText='i18n.browse' :text="manifestJsonValue(formItem.android12BrandxxHdpi)"
						:dataKey="formItem.android12BrandxxHdpi" :errorText="error?.[formItem.android12BrandxxHdpi.join('.')]"></Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.splashscreensAndroid12BrandXxxhdpi'
						:inputLableSubText='i18n.splashscreensAndroid12BrandXxxhdpiDescription' :btnText='i18n.browse' :text="manifestJsonValue(formItem.android12BrandxxxHdpi)"
						:dataKey="formItem.android12BrandxxxHdpi" :errorText="error?.[formItem.android12BrandxxxHdpi.join('.')]"></Input>
				</JsonelementGroup>
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle :titleText="i18n.splashscreensIosTitle"></JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="8">
				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="btnClick" :inputLableText='i18n.splashscreensIosStoryBoardTitle' :btnText='i18n.browse'
						:text="manifestJsonValue(formItem.iosStoryboard)"
						:dataKey="formItem.iosStoryboard" :errorText="error?.[formItem.iosStoryboard.join('.')]"></Input>
				</JsonelementGroup>
			</q-view>
			<q-view layout="vbox">
				<!-- 布局使用 -->
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
					androidxHdpi: ['app', 'distribute', 'splashScreens', 'android', 'xhdpi'],
					androidxxHdpi: ['app', 'distribute', 'splashScreens', 'android', 'xxhdpi'],
					androidxxxHdpi: ['app', 'distribute', 'splashScreens', 'android', 'xxxhdpi'],
					android12Background: ['app', 'distribute', 'splashScreens', 'android12', 'background'],
					android12IconxHdpi: ['app', 'distribute', 'splashScreens', 'android12', 'icon', 'xhdpi'],
					android12IconxxHdpi: ['app', 'distribute', 'splashScreens', 'android12', 'icon', 'xxhdpi'],
					android12IconxxxHdpi: ['app', 'distribute', 'splashScreens', 'android12', 'icon', 'xxxhdpi'],
					android12BrandxHdpi: ['app', 'distribute', 'splashScreens', 'android12', 'brand', 'xhdpi'],
					android12BrandxxHdpi: ['app', 'distribute', 'splashScreens', 'android12', 'brand', 'xxhdpi'],
					android12BrandxxxHdpi: ['app', 'distribute', 'splashScreens', 'android12', 'brand', 'xxxhdpi'],
					iosStoryboard: ['app','distribute','splashScreens','ios','storyboard']
				},
				manifestJson: {},
				workspaceFolder: {},
				error: {

				}
			}
		}
	}
</script>


<style lang='qss'>
	* {}
</style>