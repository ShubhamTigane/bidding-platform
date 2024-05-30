const { Item, Bid } = require("../models");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  },
});

const upload = multer({ storage });

const getAllItems = async (req, res) => {
  const { page = 1, limit = 10, search, status } = req.query;
  const offset = (page - 1) * limit;

  try {
    const whereClause = {};

    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` };
    }

    if (status) {
      const now = new Date();
      if (status === "active") {
        whereClause.end_time = { [Op.gt]: now };
      } else if (status === "ended") {
        whereClause.end_time = { [Op.lt]: now };
      }
    }

    const items = await Item.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });

    res.json({ items: items.rows, totalPages: Math.ceil(items.count / limit) });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ error: "Item not found." });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

const createItem = [
  upload.single("image"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, description, starting_price, end_time } = req.body;
    console.log("Creating item with data:", req.body);
    console.log("Uploaded file:", req.file);

    try {
      const image_url = req.file ? req.file.path : null; // Save image URL as a string

      const newItem = await Item.create({
        name,
        description,
        starting_price,
        current_price: starting_price,
        image_url,
        end_time,
        owner_id: req.user.id, // Ensure owner_id is set to the current user
      });

      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Server error." });
      console.error(error);
    }
  },
];

const updateItem = [
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { name, description, starting_price, end_time, image_url } = req.body;
    console.log("Updating item with data:", req.body);
    console.log("Uploaded file:", req.file);

    try {
      const item = await Item.findByPk(id);
      if (!item) return res.status(404).json({ error: "Item not found." });

      if (item.owner_id !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ error: "Forbidden." });
      }

      const updateData = {
        name,
        description,
        starting_price,
        end_time,
        image_url: req.file ? req.file.path : image_url, // Use uploaded file path or existing URL
      };

      await item.update(updateData);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Server error." });
      console.error(error);
    }
  },
];

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ error: "Item not found." });

    if (item.owner_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden." });
    }

    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Server error." });
    console.error(error);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
