from flask import Flask, request, jsonify, render_template
import xgboost as xgb
import numpy as np
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler
import json

app = Flask(__name__, template_folder='templates')


# Load the XGBoost model
def load_model():
    loaded_model = xgb.Booster()
    loaded_model.load_model('xgb_sales_data.model')
    return loaded_model


model = load_model()

# route for the homepage
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/result')
def result():
    # Retrieve data from query parameters
    input_features = json.loads(request.args.get('input_features', '{}'))
    prediction_result = request.args.get('prediction_result', 'N/A')

    return render_template('resultPage.html', input_features=input_features, prediction_result=prediction_result)

# route for visualization
@app.route('/visualize.html')
def visualize():
    return render_template('visualize.html')


# Label Encoding
order_item_fat = ['Low Fat', 'Regular']
item_fat_label_encoder = LabelEncoder()
item_fat_label_encoder.fit(order_item_fat)

order_outlet_size = ['Small', 'Medium', 'High']
outlet_size_encoder = LabelEncoder()
outlet_size_encoder.fit(order_outlet_size)

# One-Hot Encoding
ohe_columns = ['item_type', 'outlet_location', 'outlet_type']
ohe = OneHotEncoder(sparse_output=False)

# Standard Scaling
std_scalar_cols = ['item_visibility', 'item_mrp', 'outlet_establishment_year']
std_scalar = StandardScaler()

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print("Input data is : ", data)
    # Label Encoding
    item_fat_content_encoded = item_fat_label_encoder.transform([data['features'].get('item_fat_content', '')])[0]
    outlet_size_encoded = outlet_size_encoder.transform([data['features'].get('outlet_size', '')])[0]
    # One-Hot Encoding
    ohe_input = np.array([[data['features'].get('item_type', ''), data['features'].get('outlet_location', ''),
                           data['features'].get('outlet_type', '')]])
    # Fit the OneHotEncoder using the specified columns
    ohe.fit(ohe_input)
    # Transform using the encoded data
    ohe_features = ohe.transform(ohe_input)

    # Standard Scaling
    std_scalar_input = np.array([
        data['features'].get('item_visibility', ''),
        data['features'].get('item_mrp', ''),
        data['features'].get('outlet_establishment_year', '')
    ]).reshape(1, -1)

    # Handle missing values with a default value
    std_scalar_input = np.where(std_scalar_input == '', np.nan, std_scalar_input)
    std_scalar_input = np.nan_to_num(std_scalar_input.astype(float))
    std_scaled_features = std_scalar.fit_transform(std_scalar_input)

    # Combine all features
    input_features = np.concatenate([
        [item_fat_content_encoded, outlet_size_encoded],
        ohe_features.flatten(),
        std_scaled_features.flatten()
    ]).reshape(1, -1)

    print("FINAL INPUT FEATURES : ", input_features)
    # Convert features to dmatrix format for XGBoost prediction
    dmatrix = xgb.DMatrix(input_features)

    # Use predict() method for XGBoost prediction
    prediction = model.predict(dmatrix)

    return jsonify({'prediction': prediction.tolist()})


if __name__ == '__main__':
    app.run(debug=True)
