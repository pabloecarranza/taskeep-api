import { Task } from "./../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const userid = req.params.id;
    const {
      completed,
      important,
      description,
      reminder,
      expiration_date,
      repeat,
      notes,
      listid,
    } = req.body;

    const newTask = await Task.create({
      completed,
      important,
      description,
      reminder,
      expiration_date,
      repeat,
      notes,
      listid,
      userid,
    });

    res.status(200).json({ message: "Task created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: {
        id,
      },
    });
    if (!task) return res.status(404).json({ message: "Task dont exists" });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    let completedQuery = req.query.completed;
    let importantQuery = req.query.important;
    const task = await Task.findByPk(id);
    if (!task) return res.json({ message: "Task dont exists" });
    if (
      completedQuery !== undefined ||
      (importantQuery !== undefined && completedQuery !== undefined) ||
      importantQuery !== undefined
    ) {
      (task.completed = completedQuery ? completedQuery : task.completed),
        (task.important = importantQuery ? importantQuery : task.important),
        await task.save();
    }

    const {
      completed,
      important,
      description,
      reminder,
      expiration_date,
      repeat,
      listid,
      notes,
    } = req.body;

    (task.completed = completed),
      (task.important = important),
      (task.description = description),
      (task.reminder = reminder),
      (task.expiration_date = expiration_date),
      (task.repeat = repeat),
      (task.listid = listid),
      (task.notes = notes),
      await task.save();
    res.status(200).json({ message: "Task update successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const hotUpdateTask = async (req, res) => {};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.destroy({
      where: {
        id,
      },
    });
    res.json({ message: "Task eliminated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
