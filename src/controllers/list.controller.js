import { List } from "./../models/List.js";
import { Task } from "./../models/Task.js";

export const createList = async (req, res) => {
  try {
    const { name } = req.body;
    const parsedList = name.trim().replace(/ /g, "").toLowerCase();

    const listFound = await List.findOne({
      where: {
        name: parsedList,
      },
    });
    if (listFound)
      return res
        .status(401)
        .json({ message: "List already exists, please choose another name" });

    const newList = await List.create({
      name,
    });

    res.json({ message: "List created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getLists = async (req, res) => {
  try {
    const lists = await List.findAll();
    res.json(lists);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findOne({
      where: {
        id,
      },
    });
    if (!list) return res.status(404).json({ message: "List dont exists" });
    res.json(list);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const list = await List.findByPk(id);
    list.name = name;
    await list.save();
    res.status(200).json({ message: "List update successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteList = async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await Task.findAll({
      where: {
        listid: id,
      },
    });

    for (const task of tasks) {
      await Task.destroy({
        where: {
          id: task.id,
        },
      });
    }

    await List.destroy({
      where: {
        id,
      },
    });
    res.json({ message: "List eliminated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getListTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskOfList = await Task.findAll({
      where: {
        listid: id,
      },
    });

    res.json(taskOfList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
