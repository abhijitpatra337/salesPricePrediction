function updateItemType() {
    var itemIdentifier = document.getElementById('itemIdentifier').value;
    var itemTypeDropdown = document.getElementById('itemType');

    // Clear existing options
    itemTypeDropdown.innerHTML = '';

    // Populate based on selected Item Identifier
    if (itemIdentifier === 'food') {
        // Populate with food types
        addOption(itemTypeDropdown, 'default', 'Select an item type', true, true);
        addOption(itemTypeDropdown, 'Baking Goods', 'Baking Goods', false, false);
        addOption(itemTypeDropdown, 'Breads', 'Breads', false, false);
        addOption(itemTypeDropdown, 'Breakfast', 'Breakfast', false, false);
        addOption(itemTypeDropdown, 'Canned', 'Canned', false, false);
        addOption(itemTypeDropdown, 'Dairy', 'Dairy', false, false);
        addOption(itemTypeDropdown, 'Frozen Foods', 'Frozen Foods', false, false);
        addOption(itemTypeDropdown, 'Fruits and Vegetables', 'Fruits and Vegetables', false, false);
        addOption(itemTypeDropdown, 'Meat', 'Meat', false, false);
        addOption(itemTypeDropdown, 'Seafood', 'Seafood', false, false);
        addOption(itemTypeDropdown, 'Snack Foods', 'Snack Foods', false, false);
        addOption(itemTypeDropdown, 'Starchy Foods', 'Starchy Foods', false, false);

    } else if (itemIdentifier === 'drinks') {
        // Populate with drink types
        addOption(itemTypeDropdown, 'default', 'Select an item type', true, true);
        addOption(itemTypeDropdown, 'Hard Drinks', 'Hard Drinks', false, false);
        addOption(itemTypeDropdown, 'Soft Drinks', 'Soft Drinks', false, false);

    } else if (itemIdentifier === 'non-consumables') {
        // Populate with non-consumable types
        addOption(itemTypeDropdown, 'default', 'Select an item type', true, true);
        addOption(itemTypeDropdown, 'Health and Hygiene', 'Health and Hygiene', false, false);
        addOption(itemTypeDropdown, 'Household', 'Household', false, false);
        addOption(itemTypeDropdown, 'Others', 'Others', false, false);
    }
}

function addOption(selectElement, value, text, selected = false, disabled = false) {
  var option = document.createElement("option");
  option.value = value;
  option.text = text;
  if (selected) {
    option.setAttribute("selected", "selected");
  }
  if (disabled) {
    option.setAttribute("disabled", "disabled");
  }
  selectElement.add(option);
}

