import { getSpecies, getClasses } from "../api/dndApi.js"
import d20Image from "../../images/d20-die.svg"

export function initializeNameStep(character) {
    const form = document.querySelector("#character-name-form");
    const nameInput = document.querySelector("#character-name");
    if (character.name) {
        nameInput.value = character.name;
    }

    const errorMessage = document.querySelector("#name-error");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();

        if(!name) {
            errorMessage.textContent = "Please enter a character name.";
            return;
        }

        errorMessage.textContent = "";
        character.setName(name);
        window.dispatchEvent(new CustomEvent("characterNameSubmitted"));
    });
}

export async function initializeSpeciesStep(character) {
    const speciesContainer = document.querySelector("#species-options");
    const errorMessage = document.querySelector("#species-error");
    errorMessage.textContent = "";

    speciesContainer.innerHTML = `
        <div class="d20-loader" role="status">
            <img src="${d20Image}" class="d20-die" alt="d20 die loading image" aria-hidden="true">
            <p>Loading species...</p>
        </div>
    `;

    try {
        const species = await getSpecies();

        speciesContainer.innerHTML = species
            .map((item) => `
                <button type="button" class="selection-card" data-species="${item.name}" aria-pressed="false">${item.name}</button>
            `).join("");

        // Restore the previously selected species when returning to the builder
        if (character.species) {
            speciesContainer.querySelectorAll(".selection-card").forEach((card) => {
                if (card.dataset.species === character.species) {
                    card.classList.add("selected");
                    card.setAttribute("aria-pressed", "true");
                }
            });
        }

        speciesContainer.addEventListener("click", (event) => {
            const selectedCard = event.target.closest(".selection-card");

            if (!selectedCard) {
                return;
            }

            speciesContainer.querySelectorAll(".selection-card").forEach((card) => {
                    card.classList.remove("selected");
                    card.setAttribute("aria-pressed", "false");
            });

            selectedCard.classList.add("selected");
            selectedCard.setAttribute("aria-pressed", "true");

            character.setSpecies(selectedCard.dataset.species);
            errorMessage.textContent = "";
        });
    } catch (error) {
        speciesContainer.innerHTML = "";
        errorMessage.textContent = "Unable to load species. Please try again.";
    }
}

export async function initializeClassStep(character) {
    const classContainer = document.querySelector("#class-options");
    const errorMessage = document.querySelector("#class-error");
    errorMessage.textContent = "";

    classContainer.innerHTML = `
        <div class="d20-loader" role="status">
            <img src="${d20Image}" class="d20-die" alt="" aria-hidden="true">
            <p>Loading classes...</p>
        </div>
    `;

    try {
        const classes = await getClasses();

        classContainer.innerHTML = classes.map((item) => `
            <button type="button" class="selection-card" data-class="${item.name}" aria-pressed="false">${item.name}</button>`
        ).join("");

        if (character.characterClass) {
            classContainer.querySelectorAll(".selection-card").forEach((card) => {
                if (card.dataset.class === character.characterClass) {
                    card.classList.add("selected");
                    card.setAttribute("aria-pressed", "true");
                }
            });
        }

        classContainer.addEventListener("click", (event) => {
            const selectedCard = event.target.closest(".selection-card");

            if(!selectedCard) {
                return;
            }

            classContainer.querySelectorAll(".selection-card").forEach((card) => {
                card.classList.remove("selected");
                card.setAttribute("aria-pressed", "false");
            });

            selectedCard.classList.add("selected");
            selectedCard.setAttribute("aria-pressed", "true");

            character.setClass(selectedCard.dataset.class);
            errorMessage.textContent = "";

            // Notify the spell module that the character's class has changed
            window.dispatchEvent(new CustomEvent("characterClassChanged"));
        });
    } catch (error) {
        classContainer.innerHTML = "";
        errorMessage.textContent = "Unable to load classes. Please try again.";
    }
}

export function initializeLevelSelection(character) {
    const levelSelect = document.querySelector("#character-level");

    // Add levels 2-20 to the dropdown. Level 1 is already in the HTML.
    for (let level = 2; level <= 20; level++) {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Level ${level}`;

        levelSelect.appendChild(option);
    }

    if (character.level) {
        levelSelect.value = String(character.level);
    }

    levelSelect.addEventListener("change", (event) => {
        character.setLevel(event.target.value);
        window.dispatchEvent(new CustomEvent("characterLevelChanged"));
    });
}