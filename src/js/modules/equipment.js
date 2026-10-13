import { getEquipment } from "../api/dndApi.js";
import d20Image from "../../images/d20-die.svg";

export async function initializeEquipment(character) {
    const equipmentContainer = document.querySelector("#equipment-options");
    const equipmentMessage = document.querySelector("#equipment-message");
    equipmentMessage.textContent = "";

    equipmentContainer.innerHTML = `
        <div class="d20-loader" role="status">
            <img src="${d20Image}" class="d20-die" alt="d20 die loading image" aria-hidden="true">
            <p>Loading equipment...</p>
        </div>
    `;

    try {
        const equipment = await getEquipment();

        equipmentContainer.innerHTML = equipment.map((item) => `
            <button type="button" class="equipment-card" data-equipment="${item.name}">${item.name}</button>
        `).join("");

        // Restore previously selected equipment when the builder loads
        equipmentContainer.querySelectorAll(".equipment-card").forEach((card) => {
            const equipmentName = card.dataset.equipment;

            if(character.equipment.includes(equipmentName)) {
                card.classList.add("selected");
                card.setAttribute("aria-pressed", "true");
            } else {
                card.setAttribute("aria-pressed", "false");
            }
        });

        updateEquipmentMessage(character, equipmentMessage);

        equipmentContainer.addEventListener("click", (event) => {
            const selectedCard = event.target.closest(".equipment-card");
    
            if (!selectedCard) {
                return;
            }
    
            const equipmentName = selectedCard.dataset.equipment;
    
            selectedCard.classList.toggle("selected");
            selectedCard.setAttribute(
                "aria-pressed", String(selectedCard.classList.contains("selected"))
            );
    
            // Keep the character's equipment list synchronized with the selected cards.
            if (selectedCard.classList.contains("selected")) {
                character.addEquipment(equipmentName);
            } else {
                character.equipment = character.equipment.filter((item) => item !== equipmentName);
            }
    
            updateEquipmentMessage(character, equipmentMessage);
        });
    } catch (error) {
        equipmentContainer.innerHTML = "";
        equipmentMessage.textContent = "Unable to load equipment. Please try again.";
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