<template>
	<q-view layout='hbox' layout-spacing="0" style="margin:0px;" >
		<q-view layout="vbox" style="min-width:140px; max-width:180px;">
			<q-scroll-view id="navigationScrollView" layout="vbox">
				<q-button id="navigationButton" :text='i18n.baseConfig'  :style="setStyle('baseConfig')" :icon='baseConfigErrorIcon'
					@clicked="navigationBtnClick" data-value="baseConfig" :data-attr="setAttr('baseConfig')"></q-button>
				<q-button id="navigationButton" :text='i18n.iconConfig'  :style="setStyle('iconConfig')" :icon='iconConfigErrorIcon' 
					@clicked="navigationBtnClick" data-value="iconConfig" :data-attr="setAttr('iconConfig')"></q-button>
				<q-button id="navigationButton" :text='i18n.sourceView'  :style="setStyle('sourceView')" :icon='sourceViewErrorIcon'
					@clicked="navigationBtnClick" data-value="sourceView" :data-attr="setAttr('sourceView')" ></q-button>
				<q-view vertical-size-policy='Expanding'></q-view>
			</q-scroll-view>
		</q-view>
		
		<q-view layout="vbox">
			<q-view layout="vbox" :visible="currentBar == 'baseConfig'">
				<q-scroll-view id="navigationScrollView" layout="hbox">
					<q-view layout="vbox" style="min-width:40px; max-width:40px;"> </q-view>
					<q-view layout="vbox" layout-spacing="20">
						<q-view layout="vbox">
							<q-label id="JsonFormPageTitle" :text='i18n.baseConfig'></q-label>
							<q-label id="JsonFormPageDescriptionLabel" :openExternalLinks="true" text="<a style='color:#298bdb' href='http://uniapp.dcloud.io/manifest'>配置指南"></q-label>
						</q-view>
						<q-view layout="vbox">
							<q-label id="JsonFormTitleLabel" :text='i18n.appid'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" text="<a style='color:#298bdb' href='https://ask.dcloud.net.cn/article/35907'>DCloud AppID 使用说明</a>"></q-label>
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox" layout-spacing="5">
									<q-input id="QLineEdit" :text='appid' horizontal-size-policy="Expanding"  vertical-size-policy="Preferred" @currentIndexChanged="setVueDataInfo" data-key='appid' :data-attr="setAppidAttr('appid')" :readOnly='true'></q-input>
									<q-button id="QPushButton" horizontal-size-policy="Preferred"  vertical-size-policy="Preferred" @clicked="getAppidClick" :enabled='appidBtnEnbable' :text='appidBtnText'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.id')" :style="setErrLabelStyle('manifest.id')">
									<q-label id="ErrorLabel" :text='error?.["manifest.id"]'></q-label>
								</q-view>
							</q-view>
							
							<q-label id="JsonFormTitleLabel"  :text='i18n.name'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" text="离线打包需另行配置：<a style='color:#298bdb' href='https://ask.dcloud.net.cn/article/508#name'>Android配置</a>、<a style='color:#298bdb' href='https://ask.dcloud.net.cn/article/41#name'>iOS配置</a>"></q-label>
							<q-view layout="vbox" layout-spacing="0">
								<q-input id="QLineEdit"  :text='name' @textChanged="setVueDataInfo" data-key='name'></q-input>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.name')" :style="setErrLabelStyle('manifest.name')">
									<q-label id="ErrorLabel" :text='error?.["manifest.name"]'></q-label>
								</q-view>
							</q-view>
							
							<q-label id="JsonFormTitleLabel" text="应用描述"></q-label>
							<q-input id="QLineEdit"  :text='description' @textChanged="setVueDataInfo" data-key='description'></q-input>
							<q-label id="ErrorLabel" ></q-label>
							<q-label id="JsonFormTitleLabel" :text='i18n.versionName'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" text="升级时必须高于上一次设置的值。离线打包需另行配置：<a style='color:#298bdb' href='https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android?id=versionCode'>Android配置</a>、<a style='color:#298bdb' href='https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios?id=配置应用版本名称'>iOS配置</a>"></q-label>
							<q-view layout="vbox" layout-spacing="0">
								<q-input id="QLineEdit" :text='versionName' @textChanged="setVueDataInfo" data-key='versionName'></q-input>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.version.name')" :style="setErrLabelStyle('manifest.version.name')">
									<q-label id="ErrorLabel" :text='error?.["manifest.version.name"]'></q-label>
								</q-view>
							</q-view>
							
							
							<q-label id="JsonFormTitleLabel" :text='i18n.versionCode'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" text="应用版本号，必须是整数，取值范围1~2147483647；升级时必须高于上一次设置的值。离线打包需另行配置：<a style='color:#298bdb' href='https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android?id=versionCode'>Android配置</a>、<a style='color:#298bdb' href='https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios?id=配置应用版本号'>iOS配置</a>"></q-label>
							<q-view layout="vbox" layout-spacing="0">
								<q-input id="QLineEdit" :text='versionCode' @textChanged="setVueDataInfo" data-key='versionCode'></q-input>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.version.code')" :style="setErrLabelStyle('manifest.version.code')">
									<q-label id="ErrorLabel" :text='error?.["manifest.version.code"]'></q-label>
								</q-view>
							</q-view>
							<!-- <q-label id="JsonFormTitleLabel"  text="Vue版本选择"></q-label>
							<q-combox id="QComboBox" :items="['2','3']"  :currentText='vueVersion' @currentIndexChanged="setVueDataInfo" data-key='vueVersion'></q-combox> -->
						</q-view>

						<!-- <q-view layout="vbox" >
							<q-label id="JsonFormGroup"  text="国际化"></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" text="<a style='color:#298bdb' href='https://uniapp.dcloud.net.cn/tutorial/i18n.html'>参考文档</a>"></q-label>
						</q-view>

						<q-view layout="vbox">
							<q-label id="JsonFormTitleLabel" text="默认语言"></q-label>
							<q-combox id="QComboBox" :items='localelangList'  :currentText='localeLabel' @currentIndexChanged="setVueDataInfo" data-key='localeLabel' data-value='locale'></q-combox>
							</q-view>

						<q-view layout="vbox" >
							<q-label id="JsonFormTitleLabel" text="默认回退语言"></q-label>
							<q-combox id="QComboBox" :items='localelangList' :currentText='fallbackLocaleLabel' @currentIndexChanged="setVueDataInfo" data-key='fallbackLocaleLabel' data-value='fallbackLocale'></q-combox>
						</q-view> -->
						<q-view vertical-size-policy="Expanding"></q-view>
					</q-view>
					<q-view layout="vbox" style="min-width:40px; max-width:40px;"> </q-view>
				</q-scroll-view>
			</q-view>
			
			<q-view layout="vbox" :visible="currentBar == 'iconConfig'">
				<q-scroll-view id="navigationScrollView" layout="hbox">
					<q-view layout="vbox" style="min-width: 40px;max-width: 40px"> </q-view>
					<q-view layout="vbox" layout-spacing="20">
						<q-view layout="vbox">
							<q-label id="JsonFormPageTitle"  :text='i18n.iconConfig'></q-label>
							<q-label id="JsonFormPageDescriptionLabel" openExternalLinks="true" text="iOS、Android应用图标配置。云打包后生效。本地打包需另行在原生工程中配置。<a style='color:#298bdb'  href='https://uniapp.dcloud.io/tutorial/app-icons'>应用图标配置注意事项</a>"></q-label>
						</q-view>
						
						<q-view layout="vbox">
							<q-label id="JsonFormTitleLabel"  text="自动生成图标"></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" text="仅用于自动生成图标，建议使用1024x1024的图标"></q-label>
							<q-view layout="hbox">
								<q-input id="QLineEdit" horizontal-size-policy="Expanding" vertical-size-policy="Preferred" :text='originalImagePath'></q-input>
								<q-button id="QPushButton" horizontal-size-policy="Preferred"  vertical-size-policy="Preferred" :text='i18n.browse' @clicked="selectImageBtnclick" ></q-button>
							</q-view>
						</q-view>
						
						<q-view layout="hbox" layout-spacing="5">
							<q-checkbox id='JsonFormElementCheckBox' text="不替换手动设置的图标" :checked='replaceUserSettingImage' @clicked="replaceImageCheck"></q-checkbox> 
							<q-button id="QPushButton"  text="自动生成所有图标并替换" @clicked="autoGenerateIconsBtnclick" ></q-button>
							<q-button id="QPushButton"  text="浏览生成图标所在目录" @clicked="openGenerateIconsBtnclick"></q-button>
							<q-view horizontal-size-policy="Expanding"></q-view>
						</q-view>
						
						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormGroup" text="安卓图标配置"></q-label>
							<q-label id="JsonFormTitleLabel" :text='i18n.iconsAndroidhdpi'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" :text='i18n.iconsAndroidhdpiTitle'></q-label>

							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" horizontal-size-policy="Expanding" vertical-size-policy="Preferred" :text='app?.distribute?.icons?.android?.hdpi'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.android.hdpi'></q-input>
									<q-button id="QPushButton" horizontal-size-policy="Preferred"  vertical-size-policy="Preferred"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.android.hdpi'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.android.hdpi')" :style="setErrLabelStyle('manifest.plus.distribute.icons.android.hdpi')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.android.hdpi"]'></q-label>
								</q-view>
							</q-view>
							
						</q-view>
						
						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormTitleLabel"  :text='i18n.iconsAndroidxhdpi'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" 
								:text='i18n.iconsAndroidxhdpiTitle'></q-label>
															
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" horizontal-size-policy="Expanding"  vertical-size-policy="Preferred" :text='app?.distribute?.icons?.android?.xhdpi'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.android.xhdpi'></q-input>
									<q-button id="QPushButton" horizontal-size-policy="Preferred"  vertical-size-policy="Preferred"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.android.xhdpi'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.android.xhdpi')" :style="setErrLabelStyle('manifest.plus.distribute.icons.android.xhdpi')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.android.xhdpi"]'></q-label>
								</q-view>
							</q-view>
						</q-view>
						
						<q-view layout="vbox"  layout-spacing="5">
							<q-label id="JsonFormTitleLabel" :text='i18n.iconsAndroidxxhdpi'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" :text='i18n.iconsAndroidxxhdpiTitle'></q-label>
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" horizontal-size-policy="Expanding"  vertical-size-policy="Preferred" :text='app?.distribute?.icons?.android?.xxhdpi'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.android.xxhdpi'></q-input>
									<q-button id="QPushButton" horizontal-size-policy="Preferred"  vertical-size-policy="Preferred"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.android.xxhdpi'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.android.xxhdpi')" :style="setErrLabelStyle('manifest.plus.distribute.icons.android.xxhdpi')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.android.xxhdpi"]'></q-label>
								</q-view>
							</q-view>
							
						</q-view>
						
						<q-view layout="vbox"  layout-spacing="5">
							<q-label id="JsonFormTitleLabel" text="192x192"></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" :text='i18n.iconsAndroidxxxhdpiTitle'></q-label>
						
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" horizontal-size-policy="Expanding"  vertical-size-policy="Preferred" :text='app?.distribute?.icons?.android?.xxxhdpi'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.android.xxxhdpi'></q-input>
									<q-button id="QPushButton" horizontal-size-policy="Preferred"  vertical-size-policy="Preferred"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.android.xxxhdpi'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.android.xxxhdpi')" :style="setErrLabelStyle('manifest.plus.distribute.icons.android.xxxhdpi')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.android.xxxhdpi"]'></q-label>
								</q-view>
							</q-view>
						
						</q-view>
						
						<!-- <q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormGroup" text="app store"></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" :text='i18n.iconsIosappstoreDescription'></q-label>

							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.appstore'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.appstore'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.appstore'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.appstore')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.appstore')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.appstore"]'></q-label>
								</q-view>
							</q-view>
						</q-view> -->
						
						<!-- iPhone图标配置 -->
						<!-- <q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormGroup" :text='i18n.iconsIosIcon'></q-label>
							<q-label id="JsonFormTitleLabel" :text='i18n.iconsIosIphoneApp'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" :text='i18n.iconsIosIphoneAppDescription'></q-label>
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.iphone?.["app@2x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.iphone.app@2x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.appstore'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.iphone.app@2x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.iphone.app@2x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.iphone.app@2x"]'></q-label>
								</q-view>
							</q-view>
						</q-view>
						
						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormTitleLabel"  :text='i18n.iconsIosIphoneApp3x'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" 
								:text='i18n.iconsIosIphoneApp3xDescription'></q-label>
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.iphone?.["app@3x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.iphone.app@3x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.iphone.app@3x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.iphone.app@3x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.iphone.app@3x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.iphone.app@3x"]'></q-label>
								</q-view>
							</q-view>
						</q-view>
			
						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormTitleLabel"  :text='i18n.iconsIosIphoneSpotlight'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" 
								:text='i18n.iconsIosIphoneSpotlightDescription'></q-label>
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.iphone?.["spotlight@2x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.iphone.spotlight@2x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.iphone.spotlight@2x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.ipad.spotlight@2x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.iphone.spotlight@2x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.iphone.spotlight@2x"]'></q-label>
								</q-view>
							</q-view>
							
						</q-view>
						
						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormTitleLabel" :text='i18n.iconsIosIphoneSpotlight3x'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" 
								:text='i18n.iconsIosIphoneSpotlight3xDescription'></q-label>
							
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.iphone?.["spotlight@3x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.iphone.spotlight@3x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.iphone.spotlight@3x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.ipad.spotlight@3x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.iphone.spotlight@3x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.iphone.spotlight@3x"]'></q-label>
								</q-view>
							</q-view>
						</q-view>

						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormTitleLabel"  :text='i18n.iconsIosIphoneSettings'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" 
								:text='i18n.iconsIosIphoneSettingsDescription'></q-label>
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.iphone?.["settings@2x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.iphone.settings@2x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.iphone.settings@2x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.iphone.settings@2x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.iphone.settings@2x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.iphone.settings@2x"]'></q-label>
								</q-view>
							</q-view>	

						</q-view>
						
						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormTitleLabel"  :text='i18n.iconsIosIphoneSettings3x'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" 
								:text='i18n.iconsIosIphoneSettings3xDescription'></q-label>
								
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.iphone?.["settings@3x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.iphone.settings@3x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.iphone.settings@3x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.iphone.settings@3x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.iphone.settings@3x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.iphone.settings@3x"]'></q-label>
								</q-view>
							</q-view>

						</q-view>
						
						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormTitleLabel"  :text='i18n.iconsIosIphoneNotification'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" :text='i18n.iconsIosIphoneNotificationDescription'></q-label>
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.iphone?.["notification@2x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.iphone.notification@2x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.iphone.notification@2x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.iphone.notification@2x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.iphone.notification@2x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.iphone.notification@2x"]'></q-label>
								</q-view>
							</q-view>
						</q-view>
						
						
						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormTitleLabel"  :text='i18n.iconsIosIphoneNotification3x'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" 
								:text='i18n.iconsIosIphoneNotification3xDescription'></q-label>
							
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.iphone?.["notification@3x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.iphone.notification@3x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.iphone.notification@3x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.iphone.notification@3x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.iphone.notification@3x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.iphone.notification@3x"]'></q-label>
								</q-view>
							</q-view>
						</q-view> -->
					
						<!-- iPad图标配置 -->
						<!-- <q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormGroup"  :text='i18n.iconsIpadIcon'></q-label>
							<q-label id="JsonFormTitleLabel"  :text='i18n.iconsIpadApp'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true"  :text='i18n.iconsIpadAppDescription'></q-label>
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.ipad?.["app"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.ipad.app'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.ipad.app'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.ipad.app')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.ipad.app')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.ipad.app"]'></q-label>
								</q-view>
							</q-view>
							
						</q-view>
						
						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormTitleLabel" :text='i18n.iconsIpadApp2x'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" 
								:text='i18n.iconsIpadApp2xDescription'></q-label>
								
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.ipad?.["app@2x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.ipad.app@2x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.ipad.app@2x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.ipad.app@2x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.ipad.app@2x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.ipad.app@2x"]'></q-label>
								</q-view>
							</q-view>
							
						</q-view>
						
						<q-view layout="vbox"  layout-spacing="5">
							<q-label id="JsonFormTitleLabel" :text='i18n.iconsIpadProapp'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" :text='i18n.iconsIpadProappDescription'></q-label>
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.ipad?.["proapp@2x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.ipad.proapp@2x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.ipad.proapp@2x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.ipad.proapp@2x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.ipad.proapp@2x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.ipad.proapp@2x"]'></q-label>
								</q-view>
							</q-view>
							
						</q-view>
						
						<q-view layout="vbox"  layout-spacing="5">
							<q-label id="JsonFormTitleLabel"  :text='i18n.iconsIpadSpotlight'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" 
								:text='i18n.iconsIpadSpotlightDescription'></q-label>
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.ipad?.["spotlight"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.ipad.spotlight'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.ipad.spotlight'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.ipad.spotlight')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.ipad.spotlight')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.ipad.spotlight"]'></q-label>
								</q-view>
							</q-view>
						</q-view>
						
						<q-view layout="vbox"  layout-spacing="5">
							<q-label id="JsonFormTitleLabel"  :text='i18n.iconsIpadSpotlight2x'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" 
								:text='i18n.iconsIpadSpotlight2xDescription'></q-label>
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.ipad?.["spotlight@2x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.ipad.spotlight@2x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.ipad.spotlight@2x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.ipad.spotlight@2x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.ipad.spotlight@2x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.ipad.spotlight@2x"]'></q-label>
								</q-view>
							</q-view>

						</q-view>
						
						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormTitleLabel" :text='i18n.iconsIpadSettings'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true"
								:text='i18n.iconsIpadSettingsDescription'></q-label>
								<q-view layout="vbox" layout-spacing="0">
									<q-view layout="hbox">
										<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.ipad?.["settings"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.ipad.settings'></q-input>
										<q-button id="QPushButton" style="max-width: 100px"
											:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.ipad.settings'></q-button>
									</q-view>
									<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.ipad.settings')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.ipad.settings')">
										<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.ipad.settings"]'></q-label>
									</q-view>
								</q-view>
						
						</q-view>
						
						<q-view layout="vbox" layout-spacing="5">
							<q-label id="JsonFormTitleLabel" :text='i18n.iconsIpadSettings2x'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" :text='i18n.iconsIpadrSettings2xDescription'></q-label>
							
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.ipad?.["settings@2x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.ipad.settings@2x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.ipad.settings@2x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.ipad.settings@2x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.ipad.settings@2x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.ipad.settings@2x"]'></q-label>
								</q-view>
							</q-view>
						</q-view>
						
						<q-view layout="vbox"  layout-spacing="5">
							<q-label id="JsonFormTitleLabel"  :text='i18n.iconsIpadNotification'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true"
								:text='i18n.iconsIpadNotificationDescription'></q-label>
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.ipad?.["notification"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.ipad.notification'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.ipad.notification'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.ipad.notification')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.ipad.notification')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.ipad.notification"]'></q-label>
								</q-view>
							</q-view>	
						</q-view>
						
						<q-view layout="vbox" layout-spacing="3">
							<q-label id="JsonFormTitleLabel" :text='i18n.iconsIpadNotification2x'></q-label>
							<q-label id="JsonFormDescriptionLabel" :openExternalLinks="true" :text='i18n.iconsIpadNotificationDescription2x'></q-label>
							<q-view layout="vbox" layout-spacing="0">
								<q-view layout="hbox">
									<q-input id="QLineEdit" style="min-height: 28px;max-height: 28px" :text='app?.distribute?.icons?.ios?.ipad?.["notification@2x"]'  @textChanged="setVueDataInfo" data-key='app.distribute.icons.ios.ipad.notification@2x'></q-input>
									<q-button id="QPushButton" style="max-width: 100px"
										:text='i18n.browse'  @clicked="selectIconBtnclick" data-key='app.distribute.icons.ios.ipad.notification@2x'></q-button>
								</q-view>
								<q-view layout="vbox" :id="errLabelTipsStyle('manifest.plus.distribute.icons.ios.ipad.notification@2x')" :style="setErrLabelStyle('manifest.plus.distribute.icons.ios.ipad.notification@2x')">
									<q-label id="ErrorLabel" :text='error?.["manifest.plus.distribute.icons.ios.ipad.notification@2x"]'></q-label>
								</q-view>
							</q-view>
						</q-view> -->

						<q-view vertical-size-policy="Expanding"></q-view>
					</q-view>
					<q-view layout="vbox" style="min-width:40px; max-width:40px;"> </q-view>
				</q-scroll-view>
			</q-view>
			
			<q-view layout="vbox" :visible="currentBar == 'sourceView'">
				<q-scroll-view id="navigationScrollView" layout="vbox">
					<q-source-editor :text='sourceCode' @modified="textModified" languageId="json" :bind-edit-part="true" read-only="false"></q-source-editor>
				</q-scroll-view>
			</q-view>
		</q-view>
	</q-view>
