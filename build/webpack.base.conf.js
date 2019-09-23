const path = require('path'); // Модуль
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Модуль
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
// https://tocode.ru/curses/nastroika-webpack4

// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../public'),
  assets: 'assets/'
}

//console.log(__dirname);
//console.log(path.resolve(__dirname, 'path'));
console.log(path.resolve(__dirname, "src/css"));
module.exports = {
	externals:{
		paths: PATHS
	},
	entry:{
		app: PATHS.src,
    //lk: `${PATHS.src}/lk.js`,  // Может быть несколько точек входа
		//ser: "./src/server.js"
	},
	output:{ // точки выхода
		filename: `${PATHS.assets}js/[name].js?v=[hash]`,
		//filename: '[name].js', //  Квадратные скобки означают, что берется файл с имеем точки входа https://youtu.be/JcKRovPhGo8?t=916
		path: PATHS.dist, // папка назначения скомпилированных файлов https://nodejs.org/api/path.html#path_path_relative_from_to
		publicPath: '/' // Папка, которая отображается, может отличаться от реальной папки
	},
  optimization:{ // Разбиваем на отдельные файлы
    splitChunks:{
      cacheGroups:{
        vendor:{
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        }
      }
    }
  },
	module:{ // Подключаемые модули
		rules:[{
			test: /\.js$/,
			loader: "babel-loader",
			exclude: "/node_modules/", // не включаем те файлы, которые содержет эта папка
			//exclude: path.resolve(__dirname, "node_modules"),
			//include: [ /src\/js/ /*path.resolve(__dirname, "src/js")*/]
		},{
			test: /\.vue$/,
			loader: "vue-loader",
      options:{
        loader:{
          scss: 'vue-style-loader!css-loader!sass-loader' // то, затем се, затем сё
        }
      }
		},{
			test: /\.(png|jpg|jpeg|gif|svg)$/,
			loader: "file-loader",
			options:{
				name: '[name].[ext]'
			}
		},
		{
			test: /\.scss$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: "css-loader",
					options: { sourceMap: true }
				},
				{
					loader: "postcss-loader",
					options: { sourceMap: true,  config: { path: `${PATHS.src}/js/postcss.config.js` } }
				},
				{
					loader: "sass-loader",
					options: { sourceMap: true }
				},
			]
		},
		{
			test: /\.css$/,
			use: [
				"style-loader",
				MiniCssExtractPlugin.loader,
				{
					loader: "css-loader",
					options: { sourceMap: true }
				},
				{
					loader: "postcss-loader",
					options: { sourceMap: true,  config: { path: `${PATHS.src}/js/postcss.config.js` } }
				},
			]
		}]
	},
  resolve:{
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
	plugins: [
    new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].[hash].css`,
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`,
			filename: './index.html',
      title: 'Webpack template O',
      inject: false,
		}),
		new CopyWebpackPlugin([
			{ from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
			{ from: `${PATHS.src}/static`, to: '' }
		])
	]
}
