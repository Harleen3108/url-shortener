const API_BASE = "https://your-app-name.onrender.com"; // Replace when deployed

document.getElementById("shorten-btn").addEventListener("click", async () => {
    const url = document.getElementById("url-input").value;
    if (!url) return alert("Please enter a URL!");

    try {
        const res = await fetch(`${API_BASE}/shorten`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });
        const data = await res.json();

        if (data.short_url) {
            document.getElementById("short-url").innerHTML = `<a href="${data.short_url}" target="_blank">${data.short_url}</a>`;
        } else {
            alert("Error shortening URL.");
        }
    } catch (err) {
        alert("Server error.");
        console.error(err);
    }
});

document.getElementById("expand-btn").addEventListener("click", async () => {
    const shortCode = document.getElementById("expand-input").value;
    if (!shortCode) return alert("Enter short code to expand!");

    try {
        const res = await fetch(`${API_BASE}/expand/${shortCode}`);
        const data = await res.json();

        if (data.original_url) {
            document.getElementById("expanded-url").innerText = data.original_url;
        } else {
            alert("Short code not found.");
        }
    } catch (err) {
        alert("Error connecting to server.");
        console.error(err);
    }
});
