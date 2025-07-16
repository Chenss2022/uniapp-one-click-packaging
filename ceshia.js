// src/components/utils/build.js
import { spawnSync, spawn } from 'child_process';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import os from 'os';
import { createUnzip } from 'zlib';
import AdmZip from 'adm-zip'; // 安装：npm i adm-zip

// ────────────────────────────── ❶ 常量配置 ──────────────────────────────
// JDK 根目录（无 \bin）——始终正确指向 src/java/jdk‑17
let JAVA_HOME = path.resolve(process.cwd(),'resources', 'Java', 'jdk-17');

// const CLI_HBX = 'D:\\progrom\\HBuilderX\\cli.exe';
let CLI_HBX = path.resolve(process.cwd(),'resources', 'HBuilderX', 'cli.exe');

// 源项目目录
let UNI_SRC = 'C:\\Users\\16014\\Desktop\\uni-app\\uni-app';
// const RES_DIR = path.join(UNI_SRC, 'unpackage', 'resources');

// const PROJECT_DIR = 'F:\\MYCODE\\oneBuild\\HBuilder-Integrate-AS';
let PROJECT_DIR = path.resolve(process.cwd(),'resources', 'HBuilder-Integrate-AS');

// 本地打包需要修改的参数路径
let SIMPLE_DEMO_DIR = path.join(PROJECT_DIR, 'simpleDemo');
let DEST_APPS_DIR = path.join(SIMPLE_DEMO_DIR, 'src', 'main', 'assets', 'apps');
let DCLOUD_CONTROL_XML = path.join(SIMPLE_DEMO_DIR, 'src', 'main', 'assets', 'data', 'dcloud_control.xml');
let BUILD_GRADLE_PATH = path.join(SIMPLE_DEMO_DIR, 'build.gradle');
let MANIFEST_XML_PATH = path.join(SIMPLE_DEMO_DIR, 'src', 'main', 'AndroidManifest.xml');

// 本地打包需要修改的参数
let PACKAGE_NAME = 'uni.UNI1EA86F6';//包名
let APP_KEY = 'c034a6af976352c1b4bc7095b4fbab4b';//app_key
let KEY_PASSWORD = 'qLHRyGOS';//密码
let STORE_PASSWORD = 'qLHRyGOS';//密码
let STORE_FILE = 'dcb8774b0369146ca832dd83aa361f7e.keystore';//密钥文件

// 本地打包apk输出路径
let APK_OUTPUT_DIR = '';

// ─────────────────────── ❷ 工具函数 ─────────────────────────
// function runSync(cmd, args, options = {}, log) {
//     log && log(`>>> ${[cmd, ...args].join(' ')}`);
//     const res = spawnSync(cmd, args, { stdio: 'inherit', ...options });
//     if (res.status !== 0) throw new Error(`${cmd} exited with code ${res.status}`);
// }

// function runSync(cmd, args, options = {}, log) {
//     const res = spawnSync(cmd, [...args, '--stacktrace', '--info'],
//         { encoding: 'utf8', stdio: 'pipe', ...options });
//     log && log(1111,res.stdout);
//     log && log(res.stderr);
//     if (res.status !== 0) throw new Error(`${cmd} exited with code ${res.status}`);
// }

