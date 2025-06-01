import joblib
import re
import string

# Load vectorizer and model (save these from your notebook)
vectorizer = joblib.load("vectorizer.pkl")
model = joblib.load("rf_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

def preprocess(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = re.sub(r"\s+", " ", text).strip()
    return text

def predict(text):
    clean = preprocess(text)
    vec = vectorizer.transform([clean])
    prediction = model.predict(vec)[0]
    label = label_encoder.inverse_transform([prediction])[0]
    return label
