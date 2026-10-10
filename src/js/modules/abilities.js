export function initializeAbilities(character) {
    const abilityInputs = document.querySelectorAll(".ability-card input");
    const rollButton = document.querySelector("#roll-abilities");
    const rollMessage = document.querySelector("#roll-message");

    abilityInputs.forEach((input) => {
        const savedScore = character.abilities[input.id];

        if (savedScore !== undefined && savedScore !== null) {
            input.value = savedScore;
        } else {
            character.setAbility(input.id, Number(input.value));
        }

        
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

    rollButton.addEventListener("click", () => {
        abilityInputs.forEach((input) => {
            const score = rollAbilityScore();
            input.value = score;
            input.setCustomValidity("");
            character.setAbility(input.id, score);
        });

        rollMessage.textContent = "Your ability scores have been rolled!";
        console.log("Rolled Ability Scores:", character.abilities);
        console.log("Current Character:", character);
        });
        
}

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

function rollAbilityScore() {
    const rolls = [
        rollDie(),
        rollDie(),
        rollDie(),
        rollDie()
    ];

    rolls.sort((a, b) => a - b);

    rolls.shift();

    return rolls.reduce((total, roll) => total + roll, 0)
}

