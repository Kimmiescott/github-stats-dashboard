document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent form from reloading the page
  
    const username = document.getElementById('username').value;
    const userInfo = document.getElementById('userInfo');
    const reposList = document.getElementById('reposList');
    const loadingIndicator = document.getElementById('loading');
    userInfo.innerHTML = '';  // Clear previous user data
    reposList.innerHTML = '';  // Clear previous repos data
    loadingIndicator.style.display = 'block';

    userInfoContainer.style.display = 'none'; 
    reposContainer.style.display = 'none';
  
    try {
      // Fetch user info and repos from the backend API
      const response = await fetch(`/api/user/${username}`);
      const data = await response.json();
  
      // Display user info
      const user = data.user;
      userInfo.innerHTML = `
        <h2>${user.name} (@${user.login})</h2>
        <img src="${user.avatar_url}" alt="User Avatar" width="100">
        <p><strong>Company:</strong> ${user.company || 'N/A'}</p>
        <p><strong>Location:</strong> ${user.location || 'N/A'}</p>
        <p><strong>Bio:</strong> ${user.bio || 'No bio available'}</p>
        <p><strong>Public Repos:</strong> ${user.public_repos}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
      `;

      userInfoContainer.style.display = 'block';
  
      // Display repos
      const repositories = data.repositories;
      repositories.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <p><strong>Description:</strong> ${repo.description || 'No description'}</p>
          <p><strong>Stars:</strong> ${repo.stargazers_count} | <strong>Forks:</strong> ${repo.forks_count} | <strong>Language:</strong> ${repo.language || 'N/A'}</p>
        `;
        reposList.appendChild(listItem);
      });

      reposContainer.style.display = 'block';
  
    } catch (error) {
      userInfo.innerHTML = '<p>Error fetching user information</p>';
      reposList.innerHTML = '';
    } finally {
      loadingIndicator.style.display = 'none';  
    }
    
  });
  
