const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../Controllers/messagecontrollers");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;