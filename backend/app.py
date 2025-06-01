from flask import Flask, request, jsonify
from model import predict
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables requests from your React frontend

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    user_text = data.get("text", "")
    if len(user_text.strip().split()) < 100:
        return jsonify({"error": "Text must be at least 100 words."}), 400

    prediction = predict(user_text)
    return jsonify({"prediction": prediction})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
