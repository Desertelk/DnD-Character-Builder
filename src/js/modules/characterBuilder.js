import { getSpecies, getClasses } from "../api/dndApi.js"

export function initializeNameStep(character) {
    const form = document.querySelector("#character-name-form");
    const nameInput = document.querySelector("#character-name");
    const errorMessage = document.querySelector("#name-error");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();

        if(!name) {
            errorMessage.textContent = "Please eneter a character name.";
            return;
        }

        errorMessage.textContent = "";
        character.setName(name);

        console.log("Character name saved:", character.name)
    });
}

export async function initializeSpeciesStep(character) {
    const speciesContainer = document.querySelector("#species-options");
    const errorMessage = document.querySelector("#species-error");

    speciesContainer.innerHTML = `
        <p class=loading-message>Loading species...</p>
    `;

    try {
        const species = await getSpecies();

        speciesContainer.innerHTML = species
            .map((item) => `
                <button type="button" class="selection-card" data-species=${item.name}">${item.name}</button>
            `).join("");

        speciesContainer.addEventListener("click", (event) => {
            const selectedCard = event.target.closest(".selection-card");

            if (!selectedCard) {
                return;
            }

            document
                .querySelectorAll("#species-options .selection-card")
                .forEach((card) => card.classList.remove("selected"));

            selectedCard.classList.add("selected");

            character.setSpecies(selectedCard.dataset.species);

            console.log("Species selected:", character.species);
            console.log("Current character:", character);
        });
    } catch (error) {
        speciesContainer.innerHTML = "";
        errorMessage.textContent = "Unable to load species. Please try again.";
        console.error("Species API error:", error);
    }
}

export async function initializeClassStep(character) {
    const classContainer = document.querySelector("#class-options");
    const errorMessage = document.querySelector("#class-error");

    classContainer.innerHTML = `
        <p class="loading-message">Loading classes...</p>
    `;

    try {
        const classes = await getClasses();

        classContainer.innerHTML = classes.map((item) => `
            <button type="button" class="selection-card" data-class="${item.name}">${item.name}</button>`
        ).join("");

        classContainer.addEventListener("click", (event) => {
            const selectedCard = event.target.closest(".selection-card");

            if(!selectedCard) {
                return;
            }

            document
                .querySelectorAll("#class-options .selection-card")
                .forEach((card) => card.classList.remove("selected"));

            selectedCard.classList.add("selected");

            character.setClass(selectedCard.dataset.class);

            window.dispatchEvent(new CustomEvent("characterClassChanged"));

            console.log("Class selected:", character.characterClass);
            console.log("Current Character:", character);
        });
    } catch (error) {
        errorMessage.textContent = "Unable to load classes. Please try again.";
        console.error("Class API error:", error);
    }
}