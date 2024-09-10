// const mongoose = require('mongoose');

// // Define the User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   name: String,
//   publicRepos: Number,
//   followers: Number,
//   following: Number,
// });

// // Define the Repository Schema
// const repoSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   repoName: String,
//   stars: Number,
//   forks: Number,
//   openIssues: Number,
// });

// // Create Mongoose Models
// const User = mongoose.model('User', userSchema);
// const Repo = mongoose.model('Repo', repoSchema);

// module.exports = { User, Repo };
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
