import Character from "./models/Character"
import { getClasses } from "./api/dndApi";
import { getOpen5eSpecies } from "./api/open5eApi";
import { initializeNameStep, initializeSpeciesStep, initializeClassStep, initializeLevelSelection} from "./modules/characterBuilder";
import { initializeAbilities } from "./modules/abilities";
import { initializeEquipment } from "./modules/equipment";
import { initializeSpells } from "./modules/spells";
import { initializeNavigation } from "./modules/navigation";

const currentCharacter = new Character();

const storedCharacter = sessionStorage.getItem("currentCharacter");

if (storedCharacter) {
    const characterData = JSON.parse(storedCharacter);
    Object.assign(currentCharacter, characterData);
    console.log("Restored character:", currentCharacter);
}

initializeNameStep(currentCharacter);
initializeSpeciesStep(currentCharacter);
initializeClassStep(currentCharacter);
initializeAbilities(currentCharacter);
initializeEquipment(currentCharacter);
window.addEventListener("characterClassChanged", () => {
    currentCharacter.spells = [];
    initializeSpells(currentCharacter);
});

initializeSpells(currentCharacter);
initializeNavigation(currentCharacter);
initializeLevelSelection(currentCharacter);
window.addEventListener("characterLevelChanged", () => {
    currentCharacter.spells = [];
    initializeSpells(currentCharacter);
});


window.showCharacter = () => {
    console.log("Character Data:", {
        name: currentCharacter.name,
        level: currentCharacter.level,
        species: currentCharacter.species,
        characterClass: currentCharacter.characterClass,
        abilities: currentCharacter.abilities,
        equipment: currentCharacter.equipment,
        spells: currentCharacter.spells,
    });
};
