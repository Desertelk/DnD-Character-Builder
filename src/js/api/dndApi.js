const BASE_URL = "https://www.dnd5eapi.co/api/2014";

async function fetchDndData(endpoint) {
    const response = await fetch(`${BASE_URL}/${endpoint}`);

    if(!response.ok) {
        throw new Error(`D&D API error: ${response.status}`);
    }

    return response.json();
}

export async function getClasses() {
    const data = await fetchDndData("classes");
    return data.results;
}

export async function getSpecies() {
    const data = await fetchDndData("races");
    return data.results;
}

export async function getEquipment() {
    const data = await fetchDndData("equipment");
    return data.results;
}

export async function getSpells() {
    const data = await fetchDndData("spells");
    return data.results;
}