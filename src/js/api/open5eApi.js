const BASE_URL = "https://api.open5e.com/v2";

// Fetch data from Open5e and handle unsuccesful API responses
async function fetchOpen5eData(endpoint) {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    
    if(!response.ok) {
        throw new Error(`Open5e API error: ${response.status}`);
    }

    return response.json();
}

export async function getOpen5eSpellsByClass(characterClass) {

    // Convert the selected class into the format required by the Open5e API
    const classKey = `srd_${characterClass.toLowerCase()}`;

    let endpoint = `spells/?classes__key=${encodeURIComponent(classKey)}`;
    const allSpells = [];

    // Fetch every page of results so the complete spell list is available
    while (endpoint) {
        const data = await fetchOpen5eData(endpoint);
        allSpells.push(...data.results);

        endpoint = data.next 
            ? new URL(data.next).pathname.replace("/v2/", "") +
            new URL (data.next).search 
            : null;
    }

    return allSpells;
}