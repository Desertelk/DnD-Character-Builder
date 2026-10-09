const BASE_URL = "https://api.open5e.com/v2";

async function fetchOpen5eData(endpoint) {
    const response = await fetch(`${BASE_URL}/${endpoint}`)
    
    if(!response.ok) {
        throw new Error(`Open5e API error: ${response.status}`)
    }

    return response.json();
}

export async function getOpen5eSpecies() {
    const data = await fetchOpen5eData("species");
    return data.results;
}

export async function getOpen5eSpells() {
    const data = await fetchOpen5eData("spells");
    return data.results;
}

export async function getOpen5eSpellsByClass(characterClass) {
    const classKey = `srd_${characterClass.toLowerCase()}`;

    let endpoint = `spells/?classes__key=${encodeURIComponent(classKey)}`;
    const allSpells = [];

    while (endpoint) {
        const data = await fetchOpen5eData(endpoint);
        allSpells.push(...data.results);

        endpoint = data.next ? new URL(data.next).pathname.replace("/v2/", "") +
            new URL (data.next).search : null;
    }

    return allSpells;

    // const response = await fetch(`https://api.open5e.com/v2/spells/?classes__key=${encodeURIComponent(classKey)}`);

    // if (!response.ok) {
    //     throw new Error(`Open5e API error: ${response.status}`);
    // }

    // const data = await response.json();
    // return data.results;
}