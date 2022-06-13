const { Project } = require("../../models/Projects");

exports.getProjectsByFilter = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  await Project.find(
    { name: { $regex: `${req.body.search}` } },
    async (error, result) => {
      if (error) {
        console.log({
          error,
          status: false,
        });
        res.send({
          error,
          status: false,
        });
      } else {
        if (req.body.search != undefined) {
          result = result.filter((s) => s.Name.includes(req.body.search));
        }
        console.log({
          data: result,
          status: true,
        });
        res.send({
          data: result,
          status: true,
        });
      }
    }
  )
    .limit(10)
    .clone();
};
