// Load environment variables from the .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');  // Framework for creating server
const axios = require('axios');  // For making HTTP requests
const path = require('path');  // Utility for handling file paths
const app = express();  // Create an Express app
const port = process.env.PORT || 9000;  // Set the port from environment variables or default to 9000

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define an API route to fetch user data by GitHub username
app.get('/api/user/:username', async (req, res) => {
  const username = req.params.username;  // Get the username from the request parameters

  try {
    // Make a request to the GitHub API to get user information
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,  // Authenticate using a GitHub token from the environment variables
      }
    });

    // Make a second request to the GitHub API to get the user's repositories
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,  // Authenticate again for repositories
      }
    });

    // Combine the user data and repository data into a single object
    const userData = {
      user: userResponse.data,  // User profile information
      repositories: reposResponse.data,  // User repositories
    };

    // Send the combined data as a JSON response
    res.json(userData);
  } catch (error) {
    // Handle errors from the GitHub API requests
    res.status(error.response ? error.response.status : 500).json({
      message: error.response ? error.response.data.message : "Error fetching data",  // Send the error message
    });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);  // Log that the server is running
});

