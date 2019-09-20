const path = require('path'); // Модуль
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Модуль

//console.log(__dirname);
//console.log(path.resolve(__dirname, 'path'));

module.exports = {
	entry:{ // 
		app: './src/index.js',
		//ser: "./src/server.js" // Может быть несколько точек входа
	},
	output:{ // точки выхода
		filename: '[name].js', //  Квадратные скобки означают, что берется файл с имеем точки входа https://youtu.be/JcKRovPhGo8?t=916
		path: path.resolve(__dirname, './path'), // папка назначения скомпилированных файлов https://nodejs.org/api/path.html#path_path_relative_from_to
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
	devServer:{
		overlay:true // Чтобы выводить ошибки компил¤ции в браузер
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
}