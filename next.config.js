module.exports = {
  experimental: {
    jsconfigPaths: true,
  },
  excludeFile: str => /\*.{spec,test}.tsx/.test(str),
};
