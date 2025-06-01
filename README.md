Mind Lens: Machine Learning Application for Detecting Mental Health Issues Using Social Media

Project Overview

Mind Lens uses machine learning to detect and classify depression severity from social media text data. It leverages the DepSeverity dataset and applies NLP and ML models for multiclass classification.

Tech Stack

Backend: Python, Flask, ML models (Random Forest)
Frontend: ReactJS
Machine Learning Libraries: scikit-learn
Data: DepSeverity dataset (Reddit posts annotated with depression severity)


Getting Started
Backend

1. Navigate to the backend folder:
   cd backend
   

2. Install Python dependencies (if not already done):
   pip install -r requirements.txt
   
3. Run the backend server:
   python app.py
   
Frontend

1. Navigate to the frontend folder:
   cd frontend

2. Install Node dependencies (if not already done):
   npm install

3. Start the frontend application:
   npm start


Usage

* Access the frontend via `http://localhost:3000` after running `npm start`.
* Backend API runs on its default port (usually 5000 or 8000).
* Frontend communicates with backend to send text and receive depression severity classification.
