// console.log("testing")
const input = document.getElementById("searchUrl");
const button = document.getElementById("searchBtn");
const result = document.getElementById("title");
const titleApi = "http://127.0.0.1:4000/title-bot";

// const siteTitle = ''

// const getTitle = (title) => {

// }

button.addEventListener("click", async (event) => {
  const query = input.value;
  const returnTitle = await fetch(titleApi, {
    method: "POST",
    body: query,
  }).then(async (response) => {
    const data = await response.text();
    console.log(data);
    return data;
  });

  const p = document.createElement("p");
  p.innerText = returnTitle;
  document.appendChild(p);
});
// "info:siteurl"
