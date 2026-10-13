import Character from "./models/Character"
import { initializeNameStep, initializeSpeciesStep, initializeClassStep, initializeLevelSelection} from "./modules/characterBuilder";
import { initializeAbilities } from "./modules/abilities";
import { initializeEquipment } from "./modules/equipment";
import { initializeSpells } from "./modules/spells";
import { initializeNavigation } from "./modules/navigation";

const currentCharacter = new Character();

// Starts a fresh character when requested, otherwise it will restore the current character.
const urlParams = new URLSearchParams(window.location.search);
const startNew = urlParams.get("new") === "true";

if (startNew) {
    sessionStorage.removeItem("currentCharacter");
}

const storedCharacter = sessionStorage.getItem("currentCharacter");

if (storedCharacter) {
    const characterData = JSON.parse(storedCharacter);
    Object.assign(currentCharacter, characterData);
}

// Initializes each step of the character creation process
initializeNameStep(currentCharacter);
initializeSpeciesStep(currentCharacter);
initializeClassStep(currentCharacter);
initializeAbilities(currentCharacter);
initializeEquipment(currentCharacter);

// Clear the previous spell selections and then reload spells when the class changes
window.addEventListener("characterClassChanged", () => {
    currentCharacter.spells = [];
    initializeSpells(currentCharacter);
});

initializeSpells(currentCharacter);
initializeNavigation(currentCharacter);
initializeLevelSelection(currentCharacter);

// Clear the previous spell selections and then reload spells when the character's level changes
window.addEventListener("characterLevelChanged", () => {
    currentCharacter.spells = [];
    initializeSpells(currentCharacter);
});
