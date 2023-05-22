const Customer = require("../models/customer");
const MovieAdmin = require("../models/movieAdmin");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result1 = await Customer.findOne({
      $and: [{ email }, { password }],
    });
    const result2 = await MovieAdmin.findOne({
      $and: [{ email }, { password }],
    });

    if (result1) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            _id: result1._id,
            email: result1.email,
            nic: result1.nic,
            name: result1.name,
            role: result1.role,
          },
        },
        "secret"
      );
      res.send({
        message: "success",
        data: {
          token,
          _id: result1._id,
          email: result1.email,
          nic: result1.nic,
          role: result1.role,
        },
      });
    } else if (result2) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            _id: result2._id,
            email: result2.email,
            role: result2.role,
          },
        },
        "secret"
      );
      res.send({
        message: "success",
        data: {
          token,
          _id: result2._id,
          email: result2.email,
          role: result2.role,
        },
      });
    } else {
      res.status(401).send({ message: "Check email or password" });
    }
  } catch (err) {
    console.log("login requsee eror ", err);
    res.status(500).send({ message: "failed", data: err });
  }
};
