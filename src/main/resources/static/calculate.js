var bounds = { valueNames:['Max', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'], values:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
var numGrades = { inputValues:[], totalInputs:0, values:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } 

function getBounds() {
    for (let i = 0; i < 12; i++) {
        bounds.values[i] = document.getElementById("boundsInput" + i).value;
        if (i != 0 & bounds.values[i] < bounds.values[i + 1]) {
            error("Bounds for " + bounds.valueNames[i] + " < Bounds for " + bounds.valueNames[i + 1]);
        }
    }

    updateHistogramValues();
}

function printBounds() {
    for (let i = 0; i < 12; i++) {
        console.log(bounds.valueNames[i] + ": " + bounds.values[i]);
    }
}

function getValueFromInput(evt) {
    element = document.getElementById('newGradeInput');
    elementValue = element.value;
    element.value = null;
    return elementValue;
}

function getIndexFromBounds(value) {
    for (let i = 1; i < 12; i++) {
        if (Number(value) >= bounds.values[i])  {
            return i;
        }
    }
    return 11;
}

function addValueToHistogram(value, newValue) {
    var index = getIndexFromBounds(value);
    if (newValue == true)  {
        numGrades.inputValues.push(value);
        numGrades.totalInputs += 1;
    }
    numGrades.values[index] += 1;
}

function histogramInputHandler(evt) {
    if (evt.key === 'Enter') {
        addValueToHistogram(getValueFromInput(evt), true);
        setHistogramValues();
    }
}

function setHistogramValues() {
    for (let i = 1; i < 12; i++) {
        document.getElementById("hist_" + i + "_display").innerHTML = numGrades.values[i];
    }

    for (let i = 1; i < 12; i++) {
        document.getElementById("hist_" + i + "_display").style.width = getHistogramElementWidth(i) + "px";
    }
}

function updateHistogramValues() {
    for (let i = 1; i < 12; i++) {
        numGrades.values[i] = 0;
    }

    for (let i = 0; i < numGrades.inputValues.length; i++) {
        addValueToHistogram(numGrades.inputValues[i], false);
    }

    setHistogramValues();
}

const maxGradeDisplayWidth = 100;
const minGradeDisplayWidth = 10;
function getHistogramElementWidth(index) {
    n = ((numGrades.values[index] / numGrades.totalInputs) * (maxGradeDisplayWidth - minGradeDisplayWidth)) + minGradeDisplayWidth;
    return n;
}

function error(message) {
    window.alert("ERROR: " + message);
}


// Add Listeners
document.getElementById('newGradeInput').addEventListener('keypress', histogramInputHandler)
for (var i = 0; i < 12; i++) {
    document.getElementById("boundsInput" + i).addEventListener('input', getBounds);
}
getBounds();