import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
//import { INITIAL_EVENTS, createEventId } from './event-utils'

function App() {

  const handleDateClick = (arg : any) => { // bind with an arrow function
    alert(arg.dateStr)
  }

  return (
    <div className="App">
      <AppBar position="static">
  <Toolbar style={{ background: '#5300AF' }}>
    <IconButton edge="start" color="inherit" aria-label="menu">
      <MenuOutlinedIcon />
    </IconButton>
    <Typography variant="h6" style={{ marginLeft: 50 }}>
      Meet2Gether
    </Typography>
    <Button color="inherit" style={{ marginLeft: 50 }}>My Calendar</Button>
    <Button color="inherit" style={{ marginLeft: 50 }}>Team Calendar</Button>
    <Button color="inherit" style={{ marginLeft: 800 }}>Login</Button>
  </Toolbar>
</AppBar>
<br></br>
      <FullCalendar
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
  );

  
}

export default App;
