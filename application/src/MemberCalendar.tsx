import React, {useState} from 'react';
import logo from './logo.svg';
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

export default function MemberCalendar(props : any) {

return (
<div>

<h2 className='title'>My Calendar</h2>
            <FullCalendar
            height="auto"
        plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin ]}
        droppable={true}
        //editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={props.handleDateSelect}
        eventClick={props.handleEventClick}
        eventMouseEnter={props.handleEventMouseEnter}
        eventMouseLeave={props.handleEventMouseLeave}
        eventDragStart={props.handleEventDragStart}
        eventDragStop={props.handleEventDragStop}
        eventDrop={props.handleEventDrop}
        eventBackgroundColor='#5300AF'
        eventBorderColor='#5300AF'
        events={props.currentUserEvents}
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