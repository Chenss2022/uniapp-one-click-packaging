// select查询
import {message} from "ant-design-vue";

export function filterOption(input:any, option:any)  {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

/**
 * 上传本地文件到 Electron 指定路径
 */
export const uploadLocalFile = async (file: any, onSuccess: Function, onError: Function,localORonline:boolean) => {
    try {
        const arrayBuffer = await file.arrayBuffer()
        const uint8 = new Uint8Array(arrayBuffer)

        const result = await window.ipcRenderer.invoke('save-local-file', {
            name: file.name,
            buffer: uint8,
            localORonline
        })

        if (result.success) {
            message.success(`${file.name} 上传成功`)
            file.url = result.path // 可传 filename 更安全
            onSuccess(result)
        } else {
            throw new Error(result.error)
        }
    } catch (err) {
        console.error(err)
        message.error(`${file.name} 上传失败`)
        onError(err)
    }
}

/**
 * 删除指定的本地文件（只传文件名）
 */
export const deleteLocalFile = async (filename: string,localORonline:boolean) => {
    const result = await window.ipcRenderer.invoke('delete-local-file', {filename,localORonline})
    if (result.success) {
        message.success(`${filename} 删除成功`)
    } else {
        message.error(`${filename} 删除失败：${result.error}`)
    }
    return result
}
