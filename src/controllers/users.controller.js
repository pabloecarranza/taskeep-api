import { Task } from "./../models/Task.js";
import { User } from "./../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) return res.status(404).json({ message: "User dont exists" });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      email,
      collaborative_account,
      request_send,
      request_received,
      collaborators,
    } = req.body;

    const user = await User.findByPk(id);
    (user.username = username),
      (user.collaborative_account = collaborative_account),
      (user.email = email),
      (user.request_received = request_received),
      (user.request_send = request_send),
      (user.collaborators = collaborators);
    await user.save();
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getTasksUser = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.findAll({
      where: { userid: id },
    });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
