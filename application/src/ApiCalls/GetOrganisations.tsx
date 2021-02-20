const urlBeginning = 'http://localhost:3001/organisation/';



export async function GetOrganisations() {


    
    console.log(`${urlBeginning}`);
    return fetch(`${urlBeginning}`);
    
}