require('dotenv').config(); 

const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 9000;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/user/:username', async (req, res) => {
  const username = req.params.username;

  try {
    
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,  
      }
    });

    
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,  
      }
    });

    
    const userData = {
      user: userResponse.data,
      repositories: reposResponse.data,
    };

    
    res.json(userData);
  } catch (error) {
   
    res.status(error.response ? error.response.status : 500).json({
      message: error.response ? error.response.data.message : "Error fetching data",
    });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
