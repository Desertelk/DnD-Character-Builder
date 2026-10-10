export function initializeNavigation(character) {
    const steps = document.querySelectorAll(".builder-step");
    const previousButton = document.querySelector("#previous-step");
    const nextButton = document.querySelector("#next-step");
    const stepIndicator = document.querySelector("#step-indicator");

    let currentStep = 0;

    function showStep(moveFocus = false) {
        steps.forEach((step, index) => {
            step.hidden = index !== currentStep;
        });

        previousButton.disabled = currentStep === 0;

        nextButton.hidden = currentStep === 0;

        const isLastStep = currentStep === steps.length -1;

        nextButton.textContent = isLastStep ? "Review Character" : "Next";
        nextButton.disabled = false;

        stepIndicator.textContent = `Step ${currentStep + 1} of ${steps.length}`;

        if (moveFocus) {
            const activeStep = steps[currentStep];
            const heading = activeStep.querySelector("h2");

            heading?.focus();
        }
    }

    previousButton.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(true);
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentStep === 1 && !character.species) {
            document.querySelector("#species-error").textContent = "Please select a species before continuing";
            return;
        }

        if (currentStep === 2 && !character.characterClass) {
            document.querySelector("#class-error").textContent = "Please select a class before continuing.";
            return;
        }

        if (currentStep === steps.length - 1) {
            sessionStorage.setItem("currentCharacter", JSON.stringify(character));

            window.location.href = "summary.html";
            return;
        }

        if (currentStep < steps.length -1) {
            currentStep++;
            showStep(true);
        }
    });

    window.addEventListener("characterNameSubmitted", () => {
        if (currentStep === 0) {
            currentStep = 1;
            showStep(true);
        }
    });

    showStep();
}