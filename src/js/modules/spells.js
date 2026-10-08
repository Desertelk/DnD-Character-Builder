// import { getSpells, getSpellDetails } from "../api/dndApi";
import { getOpen5eSpells } from "../api/open5eApi";

export async function initializeSpells(character) {
    const spellContainer = document.querySelector("#spell-options");
    const spellMessage = document.querySelector("#spell-message");

    if (!character.characterClass) {
        spellContainer.innerHTML = `
            <p class="loading-message">
                Choose a class to see available spells.
            </p>
        `;
        return;
    }

    spellContainer.innerHTML = `
        <p class=loading-message">Loading spells...</p>
    `;

    try {
        const spells = await getOpen5eSpells();

        const spellDetails = await Promise.all(spells.map((spell) => getSpellDetails(spell.index)));

        const filteredSpells = spellDetails.filter((spell) => 
            spell.classes.some((spellClass) => spellClass.name.toLowerCase() === character.characterClass.toLowerCase())
        );

        if (filteredSpells.length === 0) {
            spellConatiner.innerHTML = `
                <p class="loading-message">No spells are available for this class.</p>
            `;

            spellMessage.textContent = "No spells selected.";
            return;
        }

        spellContainer.innerHTML = filteredSpells.map((spell) => `
            <button type="button" class="spell-card" data-spell="${spell.name}">${spell.name}</button>
        `).join("");
    
        spellContainer.onclick = (event) => {
            const selectedCard = event.target.closest(".spell-card");
    
            if (!selectedCard) {
                return;
            }
    
            const spellName = selectedCard.dataset.spell;
    
            selectedCard.classList.toggle("selected");
    
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
        spellContainer.innerHTML = "";
        spellMessage.textContent = "Unable to load spells. please try again.";

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