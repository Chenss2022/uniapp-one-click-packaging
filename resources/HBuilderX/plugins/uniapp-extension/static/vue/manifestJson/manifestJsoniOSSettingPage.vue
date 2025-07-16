<template>
	<NavigationScrollView>
		<q-view layout="vbox" style="min-width:40px; max-width:40px;"> </q-view>
		<q-view layout="vbox" layout-spacing="15">
			<q-view layout="vbox" layout-spacing="0">
				<Title titleText='iOS App其它配置' descriptionTitle=""></Title>
			</q-view>

			<q-view layout="vbox">
				<!-- 布局使用 -->
			</q-view>

			<q-view layout="vbox" layout-spacing="0">
				<JsonFormTitle titleText="iOS隐私信息访问的许可描述" descriptionTitle="Appstore审核要求App在调用如下涉及隐私的API时必须说明调用原因，该原因描述会弹框给最终手机用户以便手机用户确认是否给予隐私访问许可"></JsonFormTitle>
			</q-view>

			<q-view layout="vbox" layout-spacing="8">
				<JsonelementGroup v-for="(item) in formItems">
					<Input @sendTextChanged="setVueDataInfo" :inputLableText="item.inputLableText" :inputLableSubText="item.inputLableSubText" :text="manifestJsonValue(item.key)" :dataKey="item.key" :errorText="error?.[item.key.join('.')]">
					</Input>
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
				formItems: [{
					inputLableText: '相册-读(NSPhotoLibraryUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSPhotoLibraryUsageDescription']
				}, {
					inputLableText: '相册-写(NSPhotoLibraryAddUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSPhotoLibraryAddUsageDescription']
				}, {
					inputLableText: '摄像头(NSCameraUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSCameraUsageDescription']
				}, {
					inputLableText: '麦克风(NSMicrophoneUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSMicrophoneUsageDescription']
				}, {
					inputLableText: '运行期访问位置(NSLocationWhenInUseUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSLocationWhenInUseUsageDescription']
				}, {
					inputLableText: '后台运行访问位置(NSLocationAlwaysUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSLocationAlwaysUsageDescription']
				}, {
					inputLableText: '访问位置(NSLocationAlwaysAndWhenInUseUsageDescription)',
					inputLableSubText:"iOS11.3及更高版本",
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSLocationAlwaysAndWhenInUseUsageDescription']
				}, {
					inputLableText: '日历(NSCalendarsUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSCalendarsUsageDescription']
				}, {
					inputLableText: '通讯录(NSContactsUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSContactsUsageDescription']
				}, {
					inputLableText: '蓝牙(NSBluetoothPeripheralUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSBluetoothPeripheralUsageDescription']
				}, {
					inputLableText: '蓝牙(NSBluetoothAlwaysUsageDescription)',
					inputLableSubText:"iOS13及更高版本",
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSBluetoothAlwaysUsageDescription']
				}, {
					inputLableText: '系统语音识别(NSSpeechRecognitionUsageDescription)',
					inputLableSubText:"iOS10及更高版本",
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSSpeechRecognitionUsageDescription']
				}, {
					inputLableText: '提醒事项(NSRemindersUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSRemindersUsageDescription']
				}, {
					inputLableText: '运动与健身(NSMotionUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSMotionUsageDescription']
				}, {
					inputLableText: '健康更新(NSHealthUpdateUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSHealthUpdateUsageDescription']
				}, {
					inputLableText: '健康分享(NSHealthShareUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSHealthShareUsageDescription']
				}, {
					inputLableText: '媒体资料库(NSAppleMusicUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSAppleMusicUsageDescription']
				}, {
					inputLableText: '使用NFC(NFCReaderUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NFCReaderUsageDescription']
				}, {
					inputLableText: '访问临床记录(NSHealthClinicalHealthRecordsShareUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSHealthClinicalHealthRecordsShareUsageDescription']
				}, {
					inputLableText: '访问HomeKit数据(NSHomeKitUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSHomeKitUsageDescription']
				}, {
					inputLableText: '访问Siri(NSSiriUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSSiriUsageDescription']
				}, {
					inputLableText: '使用Face ID(NSFaceIDUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSFaceIDUsageDescription']
				}, {
					inputLableText: '访问本地网络(NSLocalNetworkUsageDescription)',
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSLocalNetworkUsageDescription']
				}, {
					inputLableText: '跟踪用户的活动(NSUserTrackingUsageDescription)',
					inputLableSubText:"iOS14及更高版本",
					key: ['app', 'distribute', 'ios', 'privacyDescription', 'NSUserTrackingUsageDescription']
				}],
				manifestJson: {},
				workspaceFolder: {},
				error: {}
			}
		},
		methods: {

		}
	}
</script>


<style lang='qss'>
	* {}
</style>