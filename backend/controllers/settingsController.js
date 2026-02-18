const Settings = require("../models/Settings");

// Get current settings
const getSettings = async (req, res) => {
  const settings = await Settings.findOne().sort({ createdAt: -1 });
  res.json(settings);
};

// Update settings (Admin only)
const updateSettings = async (req, res) => {
  const { deliveryDays, defaultStatus } = req.body;

  let settings = await Settings.findOne();
  if (!settings) {
    settings = new Settings({ deliveryDays, defaultStatus, updatedBy: req.user.id });
  } else {
    settings.deliveryDays = deliveryDays || settings.deliveryDays;
    settings.defaultStatus = defaultStatus || settings.defaultStatus;
    settings.updatedBy = req.user.id;
  }

  await settings.save();
  res.json({ message: "Settings updated", settings });
};

module.exports = { getSettings, updateSettings };
