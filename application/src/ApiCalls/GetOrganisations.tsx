const urlBeginning = 'https://meet2gether.herokuapp.com/organisation/';



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