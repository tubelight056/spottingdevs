const axios = require("axios");
const { Project } = require("../models/Projects");
exports.updateALLProjects = async () => {
  console.log("[+] update all is working:)");
  await Project.find({})
    .populate("userId")
    .exec(async (err, result) => {
      result.forEach((element) => {
        axios
          .get(`https://api.github.com/repositories/${element.Github_id}`)
          .then((response) => {
            if (response.data !== {}) {
              Project.updateOne(
                { Github_id: element.Github_id },
                {
                  $set: {
                    Github_id: response.data.id,
                    Name: response.data.name,
                    Full_name: response.data.full_name,
                    Description: response.data.description,
                    Stargazers_count: response.data.stargazers_count,
                    Visibility: response.data.visibility,
                    Url: response.data.url,
                    Language: response.data.language,
                    HostedLink: response.data.hostedlink,
                  },
                },
                async (err, result) => {
                  if (!err) {
                    console.log(`[+]  `, {
                      statusMessage: "registered successfully",
                      status: true,
                    });
                  } else {
                    console.log(`[-]  `, {
                      error: err,
                      statusMessage: "something went wrong",
                      status: false,
                    });
                  }
                }
              ).clone();
            } else if (response.data === {}) {
              Project.deleteOne(
                { blogId: element.blogId },
                async (err, result) => {
                  if (err) {
                    console.log(`[+]  `, {
                      statusMessage: "registered successfully",
                      status: true,
                    });
                  } else {
                    console.log(`[-]  `, {
                      error: err,
                      statusMessage: "something went wrong",
                      status: false,
                    });
                  }
                }
              ).clone();
            } else {
              console.log(`[-]  `, {
                statusMessage: "something went wrong",
                status: false,
              });
            }
          });
      });
    });
};