</template>

<script>
	const hx = require('hbuilderx');
	var fs = require("fs");
	var path = require("path");
	let updateDocument = true;
	let customDocumentEditEvent = hx.CustomEditor.CustomDocumentEditEvent;
	export default {
		data() {
			return {
				currentBar: "baseConfig",
				appid:"",
				appidBtnEnbable:true,
				appidBtnText:"",
				errorIconTip:"@icon.folder@warn.png",
				name:"",
				autoSave:true,
				description:"",
				versionName:"",
				versionCode:"",
				vueVersion:"",
				workspaceFolder:{},
				locale:"",
				localeLabel:"",
				fallbackLocale:"",
				replaceUserSettingImage:false,
				fallbackLocaleLabel:"",
				sourceCode:"",
				sourcePath:"",
				originalImagePath:"",
				sourceUpdate:false,
				baseConfigErrorIcon:"",
				iconConfigErrorIcon:"",
				sourceViewErrorIcon:"",
				error:{
					"appid":"",
					"name":"",
					"version.name":"",
					"version.code":"",
					"manifest.plus.distribute.icons.ios.appstore":"文件不存在",
					"manifest.plus.distribute.icons.ios.iphone.app@2x":"文件不存在",
					"manifest.plus.distribute.icons.ios.iphone.app@3x":"文件不存在",
					"manifest.plus.distribute.icons.ios.iphone.notification@2x":"文件不存在",
					"manifest.plus.distribute.icons.ios.iphone.notification@3x":"文件不存在",
					"manifest.plus.distribute.icons.ios.iphone.settings@2x":"文件不存在",
					"manifest.plus.distribute.icons.ios.iphone.settings@3x":"文件不存在",
					"manifest.plus.distribute.icons.ios.iphone.spotlight@2x":"文件不存在",
					"manifest.plus.distribute.icons.ios.iphone.spotlight@3x":"文件不存在",
					"manifest.plus.distribute.icons.ios.ipad.app":"文件不存在",
					"manifest.plus.distribute.icons.ios.ipad.app@2x":"文件不存在",
					"manifest.plus.distribute.icons.ios.ipad.notification":"文件不存在",
					"manifest.plus.distribute.icons.ios.ipad.notification@2x":"文件不存在",
					"manifest.plus.distribute.icons.ios.ipad.proapp@2x":"文件不存在",
					"manifest.plus.distribute.icons.ios.ipad.settings":"文件不存在",
					"manifest.plus.distribute.icons.ios.ipad.settings@2x":"文件不存在",
					"manifest.plus.distribute.icons.ios.ipad.spotlight":"文件不存在",
					"manifest.plus.distribute.icons.ios.ipad.spotlight@2x":"文件不存在",
					"manifest.plus.distribute.icons.android.hdpi":"",
					"manifest.plus.distribute.icons.android.xhdpi":"",
					"manifest.plus.distribute.icons.android.xxhdpi":"",
					"manifest.plus.distribute.icons.android.xxxhdpi":""
				},
				app:{
					distribute:{
						icons:{
							android:{
								 "hdpi": "",
								 "xhdpi": "",
								 "xxhdpi": "",
								 "xxxhdpi": ""
							}
						},
						ios:{
							"appstore" : "",
							"ipad" : {
								"app" : "",
								"app@2x" : "",
								"notification" : "",
								"notification@2x" : "",
								"proapp@2x" : "",
								"settings" : "",
								"settings@2x" : "",
								"spotlight" : "",
								"spotlight@2x" : ""
							},
							"iphone" : {
								"app@2x" : "",
								"app@3x" : "",
								"notification@2x" : "",
								"notification@3x" : "",
								"settings@2x" : "",
								"settings@3x" : "",
								"spotlight@2x" : "",
								"spotlight@3x" : ""
							}
						}
					}
				}
			}
		},
		async created() {
			for(var item of this.localelangList){
				if(this.locale === item.data){
					this.localeLabel = item.label
				}
				if(this.fallbackLocale === item.data){
					this.fallbackLocaleLabel = item.label
				}
			}
			this.errorIconTip = "@icon.folder@warn.png",
			this.error = {},
			this.appidBtnEnbable = true;
			this.appidBtnText = "重新获取";
			this.verify();
		},
		async updated() {
			
			if(updateDocument){
				this.$mitt.emit('saveDocument',{data:this.$.data});
			}
			
			if(!this.sourceUpdate){
				await this.updateUi();
				this.verify();
			}
		},
		computed:{
			errLabelTipsStyle() { 
				return (key) => {
					var status = this.error?.[key]?'ErrorWidgetView':'';
					return status;
				}  
			},
			localelangList() {
				return [
					{
						label: '跟随系统或宿主的语言配置(auto)',
						data: "auto",
					},
					{
						label: '英文(en)',
						data: "en"
					},
					{
						label: '中文简体(zh-Hans)',
						data: "zh-Hans"
					},
					{
						label: '中文繁体(zh-Hant)',
						data: "zh-Hant"
					},
					{
						label: '法语(fr)',
						data: "fr"
					},
					{
						label: '西班牙语(es)',
						data: "es"
					}
				]
			}
		},
		methods: {
			setStyle(key) {
				if(this.currentBar===key){
					return {'border': '0.1px'};
				}
				return {'border': 'none'};
			},
			setAttr(key) {
				if(this.currentBar === key){
					return 'currentBar';
				}
				return '';
			},
			setAppidAttr(key) {
				return key;
			},
			setErrLabelStyle(key) {
				var error = this.error;
				if(!error[key] && !error[key] != ''){
					return {'border': '0.1px'};
				}
				return {'border': 'none'};
			},
			async setVueDataInfo(e)
			{
				const key = e.target['data-key']
				if(e.target.objectName === "QComboBox"){
					if(e.target.currentData){
						const souerceKey = e.target['data-value'];
						if(this.$.data.hasOwnProperty(souerceKey)){
							this[souerceKey] = e.target.currentData					
						}
						this[key] = e.target.currentText;
					}else{
						this[key] = e.target.currentText;
					}
				}else{
					var arr = key.split(".");
					this.setNestedValue(this,Array.from(arr),e.target.text);
				}
			},
			async verify(){
				if(!this.error){
					this.error = {};
				}
				var baseConfigError = false;
				var iconConfigError = false;
			
				var errorResult = await this.verifyManifest();
				
				if(!this.appid){
					if(!errorResult){
						errorResult = {};
					}
					errorResult["manifest.id"] = this.i18n.notEmpty;
					baseConfigError = true;
				} else if(this.appid && !this.appid.startsWith("__UNI__")){
					if(!errorResult){
						errorResult = {};
					}
					errorResult["manifest.id"]=  "Appid必须以__UNI__开头";
					baseConfigError = true;
				} 
				
				//console.log("errorResult:"+JSON.stringify(errorResult));
				if(errorResult){
					var baseConfigKeys = this.getBaseConfigVerifyMaps();
					var iconConfigKeys = this.getIconConfigVerifyMaps();
					var allKeys = {...baseConfigKeys,...iconConfigKeys};
					for(var key in allKeys){
						if(errorResult.hasOwnProperty(key)){
							var name = allKeys[key];
							if(errorResult[key] && errorResult[key] != ''){
								this.error[key] = name + ": " + errorResult[key];
							}else{
								this.error[key] = name + this.i18n.notEmpty;
							}
							if(!baseConfigError){
								if(baseConfigKeys.hasOwnProperty(key)){
									baseConfigError = true
								}
							}
							if(!iconConfigError){
								if(iconConfigKeys.hasOwnProperty(key)){
									iconConfigError = true
								}
							}
							
						}else{
							this.error[key] = '';
						}
					}
				}

				if(baseConfigError){
					if(this.baseConfigErrorIcon !== this.errorIconTip){
						this.baseConfigErrorIcon = this.errorIconTip;
					}
				}else{
					if(this.baseConfigErrorIcon){
						this.baseConfigErrorIcon ='';
					}
				}
				if(iconConfigError){
					if(this.iconConfigErrorIcon !== this.errorIconTip){
						this.iconConfigErrorIcon = this.errorIconTip;
					}
				}else{
					if(this.iconConfigErrorIcon){
						this.iconConfigErrorIcon ='';
					}
				}
			},
			getBaseConfigVerifyMaps(){
				return {
					"manifest.id":this.i18n.appid,
					"manifest.name":this.i18n.name,
					"manifest.version.name":this.i18n.versionName,
					"manifest.version.code":this.i18n.versionCode,
				};
			},
			getIconConfigVerifyMaps(){
				return {
					"manifest.plus.distribute.icons.ios.appstore":"app store",
					"manifest.plus.distribute.icons.ios.iphone.app@2x":this.i18n.iconsIosIphoneApp,
					"manifest.plus.distribute.icons.ios.iphone.app@3x":this.i18n.iconsIosIphoneApp3x,
					"manifest.plus.distribute.icons.ios.iphone.notification@2x":this.i18n.iconsIosIphoneNotification,
					"manifest.plus.distribute.icons.ios.iphone.notification@3x":this.i18n.iconsIosIphoneNotification3x,
					"manifest.plus.distribute.icons.ios.iphone.settings@2x":this.i18n.iconsIosIphoneSettings,
					"manifest.plus.distribute.icons.ios.iphone.settings@3x":this.i18n.iconsIosIphoneSettings3x,
					"manifest.plus.distribute.icons.ios.iphone.spotlight@2x":this.i18n.iconsIosIphoneSpotlight,
					"manifest.plus.distribute.icons.ios.iphone.spotlight@3x":this.i18n.iconsIosIphoneSpotlight3x,
					"manifest.plus.distribute.icons.ios.ipad.app":this.i18n.iconsIpadApp,
					"manifest.plus.distribute.icons.ios.ipad.app@2x":this.i18n.iconsIpadApp,
					"manifest.plus.distribute.icons.ios.ipad.notification":this.i18n.iconsIpadNotification,
					"manifest.plus.distribute.icons.ios.ipad.notification@2x":this.i18n.iconsIpadNotification2x,
					"manifest.plus.distribute.icons.ios.ipad.proapp@2x":this.i18n.iconsIpadProapp,
					"manifest.plus.distribute.icons.ios.ipad.settings":this.i18n.iconsIpadSettings,
					"manifest.plus.distribute.icons.ios.ipad.settings@2x":this.i18n.iconsIpadSettings2x,
					"manifest.plus.distribute.icons.ios.ipad.spotlight":this.i18n.iconsIpadSpotlight,
					"manifest.plus.distribute.icons.ios.ipad.spotlight@2x":this.i18n.iconsIpadSpotlight2x,
					"manifest.plus.distribute.icons.android.hdpi":this.i18n.iconsAndroidhdpi,
					"manifest.plus.distribute.icons.android.xhdpi":this.i18n.iconsAndroidxhdpi,
					"manifest.plus.distribute.icons.android.xxhdpi":this.i18n.iconsAndroidxxhdpi,
					"manifest.plus.distribute.icons.android.xxxhdpi":this.i18n.iconsAndroidxxxhdpi
				}
			},
			async getAppidClick(e){
				//this.appidBtnEnbable = false;
				try{
					var continueText = '继续(&R)';
					var cancelText = '取消(&C)';
					var result =  await hx.window.showMessageBox({
					    type: 'Info',
					    title: "",
						text:'重新获取AppId将会带来很多问题，详情请参考：<a href=\'https://ask.dcloud.net.cn/article/35907\'>DCloud AppID 使用说明</a>，是否继续？',
					    buttons: [continueText, cancelText]
					});
					if(result !== continueText){
						return;
					}
					this.appidBtnText = "获取中...";
					var body = {appname:this.workspaceFolder.name,"type":"uniapp"};
					var result = await hx.http.request({
						url: "https://ide.liuyingyong.cn/app/create",
						method: "post",
						serviceOptions: {
							serviceRequest: true,
							body: body,
						},
					}); 
					if(result && result.service && result.service.code == 1001){
						if(result.service.body){
							this.appid = result.service.body.appid;
						}
					}
				}catch(e){
					console.log("e:",e)
				}
				//this.appidBtnEnbable = true;
				this.appidBtnText = "重新获取";
			},
			async verifyManifest(){
				var error;
				try{
					var workspaceFolder = this.workspaceFolder;
					var manifestPath = path.join(workspaceFolder.uri.fsPath,"manifest.json");
					
					var root = this.hjson.parse(fs.readFileSync(manifestPath, "utf8"));
					
					if(!root){
						root ={}
					}
					var appid = root["appid"];
					var versionName = root["versionName"];
					var versionCode = root["versionCode"];
					var appPlus = root["app"];
					if(!appPlus){
						appPlus = {};
					}
					var modules = appPlus["modules"];
					var distribute = appPlus["distribute"];
					if(!distribute){
						distribute = {}
					}
					var android = distribute["android"];
					if(!android){
						android = {}
					}
					var ios = distribute["ios"];
					if(!ios){
						ios = {}
					}	
					delete root.icons;
					root.id = appid;
					root.permissions = modules;
					
					root.version = {
						name:versionName,
						code:versionCode
					};
					
					distribute.google = android;
					distribute.apple = ios;
					//distribute.plugins = sdkConfigs;
					appPlus.distribute = distribute;
					root.plus = appPlus;
					
					var jsonRequest = {};
						jsonRequest.project =  workspaceFolder.uri.fsPath;
					    jsonRequest.projectNature = workspaceFolder.nature;
					    jsonRequest.manifast = root;
					let extension = hx.extensions.getExtension("uniapp-basic");
					error = await extension.verify(jsonRequest);
				}catch(e){
					console.log(e)
				}
				
				if(error){
					return error.result;
				}
				
				return ;
			},
			async navigationBtnClick(e) {
				//console.log("e.target:",e.target['data-value'])
				if(this.sourceViewErrorIcon){
					await hx.window.showErrorMessage('源码视图不是合法的json',['知道了']);
					return;
				}
				
				if(e.target['data-value'] === "sourceView"){
					this.autoSave = false;
					updateDocument = false;
					var manifestPath = this.sourcePath;
					this.sourceUpdate = true;
					if (fs.existsSync(manifestPath)) {
						this.sourceCode = fs.readFileSync(manifestPath, "utf8");
					}
					this.currentBar = e.target['data-value'];
					await this.updateUi();
					updateDocument = true;
				}else{
					updateDocument = true;
					if(this.sourceUpdate){
						var manifestJson = this.hjson.parse(this.sourceCode)
						Object.assign(this.$.data,manifestJson);
					}
					this.sourceUpdate = false;
					this.autoSave = true;
					this.currentBar = e.target['data-value'];
				}
			},
			async selectImageBtnclick(e){
				var pngPath = await hx.window.showOpenDialog({filters: '*.png'});
				if(Array.isArray(pngPath)){
					this.originalImagePath = pngPath[0];
				}
			},
			async replaceImageCheck(e){
				this.replaceUserSettingImage = e.target.checked
			},
			async autoGenerateIconsBtnclick(e){
				if(!fs.existsSync(this.originalImagePath)){
					return;
				}
				try{
					const icondir = this.getIconsDir();
					var icons = this.getAutoGenerateIcons();
					for(var key in icons){
						var name = icons[key];
						var size = name.split('.')[0].split("x")
						var width = size[0];
						var heigth = size[1];
						var arr = key.split(".");
						if(this.replaceUserSettingImage){
							var filePath = this.getNestedValue(this.$data,Array.from(arr));
							if(filePath){
								if(fs.existsSync(filePath)){
									continue;
								}
								filePath = path.join(this.workspaceFolder.uri.fsPath,filePath);
								filePath = filePath.replace(/\\/g, '/');
								var destFilePath = path.join(icondir,name);
								destFilePath = destFilePath.replace(/\\/g, '/');
								if(fs.existsSync(filePath)){
									if(filePath != destFilePath){
										continue;
									}									
								}
							}
						}
						var iconPath = path.join(icondir,name);
						await this.resizeImage(this.originalImagePath,parseInt(width),parseInt(heigth),iconPath);			
						if(fs.existsSync(iconPath)){
							iconPath = iconPath.replace(/\\/g, '/');
							var projectPath = this.workspaceFolder.uri.fsPath;
							projectPath = projectPath.replace(/\\/g, '/');
							if(iconPath.startsWith(projectPath)){
								iconPath = path.relative(projectPath,iconPath);
							}
							iconPath = iconPath.replace(/\\/g, '/');
							this.setNestedValue(this,Array.from(arr),iconPath);
						}
					}	
				}catch (error) {
					//console.log(error);
				}
				this.verify();
			},
			async openGenerateIconsBtnclick(e){
				await hx.env.openExternal(this.getIconsDir());
			},
			getIconsDir(){
				var iconsPath = path.join(this.workspaceFolder.uri.fsPath,"unpackage","res","icons");
				if(!fs.existsSync(iconsPath)){
					fs.mkdirSync(iconsPath, {
					    recursive: true
					})
				}
				iconsPath = iconsPath.replace(/\\/g, '/'); 
				return iconsPath;
			},
			getAutoGenerateIcons(){
				var generateIcons = {
					"app.distribute.icons.android.hdpi":"72x72.png",
					"app.distribute.icons.android.xhdpi":"96x96.png",
					"app.distribute.icons.android.xxhdpi":"144x144.png",
					"app.distribute.icons.android.xxxhdpi":"192x192.png"
					// "app.distribute.icons.ios.appstore":"1024x1024.png",
					// "app.distribute.icons.ios.ipad.app":"76x76.png",
					// "app.distribute.icons.ios.ipad.app@2x":"152x152.png",
					// "app.distribute.icons.ios.ipad.notification":"20x20.png",
					// "app.distribute.icons.ios.ipad.notification@2x":"40x40.png",
					// "app.distribute.icons.ios.ipad.proapp@2x":"167x167.png",
					// "app.distribute.icons.ios.ipad.settings":"29x29.png",
					// "app.distribute.icons.ios.ipad.settings@2x":"58x58.png",
					// "app.distribute.icons.ios.ipad.spotlight":"40x40.png",
					// "app.distribute.icons.ios.ipad.spotlight@2x":"80x80.png",
					// "app.distribute.icons.ios.iphone.app@2x":"120x120.png",
					// "app.distribute.icons.ios.iphone.app@3x":"180x180.png",
					// "app.distribute.icons.ios.iphone.notification@2x":"40x40.png",
					// "app.distribute.icons.ios.iphone.notification@3x":"60x60.png",
					// "app.distribute.icons.ios.iphone.settings@2x":"58x58.png",
					// "app.distribute.icons.ios.iphone.settings@3x":"87x87.png",
					// "app.distribute.icons.ios.iphone.spotlight@2x":"80x80.png",
					// "app.distribute.icons.ios.iphone.spotlight@3x":"120x120.png"
				}
				return generateIcons;
			},
			async resizeImage(imagePath,width,heigth,resizePath){
				try {
					return new Promise((r) =>{
						this.$mitt.emit('resizeImage', { imagePath, width, heigth, resizePath, r });
					})
				  } catch (error) {
					  console.log(error);
				  }
			},
			getNestedValue(obj, keys) {
			  if (!obj || keys.length === 0) {
			    return undefined;
			  }
			  const currentKey = keys.shift();
			  if (obj.hasOwnProperty(currentKey)) {
			    if (keys.length === 0) {
			      return obj[currentKey];
			    } else {
			      return this.getNestedValue(obj[currentKey], keys);
			    }
			  } else {
				  return undefined;
			  }
			},
			setNestedValue(obj, keys, value) {
			  if (keys.length === 1) {
			    obj[keys[0]] = value;
			    return;
			  }
			  const currentKey = keys.shift();
			  if (!obj[currentKey] || typeof obj[currentKey] !== 'object') {
			    obj[currentKey] = {};
			  }
			  this.setNestedValue(obj[currentKey], keys, value);
			},
			async selectIconBtnclick(e){
				
				try{
					const key = e.target['data-key'];
					var keyArr = key.split(".");
					var filePath = this.getNestedValue(this.$data,Array.from(keyArr));
					var defaultUri = '';
					if(fs.existsSync(filePath)){
						defaultUri = filePath;
					}else if(fs.existsSync(path.join(this.workspaceFolder.uri.fsPath,filePath))){
						defaultUri = path.join(this.workspaceFolder.uri.fsPath,filePath);
					}

					var pngPath = await hx.window.showOpenDialog({filters: '*.png',defaultUri:defaultUri});
				
					if(Array.isArray(pngPath)){
						var arr = key.split(".");
						var imagePath = pngPath[0];
						if(imagePath.startsWith(this.workspaceFolder.uri.fsPath)){
							imagePath = path.relative(this.workspaceFolder.uri.fsPath,imagePath);
						}
						if(imagePath){
							imagePath = imagePath.replace(/\\/g, '/');
							this.setNestedValue(this,Array.from(arr),imagePath);
						}
					}
				}catch(e){
					console.log(e);
				}
			},
			async textModified(e){
				var sourceError = false;
				try{
					if(this.currentBar === "sourceView"){
						var content = e.target.text;
						this.hjson.parse(content);
						this.sourceCode = content;
						this.sourceUpdate = true;
					}
				}catch(e){
					sourceError = true;
					console.log(e);
				}
				
				if(sourceError){
					if(this.sourceViewErrorIcon !== this.errorIconTip){
						this.sourceViewErrorIcon = this.errorIconTip;
						this.updateUi();
					}
				}else{
					if(this.sourceViewErrorIcon){
						this.sourceViewErrorIcon ='';
						this.updateUi();
					}
				}
			}
		}
	}
	
