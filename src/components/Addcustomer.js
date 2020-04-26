import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addcustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({firstname: '', lastname: '', streetaddress: '', city: '', postcode: '', email: '', phone: ''});

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    props.addCustomer(customer);
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const inputChanged = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  }

  return(
    <div>
      <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add customer
      </Button>
      <Dialog open={open} disableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            label="First Name"
            fullWidth
          />
          <TextField
            margin="dense"
            id="lastname"
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            label="Last Name"
            fullWidth
          />
          <TextField
            margin="dense"
            id="streetaddress"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            label="Color"
            fullWidth
          />
          <TextField
            margin="dense"
            id="postcode"
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            label="Post Code"
            fullWidth
          />
          <TextField
            margin="dense"
            id="city"
            name="city"
            value={customer.city}
            onChange={inputChanged}
            label="City"
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            value={customer.email}
            onChange={inputChanged}
            label="E-Mail"
            fullWidth
          />
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            label="Phone"
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