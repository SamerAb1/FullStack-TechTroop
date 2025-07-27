const nameInput = document.getElementById("name");
const birthdayInput = document.getElementById("birthday-wish");
const postBtn = document.getElementById("post-btn");

let postsArray = [
  {
    name: "Jerome",
    birthdaywish: "Happy Birthday kido!",
  },
  {
    name: "Charlene",
    birthdaywish: "Happy Birthday!",
  },
];

const render = function () {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";
  for (let post of postsArray) {
    let postBox = document.createElement("div");
    postBox.className = "post-box";
    postBox.innerHTML = `<p class="name">${post.name}: ${post.birthdaywish}</p>`;
    container.appendChild(postBox);
  }
};

postBtn.onclick = (event) => {
  const nameInput = document.getElementById("name").value.trim();
  const wishInput = document.getElementById("birthday-wish").value.trim();

  if (nameInput && wishInput) {
    postsArray.push({ name: nameInput, birthdaywish: wishInput });
    render();

    // Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("birthday-wish").value = "";
  }
};
