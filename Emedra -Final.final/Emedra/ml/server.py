from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import traceback

app = Flask(__name__)
CORS(app)

# ✅ Home route
@app.route('/')
def home():
    return jsonify({
        "message": "✅ Flask ML Server running on port 5001.",
        "usage": "Use POST /predict with JSON body for ML inference."
    })

# ✅ Load model safely
try:
    model = pickle.load(open('model/heart_model.pkl', 'rb'))
    print("✅ Model loaded successfully!")
except Exception as e:
    print("❌ Error loading model:", e)
    model = None


@app.route('/predict', methods=['POST'])
def predict_heart():
    if model is None:
        return jsonify({"error": "Model not loaded on server."}), 500

    try:
        data = request.get_json(force=True)

        # Ensure all required fields are present
        expected_keys = [
            'Age', 'Sex', 'ChestPain', 'BP', 'Cholesterol', 'FBS',
            'EKG', 'MaxHR', 'ExerciseAngina', 'ST_Depression',
            'Slope', 'Vessels', 'Thallium'
        ]

        missing = [key for key in expected_keys if key not in data]
        if missing:
            return jsonify({
                "error": f"Missing keys in request: {missing}"
            }), 400

        # Convert input to NumPy array
        features = np.array([
            data['Age'],
            data['Sex'],
            data['ChestPain'],
            data['BP'],
            data['Cholesterol'],
            data['FBS'],
            data['EKG'],
            data['MaxHR'],
            data['ExerciseAngina'],
            data['ST_Depression'],
            data['Slope'],
            data['Vessels'],
            data['Thallium']
        ]).reshape(1, -1)

        # Prediction
        prediction = model.predict(features)[0]

        # Handle categorical prediction output if it's a string
        if isinstance(prediction, str):
            severity = "Critical" if prediction.lower() == "presence" else "Normal"
        else:
            severity = "Critical" if prediction == 1 else "Normal"

        return jsonify({
            "severity": severity,
            "alert": (
                "🚨 Emergency! Immediate hospital access required."
                if severity == "Critical"
                else "✅ Normal condition"
            )
        })

    except Exception as e:
        print("❌ Error during prediction:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
