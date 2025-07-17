#include <iostream>
#include <unordered_map>
#include <fstream>

std::unordered_map<std::string, std::string> urlMap;

std::string hashFunction(const std::string& url) {
    std::hash<std::string> hasher;
    size_t hash = hasher(url);
    return std::to_string(hash).substr(0, 6);
}

void saveToFile() {
    std::ofstream file("urls.txt");
    for (const auto& pair : urlMap) {
        file << pair.first << " " << pair.second << "\n";
    }
    file.close();
}

void loadFromFile() {
    std::ifstream file("urls.txt");
    std::string shortUrl, longUrl;
    while (file >> shortUrl >> longUrl) {
        urlMap[shortUrl] = longUrl;
    }
    file.close();
}

int main(int argc, char* argv[]) {
    loadFromFile();
    if (argc < 3) {
        std::cerr << "Usage: ./shortener shorten|expand <url_or_code>\n";
        return 1;
    }

    std::string command = argv[1];
    std::string input = argv[2];

    if (command == "shorten") {
        std::string code = hashFunction(input);
        urlMap[code] = input;
        saveToFile();
        std::cout << code << "\n";
    } else if (command == "expand") {
        if (urlMap.find(input) != urlMap.end()) {
            std::cout << urlMap[input] << "\n";
        } else {
            std::cerr << "Code not found.\n";
        }
    }

    return 0;
}
