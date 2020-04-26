import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Edittraining from './Edittraining';
import Addtraining from './Addtraining';

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');


  useEffect(() => {
    getTrainings();
  }, [])

  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  const deleteTraining = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type':'application/json'
          },      
        }
      )
      .then(_ => getTrainings())
      .then(_ => {
        setMsg('Training deleted');
        setOpen(true);
      })
      .catch(err => console.error(err))
    }
  }

  const addTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings',
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(training)
      }
    )  
    .then(_ => getTrainings())
    .then(_ => {
      setMsg('New training added');
      setOpen(true);
    })
    .catch(err => console.error(err))  
  }

  const updateTraining = (link,training) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(training)
    }
    )
    .then(_ => getTrainings())
    .then(_ => {
      setMsg('Training updated');
      setOpen(true);
    })
    .catch(err => console.error(err));
  }

  const handleClose = () => {
    setOpen(false);
  }

  const columns = [
    {
      Header: 'Date',
      accessor: 'date'
    }, 
    {
      Header: 'Duration',
      accessor: 'duration'
    },    
    {
      Header: 'Activity',
      accessor: 'activity'
    },
    
    {
      Header: 'Customer',
      accessor: 'customer',
      Cell: row => {
        return (
          <div>
            <span className="class-for-firstname">{row.row.customer.firstname} </span>
            <span className="class-for-lastname">{row.row.customer.lastname}</span>
          </div>
        )
      }
      
    }
    /*
    ,    
    {
      Cell: row => (<Edittraining training={row.original} updateTraining={updateTraining} />)
    },
    {
      accessor: 'links[0].href',
      filterable: false,
      sortable: false,
      minWidth: 60,
      Cell: row => (<Button color="secondary" size="small" onClick={() => deleteTraining(row.value)}>Delete</Button>)
    }  
    */
  ]

  return(
    <div>
      

      <ReactTable filterable={true} defaultPageSize={10} 
        data={trainings} columns={columns} />
      <Snackbar open={open} autoHideDuration={3000} 
        onClose={handleClose} message={msg} />
    </div>
  )
}

/* <Addtraining addTraining={addTraining}/> */