// 异步执行，打印实时日志
function runSyncLive(cmd, args, options = {}, log) {
    return new Promise((resolve, reject) => {
        log && log(`>>> ${[cmd, ...args].join(' ')}`);

        const p = spawn(cmd, args, {
            shell: true,
            ...options
        });

        p.stdout.on('data', d => log && log(d.toString()));
        p.stderr.on('data', d => log && log(d.toString()));

        p.on('close', code => {
            if (code !== 0) {
                reject(new Error(`${cmd} exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}


/** 异步运行并实时输出（用于 HBuilderX CLI） */
function run(cmd, args, options = {}, log) {
    return new Promise((resolve, reject) => {
        log && log(`>>> ${[cmd, ...args].join(' ')}`);
        const p = spawn(cmd, args, { ...options });
        p.stdout.on('data', d => log && log(d.toString()));
        p.stderr.on('data', d => log && log(d.toString()));
        p.on('close', code => (code ? reject(new Error(`${cmd} -> ${code}`)) : resolve()));
    });
}

async function patch(file, newText, log) {
    await fsp.writeFile(file, newText, 'utf8');
    log && log(`✏️  已更新 ${file}`);
}

// ─────────────────────── ❸ 前端资源打包/复制 ──────────────────
async function copyToApps(resDir, log) {
    const target = path.join(DEST_APPS_DIR, path.basename(resDir));
    if (fs.existsSync(target)) {
        log && log(`⚠️  ${target} 已存在，跳过复制`);
        return;
    }
    log && log(`📂 复制 ${resDir} → ${target}`);
    await fsp.cp(resDir, target, { recursive: true });
    log && log('✅ 复制完成');
}

async function compileUni(log) {
    const RES_DIR = path.join(UNI_SRC, 'unpackage', 'resources'); // ✅ 放到函数里，确保此时 UNI_SRC 已有值

    log && log('📦 HBuilderX 打包 UniApp…',UNI_SRC,RES_DIR);
    await run(CLI_HBX, [
        'publish', '--platform', 'APP',
        '--type', 'appResource',
        '--project', UNI_SRC
    ], {}, log);

    const dirs = (await fsp.readdir(RES_DIR, { withFileTypes: true }))
        .filter(d => d.isDirectory() && d.name.startsWith('__UNI__'))
        .map(d => path.join(RES_DIR, d.name));

    if (dirs.length === 0) throw new Error('❌ 未找到 __UNI__ 资源目录');
    const resDir = dirs[0];

    await copyToApps(resDir, log);
    return path.basename(resDir);
}

// ─────────────────────── ❹ 修改配置文件 ───────────────────────
async function updateDcloudControl(appid, log) {
    const txt = await fsp.readFile(DCLOUD_CONTROL_XML, 'utf8');
    const next = txt.replace(/appid="[^"]+"/, `appid="${appid}"`);
    if (next !== txt) await patch(DCLOUD_CONTROL_XML, next, log);
    else log && log('ℹ️  dcloud_control.xml 无变化');
}

async function updateBuildGradle(appid, log) {
    const keyAlias = appid.toLowerCase();
    const txt = await fsp.readFile(BUILD_GRADLE_PATH, 'utf8');

    const replacements = [
        [ /namespace\s+['"][^'"]+['"]/,             `namespace "${PACKAGE_NAME}"` ],
        [ /applicationId\s+['"][^'"]+['"]/,         `applicationId "${PACKAGE_NAME}"` ],
        [ /keyAlias\s+['"][^'"]+['"]/,              `keyAlias '${keyAlias}'` ],
        [ /keyPassword\s+['"][^'"]+['"]/,           `keyPassword '${KEY_PASSWORD}'` ],
        [ /storeFile\s+file\(['"][^'"]+['"]\)/,     `storeFile file('${STORE_FILE}')` ],
        [ /storePassword\s+['"][^'"]+['"]/,         `storePassword '${STORE_PASSWORD}'` ],
    ];

    let next = txt;
    replacements.forEach(([pat, rep]) => { next = next.replace(pat, rep); });

    if (next !== txt) await patch(BUILD_GRADLE_PATH, next, log);
    else log && log('ℹ️  build.gradle 无变化');
}

async function updateManifest(log) {
    const txt = await fsp.readFile(MANIFEST_XML_PATH, 'utf8');
    const next = txt.replace(
        /android:name="dcloud_appkey"\s*android:value="[^"]+"/,
        `android:name="dcloud_appkey" android:value="${APP_KEY}"`
    );
    if (next !== txt) await patch(MANIFEST_XML_PATH, next, log);
    else log && log('ℹ️  AndroidManifest.xml 无变化');
}

// ─────────────────────── ❺ Gradle 打包/复制 APK ─────────────────
function setupJavaEnv(log) {
    if (!fs.existsSync(JAVA_HOME)) throw new Error(`JDK 路径不存在: ${JAVA_HOME}`);
    process.env.JAVA_HOME = JAVA_HOME;
    process.env.PATH = path.join(JAVA_HOME, 'bin') + path.delimiter + process.env.PATH;
    log && log(`已临时设置 JAVA_HOME → ${JAVA_HOME}`);
}

async function gradleAssembleRelease(log) {
    log && log('🔨 开始 Gradle assembleRelease…');
    const gradlew = os.platform() === 'win32' ? 'gradlew.bat' : './gradlew';
    const gradleCmd = path.join(PROJECT_DIR, gradlew);
    if (!fs.existsSync(gradleCmd)) throw new Error(`❌ 找不到 Gradle Wrapper: ${gradleCmd}`);
    // runSync(gradleCmd, ['assembleRelease', '--stacktrace'], { cwd: PROJECT_DIR }, log);
    await runSyncLive(gradleCmd, ['assembleRelease', '--stacktrace'], { cwd: PROJECT_DIR }, log);
    log && log('✅ Gradle 打包完成');
}

async function copyLatestApk(log) {
    const apkDir = path.join(SIMPLE_DEMO_DIR, 'build', 'outputs', 'apk', 'release');
    const files = (await fsp.readdir(apkDir))
        .filter(f => f.endsWith('.apk'))
        .map(f => path.join(apkDir, f))
        .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);

    if (files.length === 0) throw new Error(`未找到 APK，检查 ${apkDir}`);

    const latest = files[0];
    await fsp.mkdir(APK_OUTPUT_DIR, { recursive: true });
    const stamp = new Date().toISOString().replace(/[-T:]/g, '').slice(0, 15);
    const target = path.join(APK_OUTPUT_DIR, `${path.parse(latest).name}_${stamp}.apk`);
    await fsp.copyFile(latest, target);
    log && log(`📦 APK 已复制到: ${target}`);
}

// ─────────────────────── ❻ 主流程 ─────────────────────────────
async function ensureGradleZipReady() {
    const gradleDistDir = path.resolve('resources/HBuilder-Integrate-AS/.gradle/wrapper/dists/gradle-8.11.1-bin');
    const zipSourcePath = path.resolve('resources/gradle-8.11.1-bin.zip');

    const subdirs = await fsp.readdir(gradleDistDir, { withFileTypes: true });
    const hashDir = subdirs.find(d => d.isDirectory());
    if (!hashDir) throw new Error('找不到 Gradle hash 目录，请先运行一次 gradlew.bat');

    const targetDir = path.join(gradleDistDir, hashDir.name);
    const targetZipPath = path.join(targetDir, 'gradle-8.11.1-bin.zip');

    if (!fs.existsSync(targetZipPath)) {
        console.log(`复制 zip 到: ${targetZipPath}`);
        await fsp.copyFile(zipSourcePath, targetZipPath);
    }

    const partFile = path.join(targetDir, 'gradle-8.11.1-bin.zip.part');
    if (fs.existsSync(partFile)) {
        await fsp.unlink(partFile);
        console.log(`删除残留 .part 文件: ${partFile}`);
    }
}



async function ensureSdkDirSet(log) {
    const sdkPath = path.resolve('resources/AndroidSDK'); // 你预先下载好的 Android SDK 目录
    const localPropertiesPath = path.join(PROJECT_DIR, 'local.properties');

    const content = `sdk.dir=${sdkPath.replace(/\\/g, '\\\\')}`; // 注意 Windows 下要双反斜杠
    await fsp.writeFile(localPropertiesPath, content, 'utf8');
    log && log(`📌 已写入 local.properties: ${content}`);
}


export async function runBuild(sendLog,success) {
    process.env.GRADLE_USER_HOME = path.resolve(process.cwd(), 'resources', 'HBuilder-Integrate-AS', '.gradle');
    const log = typeof sendLog === 'function' ? sendLog : console.log;
    try {
        log('🔍 正在检查 Gradle ZIP 缓存...');
        await ensureGradleZipReady(log);  // ✅ 调用

        log('📍 设置 Android SDK 路径...');
        await ensureSdkDirSet(log); // 👈 添加这句

        console.log(121,CLI_HBX,process.cwd())
        // UNI_SRC = data.UNI_SRC;
        // PACKAGE_NAME = data.PACKAGE_NAME;//包名
        // APP_KEY = data.APP_KEY;//app_key
        // KEY_PASSWORD = data.KEY_PASSWORD;//密码
        // STORE_PASSWORD = data.STORE_PASSWORD;//密码
        // STORE_FILE = data.STORE_FILE;//密钥文件
        // APK_OUTPUT_DIR = data.APK_OUTPUT_DIR;//密钥文件

        const appid = await compileUni(log);
        await updateDcloudControl(appid, log);
        await updateBuildGradle(appid, log);
        await updateManifest(log);
        setupJavaEnv(log);
        await gradleAssembleRelease(log);
        await copyLatestApk(log);
        log('🎉 全流程完成');
        success();
    } catch (err) {
        log(`💥 失败: ${err.message}`);


        // 如果 fallback 也失败了，就抛错
        throw err;
    }
}


runBuild((err)=>{
    console.log(err)
},()=>{})
