<template>
	<NavigationScrollView>
		<q-view layout="vbox" style="min-width:40px; max-width:40px;"> </q-view>
		<q-view layout="vbox" layout-spacing="15">
			<q-view layout="vbox" layout-spacing="0">
				<Title :titleText='i18n.baseConfig' :descriptionTitle="i18n.baseConfigSubTitle"></Title>
			</q-view>
			
			<q-view layout="vbox" layout-spacing="8">
				<JsonelementGroup>
					<Input @sendTextChanged="setVueDataInfo" @sendBtnclick="getAppidClick" :inputLableText='i18n.appid' :enabled='true' :readOnly='true'
						inputLableSubText="<a style='color:#298bdb' href='https://ask.dcloud.net.cn/article/35907'>DCloud AppID 使用说明</a>" :btnText='appidBtnText' :text="manifestJsonValue(['appid'])"
						:dataKey="['appid']" :errorText='error?.["appid"]'>
					</Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input ref="name" @sendTextChanged="setVueDataInfo" :inputLableText='i18n.name'
						inputLableSubText="离线打包需另行配置：<a style='color:#298bdb' href='https://ask.dcloud.net.cn/article/508#name'>Android配置</a>、<a style='color:#298bdb' href='https://ask.dcloud.net.cn/article/41#name'>iOS配置</a>"
						:text="manifestJsonValue(['name'])" :dataKey="['name']" :errorText='error?.["name"]'>
					</Input>
				</JsonelementGroup>


				<JsonelementGroup>
					<Input ref="description" @sendTextChanged="setVueDataInfo" :inputLableText='i18n.description' :text="manifestJsonValue(['description'])" :dataKey="['description']"
						:errorText='error?.["description"]'>
					</Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input ref="versionName" @sendTextChanged="setVueDataInfo" :inputLableText='i18n.versionName'
						inputLableSubText="升级时必须高于上一次设置的值。离线打包需另行配置：<a style='color:#298bdb' href='https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android?id=versionCode'>Android配置</a>、<a style='color:#298bdb' href='https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios?id=配置应用版本名称'>iOS配置</a>"
						:text="manifestJsonValue(['versionName'])" :dataKey="['versionName']" :errorText='error?.["versionName"]'>
					</Input>
				</JsonelementGroup>

				<JsonelementGroup>
					<Input ref="versionCode" @sendTextChanged="setVueDataInfo" :inputLableText='i18n.versionCode'
						inputLableSubText="应用版本号，必须是整数，取值范围1~2147483647；升级时必须高于上一次设置的值。离线打包需另行配置：<a style='color:#298bdb' href='https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android?id=versionCode'>Android配置</a>、<a style='color:#298bdb' href='https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios?id=配置应用版本号'>iOS配置</a>"
						:text="manifestJsonValue(['versionCode'])" :dataKey="['versionCode']" :errorText='error?.["versionCode"]'>
					</Input>
				</JsonelementGroup>
			</q-view>
			<q-view vertical-size-policy="Expanding"></q-view>
		</q-view>
		<q-view layout="vbox" style="min-width:40px; max-width:40px;"> </q-view>
	</NavigationScrollView>
</template>

<script>
	const hx = require('hbuilderx');
	export default {
		data() {
			return {
				appidBtnText: "重新获取",
				manifestJson: {},
				workspaceFolder: {},
				error: {}
			}
		},
		methods: {
			async getAppidClick() {
				try {
					this.appidBtnText = "获取中...";
					await this.updateUi()
					var continueText = '继续(&R)';
					var cancelText = '取消(&C)';
					var result = await hx.window.showMessageBox({
						type: 'warning',
						title: "",
						text: '重新获取AppId将会带来很多问题，详情请参考：<a href=\'https://ask.dcloud.net.cn/article/35907\'>DCloud AppID 使用说明</a>，是否继续？',
						buttons: [continueText, cancelText]
					});
					if (result !== continueText) {
						return;
					}
					var body = {
						appname: this.workspaceFolder.name,
						"type": "uniapp"
					};
					var result = await hx.http.request({
						url: "https://ide.liuyingyong.cn/app/create",
						method: "post",
						serviceOptions: {
							serviceRequest: true,
							body: body,
						},
					});
					if (result && result.service && result.service.code == 1001) {
						if (result.service.body) {
							if (this.manifestJson.appid === result.service.body.appid) {
								await hx.window.showMessageBox({
									type: 'info',
									title: "",
									text: '同一个项目只能分配一个AppId',
									buttons: ['确定']
								});
							}
							this.manifestJson.appid = result.service.body.appid;
						}
					}
				} catch (e) {
					console.log("e:", e)
				} finally {
					await this.updateUi()
					await this.$mitt.emit('updateJson', this.manifestJson)
					this.appidBtnText = "重新获取";
				}
			}
		}
	}
</script>


<style lang='qss'>
	* {}
</style>