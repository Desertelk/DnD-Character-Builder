const charactersContainer = document.querySelector("#saved-characters");

const savedCharacters = JSON.parse(localStorage.getItem("savedCharacters")) || [];

savedCharacters.forEach((character) => {
    if (!character.id) {
        character.id = crypto.randomUUID();
    }
});

localStorage.setItem("savedCharacters", JSON.stringify(savedCharacters));

if (savedCharacters.length === 0) {
    const message = document.createElement("p");
    message.textContent = "You haven't saved any characters yet.";

    charactersContainer.appendChild(message);
} else {

    // Assign unique IDs to previously saved characters that don't have one
    savedCharacters.forEach((character) => {
        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

        const characterName = document.createElement("h2");
        characterName.textContent = character.name;

        const characterDetails = document.createElement("p");
        characterDetails.textContent =
            `Level ${character.level} ${character.species} ${character.characterClass}`;

        const viewButton = document.createElement("button");
        viewButton.type = "button";
        viewButton.classList.add("primary-button");
        viewButton.textContent = "View Character";

        viewButton.addEventListener("click", () => {

            // Store the selected character so its details can be details can be displayed on the summary page.
            sessionStorage.setItem("currentCharacter", JSON.stringify(character));
            window.location.href = "summary.html";
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("delete-character");
        deleteButton.textContent = "Delete Character";

        deleteButton.addEventListener("click", () => {
            const confirmed = confirm(`Are you sure you want to delete ${character.name}?`);
            if (!confirmed) return;

            const currentSavedCharacters = JSON.parse(localStorage.getItem("savedCharacters")) || [];

            const updatedCharacters = currentSavedCharacters.filter(

                // Remove only the selected character by matching its unique ID.
                (saved) => saved.id !== character.id
            );

            localStorage.setItem("savedCharacters", JSON.stringify(updatedCharacters));

            characterCard.remove();

            if (updatedCharacters.length  === 0) {
                const message = document.createElement("p");
                message.textContent = "You haven't saved any characters yet."
                charactersContainer.appendChild(message);
            }
        });

        characterCard.appendChild(characterName);
        characterCard.appendChild(characterDetails);
        characterCard.appendChild(viewButton);
        characterCard.appendChild(deleteButton);
        charactersContainer.appendChild(characterCard);
    });
}