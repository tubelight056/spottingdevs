const { Blog } = require("../models/Blogs");
const { Project } = require("../models/Projects");
const { User } = require("../models/User");

exports.GetParticularlyScore = async (req, res) => {
  console.log("[+] getting personel score");
  eachBlogScore = 0;
  blogCount = 0;
  eachProjectScore = 0;
  projectCount = 0;
  if (req.body.id === undefined) {
    console.log(`[-]  `, {
      error: err,
      statusMessage: "something went wrong",
      status: false,
    });
    res.send({
      error: err,
      statusMessage: "something went wrong",
      status: false,
    });
  } else {
    User.findOne(
      { _id: req.body.id },
      "Email Visited",
      async (err, userResult) => {
        if (err) {
          console.log(`[-]  `, {
            error: err,
            statusMessage: "something went wrong",
            status: false,
          });
          res.send({
            error: err,
            statusMessage: "something went wrong",
            status: false,
          });
        } else {
          Project.find(
            { Email: userResult.Email },
            "Stargazers_count",
            async (err, projectResult) => {
              if (err) {
                console.log(`[-]  `, {
                  error: err,
                  statusMessage: "something went wrong",
                  status: false,
                });
                res.send({
                  error: err,
                  statusMessage: "something went wrong",
                  status: false,
                });
              } else {
                projectResult.forEach((element) => {
                  eachProjectScore =
                    eachProjectScore + element.Stargazers_count;
                  projectCount = projectCount + 1;
                });
              }
            }
          );
          Blog.find(
            { Email: userResult.Email },
            "positive_count",
            async (err, blogResult) => {
              if (err) {
                console.log(`[-]  `, {
                  error: err,
                  statusMessage: "something went wrong",
                  status: false,
                });
                res.send({
                  error: err,
                  statusMessage: "something went wrong",
                  status: false,
                });
              } else {
                blogResult.forEach((element) => {
                  eachBlogScore = eachBlogScore + element.positive_count;
                  blogCount = blogCount + 1;
                });
              }
            }
          );
          setTimeout(() => {
            console.log({
              status: true,
              blogscore: eachBlogScore / blogCount,
              blogCount,
              projectscore: eachProjectScore / projectCount,
              projectCount,
              userVisited: userResult.Visited.length,
            });
            res.send({
              status: true,
              blogscore: eachBlogScore / blogCount,
              blogCount,
              projectscore: eachProjectScore / projectCount,
              projectCount,
              userVisited: userResult.Visited.length,
            });
          }, [2000]);
        }
      }
    ).clone();
  }
};
