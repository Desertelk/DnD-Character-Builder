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