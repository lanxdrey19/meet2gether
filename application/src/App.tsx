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

function App() {

const [currentUser, setCurrentUser ] = useState();
const [currentOrg, setCurrentOrg ] = useState();
const retrieveUserByName = async (query : any) => {

  
  console.log(query)
  
  const response = await GetUserByName(query);
  




  if (response.status > 300) {

    alert('User can not be found...');


  } else {
  const jsonResults = await response.json();
  console.log(jsonResults);
  setCurrentUser(jsonResults);
  setLoggedIn(true);
  const response2 = await GetOrganisations();
  const jsonResults2 = await response2.json();
  setCurrentOrg(jsonResults2);

  }

  

}

  const handleDateSelect = (selectInfo : any) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() 

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  const handleEventClick = (clickInfo : any) => {

  if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`))
  {
    clickInfo.event.remove()
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
        <ChangeNameForm handleClose={handleClose}/>
        <MenuItem onClick={(e : any) => { setLoggedIn(false);handleClose(); }} >Logout</MenuItem>
  
      </Menu>
    
    <Typography variant="h6" style={{ marginRight: "auto" }} >
      Meet2Gether
    </Typography>
    <Button onClick={(e : any) => setMyCal(true)} color="inherit" style={{ marginRight: "10%" }}>My Calendar</Button>
    <Button onClick={(e : any) => setMyCal(false)} color="inherit" style={{ marginRight: "30%" }}>Team Calendar</Button>
    {loggedIn ? 
    (<div><h4 style={{ margin: "auto" }} className='title'>Welcome User</h4></div>) : <div><LoginForm setLoggedIn={setLoggedIn} retrieveUserByName={retrieveUserByName} /></div> }
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
        handleEventDrop={handleEventDrop}/>
                
        </div>

            ) :  !myCal && loggedIn ? ( 
              <div>
             <TeamCalendar/>

          </div>
          ) :<div> <h2 className='title'>You must be logged in to view the contents</h2><CreateAccount/></div>}
  
    </div>
  );

  
}

export default App;
