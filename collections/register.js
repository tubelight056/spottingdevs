const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  if (
    req.body.email == undefined ||
    req.body.name == undefined ||
    req.body.Dob == undefined ||
    req.body.profileImgUrl == undefined
  ) {
    console.log(`[-]  `);
    console.log({
      statusMessage: "all details are required",
      status: false,
    });
    res.send({
      statusMessage: "all details are required",
      status: false,
    });
  } else {
    let education = [];
    if (req.body.education) {
      req.body.education.map((educations) => {
        education.push({
          Name: educations.name,
          EndYear: parseInt(educations.year),
          StartYear: parseInt(educations.year),
        });
      });
    }

    let experience = [];
    if (req.body.experience) {
      req.body.experience.map((experiences) => {
        experience.push({
          CompanyName: experiences.companyName,
          Duration: experiences.duration,
          Position: experiences.position,
          Description: experiences.description,
        });
      });
    }

    const data = {
      Email: req.body.email,
      Name: req.body.name,
      DateOfBirth: req.body.Dob,
      profileImgUrl: req.body.profileImgUrl,
      ...(req.body.portfolio && { Portfolio: req.body.portfolio }),
      ...(req.body.github && { Github: req.body.github }),
      ...(req.body.devto && { Devto: req.body.devto }),
      ...(req.body.medium && { Medium: req.body.medium }),
      Skills: req.body.skills,
      Github: req.body.guthub,
      Education: [...education],
      Experience: [...experience],
      Location: req.body.location,
    };

    const newUser = new User(data);

    await newUser
      .save()
      .then((data) => {
        console.log(`[+]  ${data.Name} registered successfully`);
        console.log(`[+]  `, data);
        const userData = {
          id: data._id,
          Name: data.Name,
          Email: data.Email,
        };
        jwt.sign(
          userData,
          process.env.SEC_KEY,
          { expiresIn: "144000s" },
          async (err, token) => {
            console.log({
              name: data.Name,
              email: data.Email,
              token: token,
              status: true,
            });
            res.send({
              name: data.Name,
              email: data.Email,
              token: token,
              status: true,
            });
          }
        );
      })
      .catch(async (err) => {
        if (err.code === 11000) {
          console.log(`[-]  `, {
            statusMessage: "Email already exsists",
            status: false,
          });
          res.send({
            error: err,
            statusMessage: "Email already exsists",
            status: false,
          });
        } else {
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
        }
      });
  }
};
