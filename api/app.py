from flask import Flask, request, jsonify, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

url_map = {}

@app.route("/shorten", methods=["POST"])
def shorten():
    data = request.get_json()
    original_url = data.get("url")
    if not original_url:
        return jsonify({"error": "Missing URL"}), 400

    short_code = str(len(url_map) + 1)
    url_map[short_code] = original_url
    return jsonify({"short_url": f"https://your-app-name.onrender.com/{short_code}"})

@app.route("/expand/<short_code>", methods=["GET"])
def expand(short_code):
    original_url = url_map.get(short_code)
    if original_url:
        return jsonify({"original_url": original_url})
    return jsonify({"error": "Short code not found"}), 404

@app.route("/<short_code>")
def redirect_short(short_code):
    url = url_map.get(short_code)
    if url:
        return redirect(url)
    return jsonify({"error": "URL not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
