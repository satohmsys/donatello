/*******************

weback config
for static website
-webpack
@link: http://dackdive.hateblo.jp/entry/2016/05/07/183335
@link: http://dackdive.hateblo.jp/entry/2016/04/13/123000
@link: https://qiita.com/one-kelvin/items/b810aafb6b5ef90789a3
-sass
@link: http://kinosuke.hatenablog.jp/entry/2017/08/02/100051

*******************/
const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
// const extractTextPlugin = new ExtractTextPlugin( 'css/[name].css');

var paths = {
	assets: 'assets',
	context: './_dev' ,
	output: {
		path : './_public/assets'
	},
	contentBase: './_public'
};

module.exports = [{
	/**
	* buildのディレクトリ
	*/
	context: path.join( __dirname , paths.context ),

	/**
	* buildの起点となるファイル
	* 複数指定する場合、Object だと出力ファイルも複数
	*/
	entry: {
		bundle: './js/index.js'
	},

	/**
	* 出力先
	* OSによってdirnameのパスが異なるのでpath.joinで解決する
	* publicPath webpack-dev-server起動時にこの相対パスから配信
	*/
	output:{
		path: path.join( __dirname , paths.output.path + '/js/' ),
		publicPath: '/assets/',
		filename: '[name].js'
	},

	/**
	* devServer設定
	*/
	devServer: {
		contentBase: path.join( __dirname , paths.contentBase),
		inline: true,
		hot: true,
		port: 3000
	},

	devtool: 'source-map',

	/**
	*ファイル変換
	*loaderは右から左に適用
	*/
	module: {
		loaders: [
			{
				test: /.html/,
				loader: 'html-loader'
			},
			{
				test: /\.js$/,
				exclude: '/node_modules',
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015' ]				
				}
			},
			{
				test: /\.scss$/,
				exclude: '/node_modules',
				loader: ExtractTextPlugin.extract( {
					fallback:'style-loader',
					use: 'css-loader!sass-loader'
				})
				// loader: ExtractTextPlugin.extract( 'style-loader','css-loader')
			},
			{
				test: /\.css$/,
				exclude: '/node_modules',				
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
				// loader: ExtractTextPlugin.extract('style-loader','css-loader?-url&minimize&sourceMap!sass-loader?outputStyle=expanded')
			},
			{
				test: /\.(gif|png|jpg|eot|woff|wof|ttf|svg|css)$/,
				exclude: '/node_modules',				
				loader: 'url-loader'
			}
		]
	},

	/**
	* hot reload
	*/
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin( '/css/[name].css')
		//new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ],

    /**
    * resolve
    * ビルドに含めたいファイルの拡張子
    * foo.js を require('foo') というように
    * 拡張子なしで読み込みたい場合は '.js' を指定する必要があり、
    * 逆にデフォルト値以外の拡張子のファイルを
    * require('myfile.ext') というように
    * 拡張子つきで読み込みたい場合、'' （空文字列）を指定する必要がある
    */
    resolve: {
    	extensions: ['.scss', '.js']
    }
},
{
	/**
	* buildのディレクトリ
	*/
	context: path.join( __dirname , paths.context ),

	/**
	* buildの起点となるファイル
	* 複数指定する場合、Object だと出力ファイルも複数
	*/
	entry: {
		index: './index.html'
	},

	/**
	* 出力先
	* OSによってdirnameのパスが異なるのでpath.joinで解決する
	* publicPath webpack-dev-server起動時にこの相対パスから配信
	*/
	output:{
		path: path.join( __dirname , paths.contentBase  ),
		publicPath: './',
		filename: '[name].html'
	},

	/**
	* devServer設定
	*/
	// devServer: {
	// 	contentBase: path.join( __dirname , paths.contentBase),
	// 	inline: true,
	// 	hot: true,
	// 	port: 3000
	// },

	devtool: 'source-map',

	/**
	*ファイル変換
	*loaderは右から左に適用
	*/
	module: {
		loaders: [
			{
				test: /.html/,
				loader: 'html-loader'
			},
			{
				test: /\.js$/,
				exclude: '/node_modules',
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015' ]				
				}
			},
			{
				test: /\.(gif|png|jpg|eot|woff|wof|ttf|svg|css)$/,
				exclude: '/node_modules',				
				loader: 'url-loader'
			}
		]
	}
},

]