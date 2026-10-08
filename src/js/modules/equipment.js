import { getEquipment } from "../api/dndApi";

export async function initializeEquipment(character) {
    const equipmentContainer = document.querySelector("#equipment-options");
    const equipmentMessage = document.querySelector("#equipment-message");

    equipmentContainer.innerHTML = `<p class=loading-message">Loading equipment...</p>`;

    try {
        const equipment = await getEquipment();

        equipmentContainer.innerHTML = equipment.map((item) => `
            <button type="button" class="equipment-card" data-equipment="${item.name}">${item.name}</button>
        `).join("");
        equipmentContainer.addEventListener("click", (event) => {
            const selectedCard = event.target.closest(".equipment-card");
    
            if (!selectedCard) {
                return;
            }
    
            const equipmentName = selectedCard.dataset.equipment;
    
            selectedCard.classList.toggle("selected");
    
            if (selectedCard.classList.contains("selected")) {
                character.addEquipment(equipmentName);
            } else {
                character.equipment = character.equipment.filter((item) => item !== equipmentName);
            }
    
            updateEquipmentMessage(character, equipmentMessage);
    
            console.log("Equipment:", character.equipment);
            console.log("Current Character:", character);
        });
    } catch (error) {
        equipmentContainer.innerHTML = "";
        equipmentMessage.textContent = "Unable to load equipment. Please try again.";

        console.error("Equipment API error:", error);
    }

}

function updateEquipmentMessage(character, messageElement) {
    const count = character.equipment.length;

    if (count === 0) {
        messageElement.textContent = "No equipment selected.";
        return;
    }

    messageElement.textContent = `${count} item${count === 1 ? "" : "s"} selected.`;
}