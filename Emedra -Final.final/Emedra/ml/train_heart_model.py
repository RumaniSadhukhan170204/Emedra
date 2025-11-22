import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
import pickle
import os

# ✅ Load dataset
data = pd.read_csv("datasets/Heart_Disease_Prediction.csv")

# ✅ Drop unwanted index/Unnamed columns
data = data.loc[:, ~data.columns.str.contains('^Unnamed', case=False)]
if 'index' in data.columns:
    data = data.drop(columns=['index'])

# ✅ Encode target if necessary
if 'Heart Disease' in data.columns:
    data['Heart Disease'] = data['Heart Disease'].map({'Absence': 0, 'Presence': 1})

# ✅ Separate features & labels
X = data.drop('Heart Disease', axis=1)
y = data['Heart Disease']

print(f"✅ Training on {X.shape[1]} features: {list(X.columns)}")

# ✅ Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ✅ Create pipeline (scaler + model)
model = Pipeline([
    ('scaler', StandardScaler()),
    ('rf', RandomForestClassifier(n_estimators=100, random_state=42))
])

# ✅ Train model
model.fit(X_train, y_train)

# ✅ Save trained model
os.makedirs("model", exist_ok=True)
pickle.dump(model, open("model/heart_model.pkl", "wb"))

print("🎯 Model retrained successfully and saved to 'model/heart_model.pkl'")
