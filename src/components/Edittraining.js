import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';



export default function Edittraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({date: '', activity: '', duration: '', customer: ''});

  const handleClickOpen = () => {
    setTraining({date: props.training.date, activity: props.training.activity, duration: props.training.duration,
      customer: props.training.customer});
    setOpen(true);
  }

  const handleClose = () => {
    props.updateTraining(props.training.links[0].href, training)
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
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} disableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit existing content</DialogTitle>
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
            label="duration"
            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>    
    </div>
  )
}