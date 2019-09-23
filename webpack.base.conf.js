const path = require('path'); // Модуль
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Модуль

// https://tocode.ru/curses/nastroika-webpack4

// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

//console.log(__dirname);
//console.log(path.resolve(__dirname, 'path'));

module.exports = {
	entry:{ //
		app: './src/index.js',
		//ser: "./src/server.js" // Может быть несколько точек входа
	},
	output:{ // точки выхода
		filename: '[name].js', //  Квадратные скобки означают, что берется файл с имеем точки входа https://youtu.be/JcKRovPhGo8?t=916
		path: path.resolve(__dirname, './dist'), // папка назначения скомпилированных файлов https://nodejs.org/api/path.html#path_path_relative_from_to
		publicPath: '/dist' // Папка, которая отображается, может отличаться от реальной папки
	},
	module:{ // Подключаемые модули
		rules:[{
			test: /\.js$/,
			loader: "babel-loader",
			//exclude: "/node_modules/" // не включаем те файлы, которые содержет эта папка
			exclude: path.resolve(__dirname, "node_modules"),
			//include: [path.resolve(__dirname, "src")]
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
					options: { sourceMap: true,  config: { path: 'src/js/postcss.config.js' } }
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
					options: { sourceMap: true,  config: { path: 'src/js/postcss.config.js' } }
				},
			]
		}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		})
	]
}
