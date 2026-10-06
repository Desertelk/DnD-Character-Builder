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