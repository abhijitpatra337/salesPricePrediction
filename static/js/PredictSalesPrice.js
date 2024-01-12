function predictPrice() {
    var inputFeatures = {
        item_visibility: document.getElementById('itemVisibility').value,
        item_mrp: document.getElementById('itemMRP').value,
        item_identifier: document.getElementById('itemIdentifier').value,
        item_type: document.getElementById('itemType').value,
        item_fat_content: document.getElementById('itemFatContent').value,
        outlet_size: document.getElementById('outletSize').value,
        outlet_location: document.getElementById('outletLocation').value,
        outlet_establishment_year: document.getElementById('outletEstablishmentYear').value,
        outlet_type: document.getElementById('outletType').value,
    };
    var inputFeaturesXgboost = {
        item_visibility: document.getElementById('itemVisibility').value,
        item_mrp: document.getElementById('itemMRP').value,
        item_type: document.getElementById('itemType').value,
        item_fat_content: document.getElementById('itemFatContent').value,
        outlet_size: document.getElementById('outletSize').value,
        outlet_location: document.getElementById('outletLocation').value,
        outlet_establishment_year: document.getElementById('outletEstablishmentYear').value,
        outlet_type: document.getElementById('outletType').value,
    };

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features: inputFeaturesXgboost }),
    })
    .then(response => response.json())
    .then(data => {
        // Save input features and prediction result to local storage
        localStorage.setItem('inputFeatures', JSON.stringify(inputFeatures));
        localStorage.setItem('predictionResult', data.prediction);

        // Redirect to a new page
        window.location.href = '/result?input_features=' + encodeURIComponent(JSON.stringify(inputFeatures)) + '&prediction_result=' + encodeURIComponent(data.prediction);

    })
    .catch((error) => {
        console.error('Error occured in sales prediction:', error);
    });
}
