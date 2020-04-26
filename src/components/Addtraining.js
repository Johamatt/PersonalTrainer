import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';

export default function Addtraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({date: '', activity: '', duration: '', customer: props.customer.href});

  const handleSubmit = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings',
      { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify(training) 
      }
    )
    .then(_ => {
        alert('Training added');
        setOpen(false);
      })
      .catch(err => console.error(err))  
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    console.log(props.addTraining);
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  }

  return(
    <div>
      <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} disableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            name="date"
            value={training.date}
            onChange={inputChanged}
            label="Date"
            fullWidth
          />
          <TextField
            margin="dense"
            id="activity"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
          />
          <TextField
            margin="dense"
            id="duration"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>    

    </div>
  )
}




