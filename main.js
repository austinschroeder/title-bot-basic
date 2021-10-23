// console.log("testing")
const input = document.getElementById("searchUrl");
const button = document.getElementById("searchBtn");
const result = document.getElementById("title");

const titleApi = "http://127.0.0.1:4000/title-bot";

button.addEventListener("click", async (event) => {
  const query = { URL: input.value };
  console.log(query);
  const returnTitle = await fetch(titleApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  }).then(async (response) => {
    const data = await response.text();
    console.log(data.data);

    const p = document.createElement("p");
    p.innerText = returnTitle;
    document.appendChild(p);

    return data;
  });
});

document.querySelector("title");
