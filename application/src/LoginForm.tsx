import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {GetOrganisations} from './ApiCalls/GetOrganisations'
import {GetUserByName} from './ApiCalls/GetUserByName'

export default function LoginForm(props : any) {
  const [open, setOpen] = React.useState(false);

  const [searchEntryByName , setSearchEntryByName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="inherit">
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="name"
            fullWidth
            onChange={(e : any) => setSearchEntryByName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e : any) => { /*props.setLoggedIn(true);*/handleClose();props.retrieveUserByName(searchEntryByName); }} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}