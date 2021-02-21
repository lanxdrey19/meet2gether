import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ChangeNameForm from './ChangeNameForm';
import CreateAccount from './CreateAccount';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createEventId } from './EventId'
import MemberCalendar from './MemberCalendar'
import TeamCalendar from './TeamCalendar'
import LoginBtn from './LoginBtn'
import LoginForm from './LoginForm'
import {GetOrganisations} from './ApiCalls/GetOrganisations'
import {GetUserByName} from './ApiCalls/GetUserByName'
import {CreateUser} from './ApiCalls/CreateUser'
import {AddEvent} from './ApiCalls/AddEvent'
import {DeleteEvent} from './ApiCalls/DeleteEvent'
import DataInitialiser from './DataInitialiser';
import OrgInitialiser from './OrgInitialiser';
function App() {

const [currentUser, setCurrentUser ] = useState(DataInitialiser);
const [currentOrg, setCurrentOrg ] = useState(OrgInitialiser);

const retrieveUserByName = async (query : any) => {

  
  const response = await GetUserByName(query);
  




  if (response.status > 300) {

    alert('User can not be found...');


  } else {
  const jsonResults = await response.json();
  setCurrentUser(jsonResults);
  setLoggedIn(true);
  const response2 = await GetOrganisations();
  const jsonResults2 = await response2.json();

  setCurrentOrg(jsonResults2[0]);

  }

  

}

const createUser = async (query : any) => {

  
  console.log(query)
  
  const response = await CreateUser(query);

  if (response.status > 300) {

    alert('Creation of user failed');


  } else {
 

  alert('Creation of user was successful, please log in');

  }

  

}

  const handleDateSelect = async (selectInfo : any) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() 

    if (title) {
      calendarApi.addEvent({
      
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })

      
      var currentUserId = currentUser._id;
      
      const response = await AddEvent(selectInfo.startStr,selectInfo.endStr, currentUserId ,title);

      if (response.status > 300) {

        alert('Creation of event failed');
    
    
      } else {
     
    
      alert('Creation of event was successful');

    
      }


    }
  }

  const handleEventClick = async (clickInfo : any) => {

  if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`))
  {
    clickInfo.event.remove();

    
    const response = await DeleteEvent(currentUser._id,clickInfo.event._def.extendedProps._id);

    if (response.status > 300) {




    const userDetails = await GetUserByName(currentUser.name);
      const userJson = await userDetails.json();
      setCurrentUser(userJson);

      alert('Deletion of event failed');
  
  
    } else {
   
  
    alert('Deletion of event was successful');

    const organisationDetails = await GetOrganisations();
    const organisationDetailJson = await organisationDetails.json();
    setCurrentOrg(organisationDetailJson[0]);

    const userDetails = await GetUserByName(currentUser.name);
      const userJson = await userDetails.json();
      setCurrentUser(userJson);

    
    }
    
    

  }

  }

  const handleEventMouseEnter = (mouseEnterInfo : any) => {

    
    mouseEnterInfo.event.setProp('backgroundColor', '#DA0700');
    mouseEnterInfo.event.setProp('borderColor', '#DA0700');
    
  }


  const handleEventDrop = (eventDropInfo: any) => {
    
    
    eventDropInfo.event.setProp('backgroundColor', '#5300AF');
    eventDropInfo.event.setProp('borderColor', '#5300AF');
    
  }

  const handleEventDragStart = (info : any) => {
    
    info.event.setProp('backgroundColor', '#5300AF');
    info.event.setProp('borderColor', '#5300AF');
    
  }

  const handleEventDragStop = (info : any) => {
    
    info.event.setProp('backgroundColor', '#5300AF');
    info.event.setProp('borderColor', '#5300AF');
    
  }

  const handleEventMouseLeave = (mouseEnterInfo : any) => {
    
    
    mouseEnterInfo.event.setProp('backgroundColor', '#5300AF');
    mouseEnterInfo.event.setProp('borderColor', '#5300AF');
    
  }

  const [myCal, setMyCal ] = useState(false);
  const [loggedIn, setLoggedIn ] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateCalendar = async (info : any) => {
    if (info === true) {

      const organisationDetails = await GetOrganisations();
    const organisationDetailJson = await organisationDetails.json();
    setCurrentOrg(organisationDetailJson[0]);
  

    } else {

      const userDetails = await GetUserByName(currentUser.name);
      const userJson = await userDetails.json();
      setCurrentUser(userJson);

    }
  };

  return (
    <div className="App">
      <AppBar position="static">
  <Toolbar style={{ background: '#5300AF' }}>
    {!loggedIn ? 
    
    (<IconButton disabled edge="start" color="inherit" aria-label="menu" onClick={handleClick} aria-haspopup="true" aria-controls="simple-menu" ><MenuOutlinedIcon /></IconButton>) 
    : 
    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick} aria-haspopup="true" aria-controls="simple-menu" ><MenuOutlinedIcon /></IconButton>}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >

        <MenuItem onClick={(e : any) => { setLoggedIn(false);handleClose(); }} >Logout</MenuItem>
  
      </Menu>
    
    <Typography variant="h6" style={{ marginRight: "auto" }} >
      Meet2Gether
    </Typography>
    {loggedIn ? (<Button variant="outlined" onClick={(e : any) => {setMyCal(true);updateCalendar(myCal); }} color="inherit" style={{ marginRight: "10%" }}>My Calendar</Button>) 
    : <Button disabled variant="outlined" onClick={(e : any) => {setMyCal(true);updateCalendar(myCal); }} color="inherit" style={{ marginRight: "10%" }}>My Calendar</Button>} 

      {loggedIn ? (<Button variant="outlined" onClick={(e : any) => {setMyCal(false);updateCalendar(myCal); }} color="inherit" style={{ marginRight: "30%" }}>Team Calendar</Button>) 
      : <Button disabled variant="outlined" onClick={(e : any) => {setMyCal(false);updateCalendar(myCal); }} color="inherit" style={{ marginRight: "30%" }}>Team Calendar</Button>}
    
    {loggedIn ? 
    (<div><h4 style={{ margin: "auto" }} className='title'>Welcome {currentUser.name}</h4></div>) : <div><LoginForm setLoggedIn={setLoggedIn} retrieveUserByName={retrieveUserByName} /></div> }
  </Toolbar>
</AppBar>


{ myCal && loggedIn ? (
  <div>
    
    <MemberCalendar handleDateSelect={handleDateSelect}
        handleEventClick={handleEventClick}
        handleEventMouseEnter={handleEventMouseEnter}
        handleEventMouseLeave={handleEventMouseLeave}
        handleEventDragStart={handleEventDragStart}
        handleEventDragStop={handleEventDragStop}
        handleEventDrop={handleEventDrop}
        currentUserEvents={currentUser.events}/>
                
        </div>

            ) :  !myCal && loggedIn ? ( 
              <div>
                
             <TeamCalendar currentOrgEvents={currentOrg.orgEvents}/>

          </div>
          ) :<div> <h2 className='title'>You must be logged in to view the contents</h2><CreateAccount createUser={createUser}/></div>}
  
    </div>
  );

  
}

export default App;
