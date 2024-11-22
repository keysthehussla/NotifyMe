// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
const db = firebase.database();

// HTML Elements
const areaDropdown = document.getElementById('areaDropdown');
const checkStatusButton = document.getElementById('checkStatus');
const statusParagraph = document.getElementById('status');

// Fetch Power Status
checkStatusButton.addEventListener('click', () => {
  const selectedArea = areaDropdown.value;

  if (selectedArea) {
    statusParagraph.textContent = "Checking...";
    db.ref(`areas/${selectedArea}/status`).once('value')
      .then(snapshot => {
        const status = snapshot.val();
        if (status) {
          statusParagraph.textContent = `Status: ${status}`;
        } else {
          statusParagraph.textContent = "No data available for this area.";
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        statusParagraph.textContent = "Error fetching data.";
      });
  } else {
    alert("Please select an area.");
  }
});