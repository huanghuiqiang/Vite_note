import { defineConfig, loadEnv } from 'vite'
import viteBaseConfig from './vite.base.config';
import viteDevConfig from './vite.dev.config';
import viteProdConfig from './vite.prod.config';

// 策略模式
const envResolver = {
    "build": () => {
        console.log('===>生产环境');
        return ({...viteBaseConfig, ...viteProdConfig});
    },
    "serve": () => {
        console.log('===>开发环境');
        return Object.assign({}, viteBaseConfig, viteDevConfig); // 新配置里可以回被配置 envDir
    },
}

// export declare function defineConfig(config: UserConfigExport): UserConfigExport; 语法提示
export default defineConfig(({ command, mode, ssrBuild }) => {
    console.log('===>command', command);
    const env = loadEnv(mode, process.cwd(), "");
    console.log('===>env', env);
    return envResolver[command]();
}); 