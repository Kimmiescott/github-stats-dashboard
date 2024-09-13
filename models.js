// models.js
const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  id: Number,
  avatar_url: String,
  url: String,
  html_url: String,
  followers_url: String,
  repos_url: String,
  name: String,
  company: String,
  location: String,
  bio: String,
  public_repos: Number,
  followers: Number,
  following: Number,
  created_at: Date,
  updated_at: Date,
  hireable: Boolean,
  twitter_username: String,
});

// Create User Model
const User = mongoose.model('User', userSchema);

module.exports = { User };
