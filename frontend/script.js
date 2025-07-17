const API_BASE = "https://your-app-name.onrender.com";

document.getElementById("shorten-btn").addEventListener("click", async () => {
    const input = document.getElementById("url-input");
    const url = input.value.trim();

    if (!url) {
        alert("Please enter a URL!");
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/shorten`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (data.short_url) {
            const output = document.getElementById("short-url");
            output.innerHTML = `
                <p>Shortened URL:</p>
                <a href="${data.short_url}" target="_blank">${data.short_url}</a>
                <button onclick="navigator.clipboard.writeText('${data.short_url}')">📋 Copy</button>
            `;
            input.value = ""; 
        } else {
            alert("Something went wrong. No short URL returned.");
        }
    } catch (error) {
        alert("Could not connect to the backend.");
        console.error(error);
    }
});
