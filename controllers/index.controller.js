
const getIndexPage = (req,res) => {
    res.render("index", {
    query: ""
  });
};

module.exports = { getIndexPage };