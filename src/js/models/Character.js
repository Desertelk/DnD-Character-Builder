let characterName;
let characterClass;
let species;
let spells;

export default class Character {
    constructor(name = "") {
        this.name = name;
        this.species = null;
        this.characterClass = null;

        this.abilities = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };

        this.equipment = [];
        this.spells = [];
    }

    setName(name) {
        this.name = name.trim();
    }

    setSpecies(species) {
        this.species = species;
    }

    setClass(characterClass) {
        this.characterClass = characterClass;
    }

    setAbility(ability, score) {
        if (Object.hasOwn(this.abilities, ability)) {
            this.abilities[ability] = score;
        }
    }

    addEquipment(item) {
        this.equipment.push(item);
    }

    addSpell(spell) {
        this.spells.push(spell);
    }
}