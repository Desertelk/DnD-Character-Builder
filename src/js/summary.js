import { getOpen5eSpellsByClass } from "./api/open5eApi";

const savedCharacter = sessionStorage.getItem("currentCharacter");
const abilitiesContainer = document.querySelector("#summary-abilities");
const equipmentContainer = document.querySelector("#summary-equipment");
const spellContainer = document.querySelector("#summary-spells");

if (savedCharacter) {
    const character = JSON.parse(savedCharacter);
    document.querySelector("#summary-name").textContent = character.name;
    document.querySelector("#summary-details").textContent = 
        `Level ${character.level} ${character.species} ${character.characterClass}`;

    console.log("Character loaded:", character);

    Object.entries(character.abilities).forEach(([ability, score]) => {
        const abilityCard = document.createElement("div");
        abilityCard.classList.add("summary-ability-card");

        const abilityName = document.createElement("h4");
        abilityName.textContent = ability;

        const abilityScore = document.createElement("p");
        abilityScore.textContent = score ?? "Not assigned";

        abilityCard.appendChild(abilityName);
        abilityCard.appendChild(abilityScore);

        abilitiesContainer.appendChild(abilityCard);
    });

    if (character.equipment.length === 0) {
        const message = document.createElement("li");
        message.textContent = "No equipment selected.";
        equipmentContainer.appendChild(message);
    } else {
        character.equipment.forEach((item) => {
            const equipmentItem = document.createElement("li");
            equipmentItem.textContent = typeof item === "string" ? item : item.name;

            equipmentContainer.appendChild(equipmentItem);
        }); 
    }

    if (character.spells.length === 0) {
        const message = document.createElement("li");
        message.textContent = "No spells selected.";
        spellContainer.appendChild(message);
    } else {
        character.spells.forEach((spell) => {
            const spellItem = document.createElement("li");

            spellItem.textContent = typeof spell === "string" ? spell : spell.name;

            spellContainer.appendChild(spellItem);
        });
    }

} else {
    console.log("No character data found.");

    document.querySelector("#summary-name").textContent = "No character found";
    document.querySelector("#summary-details").textContent = "Please create a character first.";
}

const saveButton = document.querySelector("#save-character");

saveButton.addEventListener("click", () => {
    const currentCharacter = sessionStorage.getItem("currentCharacter");

    if (!currentCharacter) {
        alert("No character available to save.");
        return;
    }

    const character = JSON.parse(currentCharacter);

    const savedCharacters = JSON.parse(localStorage.getItem("savedCharacters")) || [];

    if (character.id && savedCharacters.some((saved) => saved.id === character.id)) {
        alert("This character has already been saved.");
        return;
    }

    character.id = character.id || crypto.randomUUID();

    savedCharacters.push(character);

    sessionStorage.setItem(
        "currentCharacter",
        JSON.stringify(character)
    );

    localStorage.setItem(
        "savedCharacters",
        JSON.stringify(savedCharacters)
    );

    alert("Character saved successfully!");
});