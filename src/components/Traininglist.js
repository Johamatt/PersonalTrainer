import React, { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';
import { Table, Button, Input, Select } from 'antd';
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styled from 'styled-components';

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

  const deleteTraining = (id) => {
    console.log(id)
    if (window.confirm('Are you sure?')) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, 
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

  const Container = styled.div`
  text-align: center;
  `;
/*
    ,
    {
      accessor: 'links[0].href',
      filterable: false,
      sortable: false,
      minWidth: 60,
      Cell: row => (<Button color="secondary" size="small" onClick={() => deleteTraining(row.value)}>Delete</Button>)
    }  
  ]
*/


  class FilterTable extends React.Component {
    state = {
      searchText: '',
      searchedColumn: '',
    };
  
    getColumnSearchProps = dataIndex => ({
      
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
              
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => 
      
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),        
      onFilterDropdownVisibleChange: visible => {
        
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#f2a130', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
            
          />
        ) : (
          text
        ),
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };

    render() {
      
      const columns = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          width: '30%',
          ...this.getColumnSearchProps('date'),
          sorter: (a, b) => { return a.date.localeCompare(b.date) },
          render: (date) => 
          <div>{moment(date).format('lll')}</div>,
        },
        {
          title: 'Duration',
          dataIndex: 'duration',
          key: 'duration',
          width: '20%',
          ...this.getColumnSearchProps('duration'),
          sorter: (a, b) => { return a.duration - b.duration }
        },
        {
          title: 'Activity',
          dataIndex: 'activity',
          key: 'activity',
          ...this.getColumnSearchProps('activity'),
          sorter: (a, b) => { return a.activity.localeCompare(b.activity) },
        },

        {        
          title: 'Customer',
          dataIndex: 'customer',
          key: 'customer',
          ...this.getColumnSearchProps('customer'),
          sorter: (a, b) => {return a.customer.firstname.localeCompare(b.customer.firstname)},
          render: (customer) => 
          <>
            <span> {customer.firstname} {customer.lastname} </span>  
          </>,
        },
        {
          title: 'Operations',
          colSpan: 2,
          render: (row) => (<Container><Button type="primary" danger shape='round' size='small' onClick={() => deleteTraining(row.id)}>Delete</Button></Container>)
        }
      ];
      return <Table columns={columns} dataSource={trainings} bordered/>;
    }
  }






        
  































  return(
    <div>
      <FilterTable></FilterTable>
      <Snackbar open={open} autoHideDuration={3000} 
        onClose={handleClose} message={msg} />
    </div>
  )
}

// <Addtraining addTraining={addTraining}/> */