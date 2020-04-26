import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');


  useEffect(() => {
    getCustomers();
  }, [])

  const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  }

  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type':'application/json'
          },      
        }
      )
      .then(_ => getCustomers())
      .then(_ => {
        setMsg('Customer deleted');
        setOpen(true);
      })
      .catch(err => console.error(err))
    }
  }

  const addCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers',
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(customer)
      }
    )  
    .then(_ => getCustomers())
    .then(_ => {
      setMsg('New customer added');
      setOpen(true);
    })
    .catch(err => console.error(err))  
  }

  const updateCustomer = (link,customer) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(customer)
    }
    )
    .then(_ => getCustomers())
    .then(_ => {
      setMsg('Customer updated');
      setOpen(true);
    })
    .catch(err => console.error(err));
  }

  const handleClose = () => {
    setOpen(false);
  }

  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstname'
    },
    {
      Header: 'Last Name',
      accessor: 'lastname'
    },    
    {
      Header: 'Street address',
      accessor: 'streetaddress'
    }, 
    {
      Header: 'Postcode',
      accessor: 'postcode'
    },    
    {
      Header: 'City',
      accessor: 'city'
    },
    {
      Header: 'E-mail',
      accessor: 'email'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    {
      Cell: row => (<Editcustomer customer={row.original} updateCustomer={updateCustomer} />)
    },
    {
      accessor: 'links[0].href',
      filterable: false,
      sortable: false,
      minWidth: 60,
      Cell: row => (<Button color="secondary" size="small" onClick={() => deleteCustomer(row.value)}>Delete</Button>)
    }
    
    ,
    {
      Cell: row => (<Addtraining customer={row.original.links[0]}>Add Customer</Addtraining>)
    }
  
  ]

  return(
    <div>
      <Addcustomer addCustomer={addCustomer}/>
      <ReactTable filterable={true} defaultPageSize={10} 
        data={customers} columns={columns} />
      <Snackbar open={open} autoHideDuration={3000} 
        onClose={handleClose} message={msg} />
    </div>
  )
}