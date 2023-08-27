import dummyData from "./dummyData.js"

const clientFilter = document.getElementById("clientFilter");
const clientList = document.getElementById("clientList");
const popup = document.getElementById("popup");
const popupName = document.getElementById("popupName");
const popupPoints = document.getElementById("popupPoints");
const popupAddress = document.getElementById("popupAddress");

// Use dummyData instead of fetching from API
const clients = dummyData.clients;
const clientData = dummyData.data;

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

function showPopup(clientId) {
    const selectedClient = clientData[clientId];
    popupName.textContent = `Name: ${selectedClient.name}`;
    popupPoints.textContent = `Points: ${selectedClient.points}`;
    popupAddress.textContent = `Address: ${selectedClient.address}`;
    popup.style.display = "block";

    // Add a close button to the popup
    const closeButton = document.getElementById("closePopup")
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
        popup.style.display = "none";
    });
    popup.appendChild(closeButton);

}

// Apply filter when dropdown value changes
clientFilter.addEventListener("change", () => {
  updateClientList(clientFilter.value);
});

// Initial load with all clients
updateClientList("all");
