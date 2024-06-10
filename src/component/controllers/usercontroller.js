
// controllers/userController.js
import User, { find, findById, findByIdAndUpdate, findByIdAndDelete } from '../models/user';

// Get all users
export async function getAllUsers(req, res) {
  try {
    const users = await find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get user by ID
export async function getUserById(req, res) {
  try {
    const user = await findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Add new user
export async function addUser(req, res) {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update user
export async function updateUser(req, res) {
  try {
    const updatedUser = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete user
export async function deleteUser(req, res) {
  try {
    await findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
