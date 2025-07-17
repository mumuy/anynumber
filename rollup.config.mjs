import resolve from '@rollup/plugin-node-resolve';          // 使用node_modules包
import terser from '@rollup/plugin-terser';                 // 代码压缩
import babel from '@rollup/plugin-babel';                   // ECMAScript兼容
import {importAssertionsPlugin} from 'rollup-plugin-import-assert';
import {importAssertions} from 'acorn-import-assertions';
import pkg from './package.json' assert { type:'json' };     // 获取package信息

// 版权信息
const repository = pkg.repository.url.replace(/(.+)(:\/\/.+)\.git$/,'https$2');
const now = new Date();
const date = (new Date(now.getTime()-now.getTimezoneOffset()*60000)).toISOString().substring(0,10);
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright (c) 2024-present, ${pkg.author}
 *
 * Released under the ${pkg.license} License
 * ${repository}
 *
 * Created on: ${date}
 */`;

const commonPlugins = [
    resolve(),
    importAssertionsPlugin(),
    terser(),
    babel({
        babelHelpers: 'runtime',
        exclude:'node_modules/**'
    })
];

 export default [{
    input: './src/anynumber.js',
    output:[{
        file: pkg.main,
        format: 'umd',
        name: 'AnyNumber',
        banner
    },{
        file: pkg.module,
        format: 'es',
        banner
    }],
    acornInjectPlugins: [ importAssertions ],
    plugins: commonPlugins,
    watch: {
        exclude: 'node_modules/**'
    }
}];
