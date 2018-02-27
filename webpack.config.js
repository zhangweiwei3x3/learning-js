var webpack = require('webpack');
var glob = require('glob');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 目录
var path = require('path');
var packPath = path.join(__dirname, './dist');
// clean
var CleanWebpackPlugin = require('clean-webpack-plugin');

var webpackConfig = {
    entry: {},
    output: {
        path: packPath,
        filename: '[name].js',
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
            name = split[split.length - 2];
    
        entries[name] = [
            path.resolve(__dirname, `./src/${name}/index.js`),
            path.resolve(__dirname, `./src/${name}/ex.js`)
        ];
    });

    return entries;
}
        
var entries = getEntries('src/**/index.js');
Object.keys(entries).forEach((name) => {
    var option = {
        // 生成出来的html文件名
        filename: name + '.html',
        template: `./src/${name}/index.html`,
        inject: true
    };
    
    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin(option);

    webpackConfig.plugins.push(plugin);
    webpackConfig.entry[name] = entries[name];
});

module.exports = webpackConfig;
