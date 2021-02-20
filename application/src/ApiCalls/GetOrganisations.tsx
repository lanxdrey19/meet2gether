const urlBeginning = 'http://localhost:3001/organisation/';



export async function GetOrganisations() {


    
    return fetch(`${urlBeginning}`, {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        },
     
        })
    
}