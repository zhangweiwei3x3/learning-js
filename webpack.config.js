var webpack = require('webpack');
var glob = require('glob');
var path = require('path');
// 目录
var path = require('path');
var packPath = path.join(__dirname, './dist');
// clean
var CleanWebpackPlugin = require('clean-webpack-plugin');

var webpackConfig = {
    entry: {},
    output: {
        path: packPath,
        filename: '[name]',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['eslint-loader']
        }]
    },
    plugins: [
        // 清空
        new CleanWebpackPlugin(packPath, {
            root: __dirname,
            verbose: true, 
            dry: false
        })
    ]
};

// 获取指定路径下的入口文件
function getEntries(globPath) {
    var files = glob.sync(globPath),
        entries = {};

    files.forEach((filepath) => {
        var split = filepath.split('/'),
            name = '';


        for (let i = 1; i < split.length; i++) {
            name += split[i] + '/'
        }
        name = name.slice(0, -1);
    
        entries[name] = path.resolve(__dirname, `./src/${name}`);
    });

    return entries;
}
        
var entries = getEntries('src/**/*.js');
Object.keys(entries).forEach((name) => {
    webpackConfig.entry[name] = entries[name];
})

module.exports = webpackConfig;