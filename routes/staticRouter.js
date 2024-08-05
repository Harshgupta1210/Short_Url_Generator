const express = require("express");
const URL = require("../Models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/", restrictTo(['NORMAL']), async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allurls });
});

router.get("/signup", (req, res) => res.render("signup"));
router.get("/login", (req, res) => res.render("login"));

module.exports = router;
