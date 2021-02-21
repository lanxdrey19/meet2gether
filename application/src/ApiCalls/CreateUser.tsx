import {GetOrganisations} from '../ApiCalls/GetOrganisations'



const urlBeginning = 'https://meet2gether.herokuapp.com/organisation/addmember/';




export async function CreateUser(name: any) {

    const response = await GetOrganisations();
    const jsonResults = await response.json();
    console.log(jsonResults);

    
    console.log(`${urlBeginning}${jsonResults[0]._id.toString()}`);
    return fetch(`${urlBeginning}${jsonResults[0]._id.toString()}`, {
    method: 'PATCH',
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