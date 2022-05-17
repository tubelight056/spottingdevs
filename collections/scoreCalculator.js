const { Blog } = require("../models/Blogs");
const { Project } = require("../models/Projects");
const { User } = require("../models/User");

exports.score = (id) => {
  return new Promise((resolve, reject) => {
    eachBlogScore = 0;
    blogCount = 0;
    eachProjectScore = 0;
    projectCount = 0;
    if (id === undefined) {
      console.log(`[-]  `, {
        error: err,
        statusMessage: "something went wrong",
        status: false,
      });
      reject({
        error: err,
        statusMessage: "something went wrong",
        status: false,
      });
    } else {
      User.findOne({ _id: id }, "Email Visited", async (err, userResult) => {
        if (err) {
          console.log(`[-]  `, {
            error: err,
            statusMessage: "something went wrong",
            status: false,
          });
          reject({
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
                reject({
                  error: err,
                  statusMessage: "something went wrong",
                  status: false,
                });
              } else {
                projectResult.forEach((element) => {
                  // console.log(eachProjectScore);
                  eachProjectScore =
                    eachProjectScore + parseInt(element.Stargazers_count);
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
                reject({
                  error: err,
                  statusMessage: "something went wrong",
                  status: false,
                });
              } else {
                blogResult.forEach((element) => {
                  // console.log(eachBlogScore);
                  eachBlogScore =
                    eachBlogScore + parseInt(element.positive_count);
                  blogCount = blogCount + 1;
                });
              }
            }
          );
          setTimeout(() => {
            console.log(id);
            User.updateOne(
              { _id: id },
              {
                Score: {
                  blogscore: eachBlogScore,
                  blogCount: blogCount,
                  projectscore: eachProjectScore,
                  projectCount: projectCount,
                  score:
                    (eachBlogScore + eachProjectScore) /
                    (blogCount + projectCount),
                },
              },
              (err, result) => {
                if (!err) {
                  resolve({
                    score: {
                      blogscore: eachBlogScore,
                      blogCount: blogCount,
                      projectscore: eachProjectScore,
                      projectCount: projectCount,
                      score:
                        (eachBlogScore + eachProjectScore) /
                        (blogCount + projectCount),
                    },
                  });
                }
              }
            );
          }, [2000]);
        }
      }).clone();
    }
  });
};
