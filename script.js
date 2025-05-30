async function fetchProfile(){
  const userName = document.getElementById('username').value.trim();
  const profileDiv = document.getElementById('profile');
  const reposDiv = document.getElementById('repos');
  const errorDiv = document.getElementById('error');

  profileDiv.innerHTML = '';
  reposDiv.innerHTML = '';
  errorDiv.innerHTML = '';

  if(!userName){
    errorDiv.textContent = 'Please enter a username!';
    return;
  }
   
  try{
    const[userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${userName}`),
      fetch(`https://api.github.com/users/${userName}/repos?per_page=5`)
    ]);
    if(!userResponse.ok) throw new Error('User not found!');
    if(!reposResponse.ok) throw new Error('Error fetching repositories!')

    const user = await userResponse.json();
    const repos = await reposResponse.json();

    profileDiv.innerHTML = `
    <img src="${user.avatar_url}" alt="${user.login}" width="100">
    <h2>${user.name || user.login}</h2>
    <p>${user.bio || 'No bio available!'}</p>
    <p>Followers: ${user.followers} | Following: ${user.following}</p>
    `
    reposDiv.innerHTML = `<h3>Recent Repositories</h3>`
    if(repos.length === 0){
      reposDiv.innerHTML += `<p>No repositories found!</p>`
    }else{
      repos.forEach(repo => {
        reposDiv.innerHTML += `<p>
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        : ${repo.description || 'No description'}
      </p>
    `;
      });
    }
  }catch(error){
    errorDiv.textContent = `Error: ${error.message}`;
  }
}