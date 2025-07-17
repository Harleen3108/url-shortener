from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from shortener import generate_short_code, save_url, get_url

app = Flask(__name__)
CORS(app)

@app.route("/shorten", methods=["POST"])
def shorten():
    data = request.get_json()
    original_url = data.get("url")
    short_code = generate_short_code()
    save_url(short_code, original_url)
    return jsonify({"short_url": f"https://your-api-url.onrender.com/{short_code}"})

@app.route("/<short_code>")
def redirect_short(short_code):
    url = get_url(short_code)
    if url:
        return redirect(url)
    return jsonify({"error": "URL not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
