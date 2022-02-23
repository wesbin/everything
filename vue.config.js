module.exports = {
  devServer: {
    overlay: false,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/_colors.scss";
          @import "@/assets/css/_field.scss";
          @import "@/assets/css/_common.scss";
        `,
      },
    },
  },
  lintOnSave: false,
  configureWebpack: {
    // devtool: 'inline-source-map',
    devtool: 'cheap-source-map',
    // devtool: 'inline-cheap-source-map'
  },
  // parallel: false,
};
