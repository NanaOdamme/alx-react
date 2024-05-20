# Webpack Setup Guide

This guide will help you set up Webpack for a basic project, including configuring entry points, output, loaders, plugins, code splitting, and setting up a development server.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Basic Setup](#basic-setup)
   - [Entry Points](#entry-points)
   - [Output](#output)
4. [Loaders](#loaders)
5. [Plugins](#plugins)
6. [Code Splitting](#code-splitting)
7. [Setting Up a Development Server](#setting-up-a-development-server)

## Introduction

Webpack is a powerful module bundler for JavaScript applications. It processes your application, transforming and bundling your code, assets, and resources into a format that can be served in the browser.

## Installation

To get started with Webpack, you need to have Node.js and npm (Node Package Manager) installed on your machine. If you haven't installed them, you can download them from [nodejs.org](https://nodejs.org/).

Once you have Node.js and npm, you can install Webpack and Webpack CLI globally using npm:

```bash
npm install -g webpack webpack-cli
```

Alternatively, you can install them locally in your project:

```bash
npm install --save-dev webpack webpack-cli
```

## Basic Setup

### Entry Points

The entry point is the file where Webpack starts bundling your application. By default, the entry point is `src/index.js`, but you can specify a different entry point in your `webpack.config.js` file.

Create a basic project structure:

```
my-webpack-project/
├── dist/
├── src/
│   └── index.js
├── package.json
└── webpack.config.js
```

In `src/index.js`, add some basic JavaScript code:

```javascript
console.log('Hello, Webpack!');
```

In your `webpack.config.js`, configure the entry point:

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

### Output

The `output` property specifies where to emit the bundled files and how to name them. In the above configuration, Webpack will output the bundled file as `dist/bundle.js`.

## Loaders

Loaders allow Webpack to process different types of files beyond JavaScript. They are used to transform files into modules as they are added to your dependency graph.

For example, to use Babel to transpile ES6 JavaScript to ES5, install the necessary packages:

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

Then, configure the loader in `webpack.config.js`:

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

You can also use loaders to handle CSS, images, and other assets. For example, to handle CSS files:

```bash
npm install --save-dev css-loader style-loader
```

Then, update `webpack.config.js`:

```javascript
module.exports = {
  // ...other configurations
  module: {
    rules: [
      // JavaScript loader
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // CSS loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

## Plugins

Plugins are used to perform more complex tasks, such as optimizing bundles, managing assets, and injecting environment variables.

To add plugins, first install them using npm, then configure them in your `webpack.config.js`.

For example, to use the `HtmlWebpackPlugin` to generate an HTML file:

```bash
npm install --save-dev html-webpack-plugin
```

Update `webpack.config.js` to include the plugin:

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // loaders configuration
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```

In `src/index.html`, add a basic HTML template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack Project</title>
</head>
<body>
  <script src="bundle.js"></script>
</body>
</html>
```

## Code Splitting

Code splitting is a technique to split your code into smaller bundles that can be loaded on demand. This can improve the performance of your application.

To enable code splitting, you can use dynamic imports. For example:

In `src/index.js`:

```javascript
document.getElementById('loadButton').addEventListener('click', () => {
  import(/* webpackChunkName: "lazy" */ './lazy').then(module => {
    const lazy = module.default;
    lazy();
  });
});
```

Create a new file `src/lazy.js`:

```javascript
export default function lazy() {
  console.log('This is a lazy-loaded module!');
}
```

Update `webpack.config.js` to enable code splitting:

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
```

This configuration will create separate bundles for the dynamically imported modules.

## Setting Up a Development Server

Webpack Dev Server provides a simple web server and live reloading for development.

Install the development server:

```bash
npm install --save-dev webpack-dev-server
```

Update `webpack.config.js` to configure the dev server:

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true
  },
  module: {
    rules: [
      // loaders configuration
    ]
  },
  plugins: [
    // plugins configuration
  ]
};
```

Add a start script to `package.json`:

```json
"scripts": {
  "start": "webpack serve --open"
}
```

Run the development server:

```bash
npm start
```

This will start the Webpack Dev Server on `http://localhost:9000` and open your browser.

## Conclusion

You've now set up a basic Webpack configuration for a project, including entry points, output, loaders, plugins, code splitting, and a development server. This setup can be further extended and customized based on the specific needs of your application. For more detailed information, refer to the [official Webpack documentation](https://webpack.js.org/).