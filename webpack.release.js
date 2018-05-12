var fs = require('fs');
var webpack = require("webpack");
var path = require("path");

function loadBabel() {
  var babelrc = fs.readFileSync('./.babelrc');
  var babelrcObject = {};
  
  try {
    babelrcObject = JSON.parse(babelrc);
  } catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
  }
  
  
  var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};
  
  // merge global and dev-only plugins
  var combinedPlugins = babelrcObject.plugins || [];
  combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);
  
  var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
  delete babelLoaderQuery.env;
  
  // Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
  // the babel plugin react-transform-hmr manually here.
  
  // make sure react-transform is enabled
  babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
  var reactTransform = null;
  for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
    var plugin = babelLoaderQuery.plugins[i];
    if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
      reactTransform = plugin;
    }
  }
  
  if (!reactTransform) {
    reactTransform = ['react-transform', {transforms: []}];
    babelLoaderQuery.plugins.push(reactTransform);
  }
  
  if (!reactTransform[1] || !reactTransform[1].transforms) {
    reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
  }
  
  // make sure react-transform-hmr is enabled
  reactTransform[1].transforms.push({
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module']
  });
  return babelLoaderQuery  
}


module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname),
  mode: "production",
  
  target:  "web",
  cache:   false,
  entry:   {
    "index":             "./src/index",
    "bootstrap-theme":   "./src/views/bootstrap/index",
    "default-theme":     "./src/views/default/index",
    "material-ui-theme": "./src/views/material-ui/index"
  },
  output:  {
    path:          path.join(__dirname),
    filename:      "[name].js",
    libraryTarget: "commonjs"
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
          },
      default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
          }
      }
   }
  },
  externals: [
    function(rtx, req, cb) {
      if (/\.\.\/\.\.\//.test(req)) {
        return cb(null, "commonjs redux-auth");
      } else {
        cb();
      }
    }, {
      "react": "commonjs react",
      "classnames": "commonjs classnames",
      "browser-cookies": "commonjs browser-cookies",
      "cookie": "commonjs cookie",
      "extend": "commonjs extend",
      "history": "commonjs history",
      "immutable": "commonjs immutable",
      "isomorphic-fetch": "commonjs isomorphic-fetch",
      "query-string": "commonjs query-string",
      "querystring": "commonjs querystring",
      "react-dom": "commonjs react-dom",
      "react-redux": "commonjs react-redux",
      "redux": "commonjs redux",
      "lodash": "commonjs lodash",
      "redux-immutablejs": "commonjs redux-immutablejs",
      "react-router": "commonjs react-router",
      "react-router-redux": "commonjs react-router-redux",
      "redux-thunk": "commonjs redux-thunk",
      "thunk": "commonjs thunk",
      "rc-dialog": "commonjs rc-dialog",
      "react-loader": "commonjs react-loader",
      "url": "commonjs url",
      "react-bootstrap": "commonjs react-bootstrap",
      "material-ui/Dialog": "commonjs material-ui/Dialog",
      "material-ui/RaisedButton": "commonjs material-ui/RaisedButton",
      "material-ui/FlatButton": "commonjs material-ui/FlatButton",
      "material-ui/TextField": "commonjs material-ui/TextField",
      "material-ui/styles/colors": "commonjs material-ui/styles/colors",
      "material-ui/styles/MuiThemeProvider": "commonjs material-ui/styles/MuiThemeProvider",
      "material-ui/svg-icons/action/exit-to-app": "commonjs material-ui/svg-icons/action/exit-to-app",
      "material-ui/svg-icons/action/favorite": "commonjs material-ui/svg-icons/action/favorite",
      "material-ui/svg-icons/action/delete": "commonjs material-ui/svg-icons/action/delete",
      "material-ui/svg-icons/content/send": "commonjs material-ui/svg-icons/content/send",
      "material-ui/svg-icons/action/lock": "commonjs material-ui/svg-icons/action/lock",
      "material-ui/svg-icons/alert/error": "commonjs material-ui/svg-icons/alert/error"
    }
  ],
  plugins: [
    new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
    new webpack.DefinePlugin({"process.env": {NODE_ENV: "\"production\""}}),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module:  {
    rules: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.jsx?$/, exclude: /node_modules/, 
        loader: ['babel-loader'] }
    ]
  },
  resolve: {
    alias: {
      react: path.join(__dirname, "node_modules/react")
    },
    modules: [
      "src",
      "node_modules",
      "web_modules"
    ],
    extensions: [".json", ".js"]
  },
  node:    {
    __dirname: true,
    fs:        "empty"
  }
};
