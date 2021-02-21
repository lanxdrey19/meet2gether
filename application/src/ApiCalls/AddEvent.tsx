import {GetOrganisations} from '../ApiCalls/GetOrganisations'



const urlBeginning = 'https://meet2gether.herokuapp.com/organisation/addevent/';




export async function AddEvent(props: any,props2 : any, props3:any,props4:any) {

    const response = await GetOrganisations();
    const jsonResults = await response.json();

    return fetch(`${urlBeginning}${jsonResults[0]._id.toString()}`, {
    method: 'PATCH',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
    },

    

    body: JSON.stringify({
        memberId: props3.toString(),
        start: props.toString(),
        end: props2.toString(),
        title: props4.toString()
     })    
    })
    
}