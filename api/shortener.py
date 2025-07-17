# shortener.py

# In-memory storage
url_map = {}

def generate_short_code():
    return str(len(url_map) + 1)

def save_url(short_code, original_url):
    url_map[short_code] = original_url

def get_url(short_code):
    return url_map.get(short_code)
