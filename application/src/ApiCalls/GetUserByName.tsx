import {GetOrganisations} from '../ApiCalls/GetOrganisations'



const urlBeginning = 'http://localhost:3001/organisation/getuserbyname/';




export async function GetUserByName(name: any) {

    const response = await GetOrganisations();
    const jsonResults = await response.json();
    console.log(jsonResults);

    
    console.log(`${urlBeginning}${jsonResults[0]._id.toString()}`);
    return fetch(`${urlBeginning}${jsonResults[0]._id.toString()}`, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
    },

    body: JSON.stringify({
    name: name.toString()

     })    
    })
    
}