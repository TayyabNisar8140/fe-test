module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/list-tasks",
        permanent: true,
      },
    ];
  },
};
