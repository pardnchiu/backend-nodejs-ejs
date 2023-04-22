module.exports = (req: any, res: any) => {
  res.render("index", {
    head: {
      noindex     : false,
      title       : "Nodejs + Pug",
      description : "",
      cover       : "",
      path        : "",
      icon        : "",
      param       : req.params,
      query       : req.query
    },
    json: {
    }
  });
}