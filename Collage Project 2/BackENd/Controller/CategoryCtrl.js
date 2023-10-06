const { json } = require("express");
const Category = require("../model/Category");
// const validateMongoDbId = require("../Utils/ValidateMongoDbid")

const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
    res.status(200).json("created sucessfully");
  } catch (error) {
    console.log(error);
  }
};
const updateCategory = async (req, res) => {
  const CategoryId = req.body.CategoryId;
  const updates = req.body.updates;

  try {
    res
      .status(200)
      .json(
        await Category.findByIdAndUpdate(CategoryId, updates, { new: true })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There is an issues" });
  }
};
const deleteCategory = async (req, res) => {
  const CategoryId = req.body.CategoryId;

  try {
    res.status(200).json({ message: "deleted sucesfully" });
    res
      .status(200)
      .json(await Category.findByIdAndDelete(CategoryId, { new: true }));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There is an issues" });
  }
};
const getCategory = async (req, res) => {
  try {
    const CategoryId = req.params.CategoryId;
    if (!CategoryId) {
      return res.status(400).json({ message: "Category Id should be define" });
    }

    const getCategory = await Category.findById(CategoryId);
    if (!Category) {
      return res.status(400).json({ message: "Category not found!" });
    }
    return res.json(getCategory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getallCategories = async (req, res) => {
  try {
    const allCategory = await Category.find();
    res.json(allCategory);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategories,
};