</script>

<style lang='qss'>
	* {
		font-family: "Microsoft YaHei UI", "Menlo", "Consolas";
	}
	#JsonFormPageTitle {
		font-weight: bold;
		font-size: 14pt;
		color:  @settings.headerForeground@;
	}

	#JsonFormPageDescriptionLabel {
		color: @settings.headerDescriptionForeground@;
		font-size: 10pt;
	}

	#JsonFormTitleLabel {
		color: @settings.checkboxForeground@;
		font-size: 10pt;
		padding: 0;
	}

	#JsonFormDescriptionLabel {
		color: @descriptionForeground@;
		font-size: 9pt;
	}
	
	#ErrorLabel{
		padding: 0px 0px 0px 3px;
	    color: @editorError.foreground@;
	    font-weight: bold;
	    background-color: @inputValidation.errorBackground@;
	}
	
	#navigationScrollView #ErrorWidgetView{
	    background-color: @inputValidation.errorBackground@;
	}
	
	#navigationButton {
		border: none;
		padding: 8px 0px 8px 25px;
		font-size: 11pt;
		color: @list.inactiveSelectionForeground@;
		font-weight: bold;
		background-color: @editor.background@;
		text-align: left;
	}
	
	#navigationButton:hover {
		background-color:@list.hoverBackground@;
		color: @list.activeSelectionForeground@;
	}
	
	#navigationButton[data-attr='currentBar'] {
