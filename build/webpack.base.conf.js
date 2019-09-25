const path = require('path'); // Модуль
const fs = require('fs'); // Модуль
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Модуль
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	VueLoaderPlugin
} = require('vue-loader');
// https://tocode.ru/curses/nastroika-webpack4

// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../public'),
	assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		app: PATHS.src,
		//lk: `${PATHS.src}/lk.js`,  // Может быть несколько точек входа
		//ser: "./src/server.js"
	},
	output: { // точки выхода
		filename: `${PATHS.assets}js/[name].js?v=[hash]`,
		//filename: '[name].js', //  Квадратные скобки означают, что берется файл с имеем точки входа https://youtu.be/JcKRovPhGo8?t=916
		path: PATHS.dist, // папка назначения скомпилированных файлов https://nodejs.org/api/path.html#path_path_relative_from_to
		publicPath: '/' // Папка, которая отображается, может отличаться от реальной папки
	},
	optimization: { // Разбиваем на отдельные файлы
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					name: 'vendors',
					chunks: 'all',
					enforce: true,
				}
			}
		}
	},
	module: { // Подключаемые модули
		rules: [{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: "/node_modules/", // не включаем те файлы, которые содержет эта папка
				//exclude: path.resolve(__dirname, "node_modules"),
				//include: [ /src\/js/ /*path.resolve(__dirname, "src/js")*/]
			}, {
				test: /\.pug$/,
				loader: "pug-loader",
				//exclude: path.resolve(__dirname, "node_modules"),
				//include: [ /src\/js/ /*path.resolve(__dirname, "src/js")*/]
			}, {
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					loader: {
						scss: 'vue-style-loader!css-loader!sass-loader' // то, затем се, затем сё
					}
				}
			}, {
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				loader: "file-loader",
				options: {
					name: '[name].[ext]'
				}
			}, {
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader",
				options: {
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
						options: {
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: {
								path: `./js/postcss.config.js`
							}
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
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
						options: {
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: {
								path: `./js/postcss.config.js`
							}
						}
					},
				]
			}
		]
	},
	resolve: {
		alias: {
			'~': 'src',
			'vue$': 'vue/dist/vue.js'
		}
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].css?h=[hash]`,
		}),
		//		new HtmlWebpackPlugin({
		//			template: `${PATHS.src}/index.html`,
		//			filename: './index.html',
		//		title: 'Webpack template O',
		//		inject: false,
		//		}),
		// Automatic creation any html pages (Don't forget to RERUN dev server)
		// see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
		// best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
		...PAGES.map(page => new HtmlWebpackPlugin({
			inject: true,
			template: `${PAGES_DIR}/${page}`, // .pug
			//filename: `./${page}`, //.html
			filename: `./${page.replace(/\.pug/, '.html')}`, //.pug to .html
		})),
		new CopyWebpackPlugin([{
				from: `${PATHS.src}/${PATHS.assets}img`,
				to: `${PATHS.assets}img`
			},
			{
				from: `${PATHS.src}/${PATHS.assets}fonts`,
				to: `${PATHS.assets}fonts`
			},
			{
				from: `${PATHS.src}/static`,
				to: ''
			}
		]),
	],


}