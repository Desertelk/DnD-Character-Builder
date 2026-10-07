import Character from "./models/Character"
import { getClasses } from "./api/dndApi";
import { getOpen5eSpecies } from "./api/open5eApi";
import { initializeNameStep, initializeSpeciesStep, initializeClassStep} from "./modules/characterBuilder";
import { initializeAbilities } from "./modules/abilities";

const currentCharacter = new Character();

initializeNameStep(currentCharacter);
initializeSpeciesStep(currentCharacter);
initializeClassStep(currentCharacter);
initializeAbilities(currentCharacter);

console.log("D&D Character Builder Loaded");
console.log("Current Character:", currentCharacter);