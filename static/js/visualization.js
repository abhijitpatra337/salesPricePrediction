// function to redirect to the visualization Page
function visualizationRedirection() {
    window.location.href = '/visualize.html';
}

function toggleCollapsibleBox(boxId) {
    var box = document.getElementById(boxId);
    if (box.style.display === 'block') {
        box.style.display = 'none';
    } else {
        box.style.display = 'block';
    }
}

function openPopup(boxId) {
    var box = document.getElementById(boxId);
    box.style.display = 'block';
}

function closePopup(boxId) {
    var box = document.getElementById(boxId);
    box.style.display = 'none';
}

function togglePopup(boxId) {
    var box = document.getElementById(boxId);
    box.style.display = (box.style.display === 'none' || box.style.display === '') ? 'block' : 'none';
}






