//api through data ko fetch karna hoga
const url = "https://api.github.com/users";

const searchInputEl = document.getElementById("searchInput");
const searchbuttonRl = document.getElementById("search-btn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
  return `
  <div class="profile-box">
    <div class="top-section">
      <div class="left">
        <div class="avatar">
          <img src="${profile.avatar_url}"/>
        </div>
        <div class="self">
          <h1>${profile.name}</h1>
          <h1>>@${profile.login}</h1>
        </div>
      </div>
      <a href="${profile.html_url}" target="_black">     
       <button class="primary-btn">Check Profile</button>
      </a>
    </div>
    <div class="about">
      <h2>About</h2>
      <p> ${profile.bio} </p>
    </div>
    <div class="status">
      <div class="status-item">
        <h3>Followers</h3>
        <p>${profile.followers}</p>
      </div>
      <div class="status-item">
        <h3>Followings</h3>
        <p>${profile.following}</p>
      </div>
      <div class="status-item">
        <h3>Repos</h3>
        <p>${profile.public_repos}</p>
      </div>
    </div>
  </div> `;
};
// creating the fetch profile function
// we are doing network fetch used async()
const fetchProfile = async () => {
  //error handling
  const username = searchInputEl.value;

  loadingEl.innerText = "loading.......";
  loading.style.color = "black";

  try {
    //we get fetch api
    const res = await fetch(`${url}/${username}`);
    //conver the fetch into data
    const data = await res.json();

    if (data.login) {
      loadingEl.innerText = "";
      profileContainerEl.innerHTML = generateProfile(data);
    } else {
      loadingEl.innerHTML = data.message;
      loadingEl.style.color = "red";
      profileContainerEl.innerText = "";
    }

    //data ko lock
  } catch (error) {
    console.log({ error });
    loadingEl.innerText = "";
  }
};

searchbuttonRl.addEventListener("click", fetchProfile);
