export function initializeAbilities(character) {
    const abilityInputs = document.querySelectorAll(".ability-card input");

    abilityInputs.forEach((input) => {

        character.setAbility(input.id, Number(input.value));
        
        input.addEventListener("change", () => {
            const score = Number(input.value);

            if (score < 1 || score > 20) {
                input.setCustomValidity(
                    "Ability scores must be between 1 and 20."
                );
                input.reportValidity();
                return;
            }

            input.setCustomValidity("");
            character.setAbility(input.id, score);

            console.log(`${input.id}:`, score);
            console.log("Current Character:", character);
        });
    });
}