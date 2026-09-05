module.exports = {
  floatPrecision: 0,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          convertPathData: { floatPrecision: 0 }
        }
      }
    }
  ]
};
