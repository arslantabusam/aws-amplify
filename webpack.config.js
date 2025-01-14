import path from 'path';
import { VueLoaderPlugin } from 'vue-loader'; // Import the VueLoaderPlugin

import { fileURLToPath } from 'url';

// Define __dirname in an ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development', // Set mode to 'development' for better debugging
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Assuming you have a 'src' folder
    },
    extensions: ['.js', '.vue', '.json'], // Add .vue to the extensions array
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // Match .vue files
        loader: 'vue-loader', // Use vue-loader to process .vue files
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Add this rule for CSS files
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Use babel-loader for JavaScript files
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // Add VueLoaderPlugin to handle .vue files
  ],

  devServer: {
    contentBase: path.join(__dirname, '.'),  // Point to the root folder
    port: 5173,
  }
};
