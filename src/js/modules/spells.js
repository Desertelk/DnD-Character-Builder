// import { getSpells, getSpellDetails } from "../api/dndApi";
import { getOpen5eSpellsByClass } from "../api/open5eApi.js";

let latestSpellRequest = 0;

function getMaxSpellLevel(characterClass, characterLevel) {
    const fullCasters = [
        "bard", "cleric", "druid", "sorcerer", "wizard"
    ];

    const halfCasters = ["paladin", "ranger"];

    const selectedClass = characterClass.toLowerCase();

    if (fullCasters.includes(selectedClass)) {
        return Math.min(9, Math.ceil(characterLevel / 2));
    }

    if (halfCasters.includes(selectedClass)) {
        if (characterLevel < 2) return -1;
        return Math.min(5, Math.ceil(characterLevel / 4));
    }

    if (selectedClass === "warlock") {
        return Math.min(5, Math.ceil(characterLevel / 2));
    }

    return -1;
}

export async function initializeSpells(character) {
    const spellContainer = document.querySelector("#spell-options");
    const spellMessage = document.querySelector("#spell-message");
    const requestId = ++latestSpellRequest;
    spellMessage.textContent = "";

    if (!character.characterClass) {
        spellContainer.innerHTML = `
            <p class="loading-message">
                Choose a class to see available spells.
            </p>
        `;
        return;
    }

    spellContainer.innerHTML = `
        <p class="loading-message">Loading spells...</p>
    `;

    try {
        const classSpells = await getOpen5eSpellsByClass(character.characterClass);

        if (requestId !== latestSpellRequest) {
            return;
        }
        
        const maxSpellLevel = getMaxSpellLevel(character.characterClass, character.level);

        const filteredSpells = classSpells.filter((spell) => {
            const spellLevel = Number(spell.level);
            return spellLevel <= maxSpellLevel;
        })


        if (filteredSpells.length === 0) {
            spellContainer.innerHTML = `
                <p class="loading-message">No spells are available for this class.</p>
            `;

            spellMessage.textContent = "No spells selected.";
            return;
        }

        spellContainer.innerHTML = filteredSpells.map((spell) => `
            <button type="button" class="spell-card" data-spell="${spell.name}">${spell.name}</button>
        `).join("");

        spellContainer.querySelectorAll(".spell-card").forEach((card) => {
            const spellName = card.dataset.spell;

            if (character.spells.includes(spellName)) {
                card.classList.add("selected");
                card.setAttribute("aria-pressed", "true");
            } else {
                card.setAttribute("aria-pressed", "false");
            }
        });

        updateSpellMessage(character, spellMessage);
    
        spellContainer.onclick = (event) => {
            const selectedCard = event.target.closest(".spell-card");
    
            if (!selectedCard) {
                return;
            }
    
            const spellName = selectedCard.dataset.spell;

            selectedCard.classList.toggle("selected");

            selectedCard.setAttribute("aria-pressed", String(selectedCard.classList.contains("selected")));
    
            if (selectedCard.classList.contains("selected")) {
                character.addSpell(spellName);
            } else {
                character.spells = character.spells.filter((spell) => spell !== spellName);
            }
    
            updateSpellMessage(character, spellMessage);
    
            console.log("Spells:", character.spells);
            console.log("Current Character:", character);
        };
    } catch (error) {
        if (requestId !== latestSpellRequest) {
            return;
        }
        spellContainer.innerHTML = "";
        spellMessage.textContent = "Unable to load spells. Please try again.";

        console.error("Spell API error:", error);
    }
}

function updateSpellMessage(character, messageElement) {
    const count = character.spells.length;

    if (count === 0) {
        messageElement.textContent = "No spells selected.";
        return;
    }

    messageElement.textContent = `${count} spell${count === 1 ? "" : "s"} selected.`;
}