/* 		font-size: 11pt;
		font-weight: bold; */
		color:@list.activeSelectionForeground@
	}

	#QLineEdit {
		height: 26px;
		color: @settings.textInputForeground@;
		font-size: 10pt;
		border: 1px solid @settings.textInputBorder@;
		padding-left: 5px;
		padding-right: 5px;
		background-color:  @settings.textInputBackground@;
	}

	#QLineEdit:focus {
		border: 1px solid @inputOption.activeBorder@;
	}

	#QLineEdit:disabled {
		background-color: @settings.textInputDisableBackground@;
	}
	
	#QLineEdit[data-attr="appid"]{
	    background-color: @settings.textInputDisableBackground@;
	}
	
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

	#navigationScrollView {
		border: none;
		padding:0px;
		border-right: 1px solid @sideBar.border@;
		background:  @editor.background@;
	}

	#navigationScrollView QFrame {
		background: transparent;
		background-color: transparent;
	}

	#navigationScrollView QAbstractScrollArea::corner {
		background: transparent;
	}
	
	#JsonFormGroup{
		color:@settings.checkboxForeground@;
	    font-weight: bold;
	    font-size: 11pt;
	}
	
	#JsonFormElementCheckBox{
	     color: @settings.checkboxForeground@;
		 font-size: 10pt;
	     padding: 0;
	}
		
	#JsonFormElementCheckBox::indicator {
	    width: 16px;
	    height: 16px;
	}
	
	#JsonFormElementCheckBox::indicator:unchecked {
	    image: url(@icon.folder@checkbox-unchecked.png);
	}
	
	#JsonFormElementCheckBox::indicator:checked {
	    image: url(@icon.folder@checkbox-checked.png);
	}
	
	#JsonFormElementCheckBox::indicator:disabled {
	    image: url(@icon.folder@checkbox-checked-disabled.png);
	}
	
	#QComboBox {
	    height: 26px;
	    color: @settings.dropdownForeground@;
	    font-size: 10pt;
	    border: 1px solid @settings.dropdownListBorder@;
	    background-color: @settings.dropdownBackground@;
	    padding-left: 5px;
	    padding-right: 5px;
	}
	
	#QComboBox:on {
	    background-color: @settings.dropdownBackground@;
	}
	
	#QComboBox::drop-down {
	    background-color: @settings.dropdownBackground@;
	    border: none;
	}
	
	#QComboBox::down-arrow {
	    image: url(@icon.folder@arrow-down.png);
	}
	
    #QComboBox QAbstractItemView {
	    border: 1px solid @settings.dropdownListBorder@;
	    font-size: 10pt;
	    padding: 0px;
	    outline: none;
	}
	
	#QComboBox QAbstractItemView::item {
	    border-bottom: 1px solid @inputList.border@;
	    padding: 2px;
	    color: @settings.dropdownForeground@;
	}
	
	#QComboBox QAbstractItemView::item:hover {
	    background-color: @list.hoverBackground@;
	    color: @settings.dropdownForeground@;
	}
	
	#QComboBox QListView::Item{
	        background-color: @settings.dropdownBackground@;
	        border-bottom: 1px solid @settings.dropdownListBorder@;
	        border-left: 1px solid @settings.dropdownListBorder@;
	        border-right: 1px solid @settings.dropdownListBorder@;
	}
	
	#QComboBox QListView::Item:hover{
	        background: @inputList.hoverBackground@;
	}
	#QComboBox QListView::Item:selected:!active,
	#QComboBox QListView::Item:selected:active{
	        background: @inputList.hoverBackground@;
	}	
</style>

<style when="isMac">
#navigationButton {
    font-size: 15pt;
}

#JsonFormPageTitle{
    font-size: 18pt;
}

#JsonFormPageDescriptionLabel {
    font-size: 14pt;
}


#JsonFormTitleLabel,#JsonFormElementCheckBox{
    font-size: 14pt;
}

#JsonFormDescriptionLabel {
    font-size: 13pt;
}

#JsonFormGroup{
    font-size: 15pt;
}

#QLineEdit {
    font-size: 14pt;
}

#QComboBox {
    font-size: 14pt;
}

#QComboBox QAbstractItemView {
    font-size: 14pt;
}

#QPushButton {
    font-size: 14pt;
}
</style>
