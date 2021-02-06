import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
//import { INITIAL_EVENTS, createEventId } from './event-utils'

function App() {

  const [myCal, setMyCal ] = useState(false);
  const [loggedIn, setLoggedIn ] = useState(false);

  const handleDateClick = (arg : any) => { // bind with an arrow function
    alert(arg.dateStr)
  }

  return (
    <div className="App">
      <AppBar position="static">
  <Toolbar style={{ background: '#5300AF' }}>
    <Typography variant="h6" style={{ marginRight: "auto" }} >
      Meet2Gether
    </Typography>
    <Button onClick={(e : any) => setMyCal(true)} color="inherit" style={{ marginRight: "10%" }}>My Calendar</Button>
    <Button onClick={(e : any) => setMyCal(false)} color="inherit" style={{ marginRight: "30%" }}>Team Calendar</Button>
    {loggedIn ? 
    (<div><h4 style={{ margin: "auto" }} className='title'>Welcome User</h4><Button onClick={(e : any) => setLoggedIn(false)} color="inherit" style={{ margin: "auto" }}>Logout</Button></div>) : <div><h4 style={{ margin: "auto" }} className='title'>Please Log In</h4><Button onClick={(e : any) => setLoggedIn(true)} color="inherit" style={{ margin: "auto" }}>Login</Button></div> }
  
  </Toolbar>
</AppBar>

{ myCal && loggedIn ? (
  <div>
      <h2 className='title'>My Calendar</h2>
            <FullCalendar
            height="auto"
        plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin ]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}

        />
        </div>

            ) :  !myCal && loggedIn ? ( 
              <div>
              <h2 className='title'>Team Calendar</h2>
            <FullCalendar
            height="auto"
            plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin ]}
            dateClick={handleDateClick}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            
          />
          </div>
          ) : <h2 className='title'>You must be logged in to view the contents</h2>}
  
    </div>
  );

  
}

export default App;
