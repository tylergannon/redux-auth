require("babel-polyfill");

require("babel-register")({
  only: /(src|test)/,
  ignore: /node_modules/,
  presets: ["react", ["env", {}]]
});
