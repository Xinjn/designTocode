// module.exports = {
//   plugins: [require("autoprefixer")],
// };
module.exports = () => {
  return {
    plugins: {
      "postcss-cssnext": {
        browsers: [
          "Android >= 4.4",
          "Chrome >= 35",
          "iOS >= 8",
          "Safari >= 7.1",
        ],
      },
    },
  };
};
