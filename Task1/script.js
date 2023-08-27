const clientFilter = document.getElementById("clientFilter");
const clientList = document.getElementById("clientList");
const popup = document.getElementById("popup");
const popupName = document.getElementById("popupName");
const popupPoints = document.getElementById("popupPoints");
const popupAddress = document.getElementById("popupAddress");

// this is causing a CORS error because the API doesn't allow requests from other domains so we are using jugaad
let clients = [];
let clientData = {};
// Use CORS Anywhere proxy
//const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
//corsAnywhereUrl +
const apiURL = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=client_data";

// Fetch data from API using the proxy
async function fetchData() {
  try {
    const response = await fetch(apiURL);
    console.log(response);
    
    const data = await response.json();
    console.log(data);
    console.log("Amanannn");
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// Fetch data from the API
let result = await fetchData();
console.log(result);
console.log("Amanannn");
clients = result.clients;
clientData = result.data;
// Function to update the client list based on the selected filter
function updateClientList(filter) {
  clientList.innerHTML = "";

  clients.forEach((client) => {
    if (
      filter === "all" ||
      (filter === "managers" && client.isManager) ||
      (filter === "nonManagers" && !client.isManager)
    ) {
      const listItem = document.createElement("li");
      listItem.textContent = `${client.label} - ${
        clientData[client.id].points
      } points`;
      listItem.addEventListener("click", () => showPopup(client.id));
      clientList.appendChild(listItem);
    }
  });
}

// Function to show the popup with client details
function showPopup(clientId) {
  const selectedClient = clientData[clientId];
  popupName.textContent = `Name: ${selectedClient.name}`;
  popupPoints.textContent = `Points: ${selectedClient.points}`;
  popupAddress.textContent = `Address: ${selectedClient.address}`;
  popup.style.display = "block";
}

// Apply filter when dropdown value changes
clientFilter.addEventListener("change", () => {
  updateClientList(clientFilter.value);
});

// Initial load with all clients
updateClientList("all");
