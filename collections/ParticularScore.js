const { score } = require("./scoreCalculator");

exports.GetParticularlyScore = async (req, res) => {
  console.log("[+] getting personel score");
  score(req.body.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
};
