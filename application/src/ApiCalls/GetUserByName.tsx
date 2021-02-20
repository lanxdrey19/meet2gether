
const urlBeginning = 'http://localhost:3001/organisation/getuserbyname/';



export async function GetAisleByName(props : any) {


    
    console.log(`${urlBeginning}${props._id}`);
    return fetch(`${urlBeginning}${props._id}`, {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },

    body: JSON.stringify({
    name: props.name.toString()

     })    
    })
    
}