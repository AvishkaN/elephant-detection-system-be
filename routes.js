const router = require("express").Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.text({ type: "text/*" }));

router.use(
  "/notify-users",
  require("./src/modules/notify-users/notify-users.router")
);
router.use(
  "/sended-notifications",
  require("./src/modules/sended-notifications/sended-notifications.router")
);
router.use(
  "/data",
  require("./src/modules/data/data.router")
);

module.exports = router;
