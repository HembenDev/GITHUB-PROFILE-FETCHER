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
    const repo = await reposResponse.json();

    profileDiv.innerHTML = `
    <img src="${user.avatar_url}" alt="${user.login}" width="100">
    `
  }
}