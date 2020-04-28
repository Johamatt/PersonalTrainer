import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Edittraining from './Edittraining';
import Addtraining from './Addtraining';
import moment from 'moment';

import { Table, Tag } from 'antd';
import 'antd/dist/antd.css';

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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => { return a.date.localeCompare(b.date)},
      
      render: (date) => 
        <div>{moment(date).calendar()}</div>,
    }, 
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => a.duration - b.duration,
    },    
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
      
      sorter: (a, b) => { return a.activity.localeCompare(b.activity)},
    },
    
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      sorter: (a, b) => {return a.customer.firstname.localeCompare(b.customer.firstname)},
      
      render: (customer) => 
        <div>
          <span> {customer.firstname} <span>
          </span> {customer.lastname} </span>
        </div>,
       
      
    }
    

    ,    
       /*
    {
      render: row => (<Edittraining training={row.original} updateTraining={updateTraining} />)
    }
 
    ,
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
      <Table 
        dataSource={trainings} columns={columns} />
      <Snackbar open={open} autoHideDuration={3000} 
        onClose={handleClose} message={msg} />
    </div>
  )
}

/* <Addtraining addTraining={addTraining}/> */