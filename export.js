// Data export functionality
function exportToSheet(results) {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5taGPxVFjL1ubZcS4P9GWDrnfE0DgFh97SjH1Xf753DocrAhy-_9xonFewA_ZGVtQOQ/exec";

  const payload = {
    timestamp: results.timestamp,
    topElement: results.topElement,
    topPercentage: results.topPercentage,
    isBlended: results.isBlended,
    elementType: results.elementType,
    resultName: results.resultName,
    fire: results.percentages.fire,
    water: results.percentages.water,
    earth: results.percentages.earth,
    air: results.percentages.air
  };

  console.log("Sending payload:", payload);

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(() => console.log("Results sent to Google Sheets"))
  .catch(err => console.error("Error sending to Sheets:", err));
}