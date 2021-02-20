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
import { createEventId } from './EventId';
import LoginForm from './LoginForm';


export default function LoginBtn(props : any) {

    

    return (
    <div>
    
    <Button onClick={(e : any) => props.setLoggedIn(true)} color="inherit" style={{ margin: "auto" }}>Login</Button>
    </div>


);

}