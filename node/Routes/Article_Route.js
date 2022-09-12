const router = require("express").Router();
const GetData_Controller = require("../Controllers/GetData_Controller");
const getData_Controller = new GetData_Controller();
const CryptoJS = require('crypto-js')

router.get("/", async (req, res) => {
  try {
    const data = await getData_Controller.GetArticleData();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/", async (req,res) => {
//   try {
//     let Article = {
//       title: "",
//       id: CryptoJS.MD5(title).toString(CryptoJS.enc.Base64),
//       category:"",
//       link:"",
//       thumb:"",
//       desc:""
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })


// router.get("")


module.exports = router;
