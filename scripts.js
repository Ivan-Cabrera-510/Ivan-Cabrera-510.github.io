//Prevents errors if JS runs before HTML is loaded.
document.addEventListener("DOMContentLoaded", () => {});
//Slide show for header
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 4000); // Change image every 4 seconds
}
//Smooth Animation when scrolling
function reveal() {
  document.querySelectorAll(".reveal").forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) el.classList.add("active");
  });
}
window.addEventListener("scroll", reveal);
reveal();

//GitHub API Integration
async function loadRepos() {
  const username = "Ivan-Cabrera-510";
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

  try {
    const response = await fetch(apiUrl);
    const repos = await response.json();

    const repoList = document.getElementById("repo-list");
    repoList.innerHTML = "";

    repos.forEach((repo) => {
      const repoCard = document.createElement("div");
      repoCard.classList.add("repo-card");
      repoCard.innerHTML = `
          <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
          <p>${
            repo.description ? repo.description : "No description provided."
          }</p>
          <span>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</span>
        `;
      repoList.appendChild(repoCard);
    });
  } catch (err) {
    console.error("Error loading repos:", err);
    document.getElementById("repo-list").innerHTML =
      "<p>Unable to load repositories.</p>";
  }
}

loadRepos();

//Typed Text for header
const text = [
  "IT Specialist.",
  "Computer Science Major.",
  "Tech Enthusiast.",
  "Problem Solver.",
];
let i = 0,
  j = 0,
  current = "",
  isDeleting = false;

function type() {
  current = text[i];
  document.getElementById("typed-text").textContent = current.substring(0, j);

  if (!isDeleting && j++ === current.length) {
    isDeleting = true;
    setTimeout(type, 1500);
  } else if (isDeleting && j-- === 0) {
    isDeleting = false;
    i = (i + 1) % text.length;
    setTimeout(type, 200);
  } else {
    setTimeout(type, isDeleting ? 60 : 100);
  }
}
type();
