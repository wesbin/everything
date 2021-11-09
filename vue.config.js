module.exports = {
  devServer: {
    overlay: false,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/_colors.scss";
        `,
      },
    },
  },
};
