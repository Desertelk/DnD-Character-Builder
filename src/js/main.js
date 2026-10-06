import Character from "./models/Character"
import { getClasses } from "./api/dndApi";
import { getOpen5eSpecies } from "./api/open5eApi";
import { initializeNameStep } from "./modules/characterBuilder";

const currentCharacter = new Character();

initializeNameStep(currentCharacter);

console.log("D&D Character Builder Loaded");
console.log(currentCharacter);