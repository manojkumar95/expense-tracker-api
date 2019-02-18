module.exports = function(app) {

  app.get('/', (req, res) => {
      res.send("Express js started!");
  });
}