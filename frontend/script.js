function shorten() {
  const longUrl = document.getElementById("longUrl").value;
  fetch("http://localhost:5000/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: longUrl }),
  })
    .then((res) => res.json())
    .then((data) => {
      const shortUrl = data.short_url;
      document.getElementById("result").innerHTML = `
        Short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a>
      `;
    })
    .catch((err) => {
      document.getElementById("result").innerText = "Something went wrong.";
      console.error(err);
    });
}
