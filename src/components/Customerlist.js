import React, { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';
import { Table, Button, Input, Select, } from 'antd';
import 'antd/dist/antd.css';
import 'antd/dist/antd.css';


import Highlighter from 'react-highlighter'
import { SearchOutlined } from '@ant-design/icons';





export default function Customerlist()  {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');


  const { Option } = Select;

  useEffect(() => {
    getCustomers();
  }, [])

  const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  }

  const deleteCustomer = (customer) => {
    console.log(customer)

    if (window.confirm('Are you sure?')) {
      fetch(customer, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type':'application/json'
          },    
          body: JSON.stringify(customer)  
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
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
      sorter: (a, b) => { return a.firstname.localeCompare(b.firstname)},
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
      sorter: (a, b) => { return a.lastname.localeCompare(b.lastname)},
    },    
    {
      title: 'Street address',
      dataIndex: 'streetaddress',
      key: 'streetaddress',
      sorter: (a, b) => { return a.streetaddress.localeCompare(b.streetaddress)},
    },
    {
      title: 'Postcode',
      dataIndex: 'postcode',
      key: 'postcode',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.postcode - b.postcode,
    },    
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => { return a.city.localeCompare(b.city)},
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => { return a.email.localeCompare(b.email)},
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    /*
    {
      render: (row) => (<Editcustomer customer={row} updateCustomer={updateCustomer} />)
    },
    
    {
      render: (row) => (<Button type="primary" danger onClick={() => deleteCustomer(row.links[0].href)}>Delete</Button>)
    },
    
    {
      render: (row) => (<Addtraining customer={row} >Add Training</Addtraining>)
    },
    */
  ] 




  const [select, setSelect] = useState('');
  const [value, setValue] = useState('');
  const filterColumn = ['firstname', 'lastname','streetaddress', 'postcode', 'city', 'email', 'phone' ]
  class Filter extends React.Component {
    
    state = {
      column: filterColumn,
    };

    handleProvinceChange = value => {
      setSelect(value);
      console.log(value)

      this.setState({
        cities: filterColumn[value],
      });
    };

    render() {
      const { column } = this.state;
      return (
        <>
          <Select
            defaultValue="Select Column"
            style={{ width: 120 }}
            onChange={this.handleProvinceChange}
          >
            {filterColumn.map(province => (
              
            <Option key={province}>{province}</Option>
            ))}
          </Select>        
            {column.map(column => (
              <Option key={column}></Option>         
            ))}

      <Input
      style={{width: 250}}
      placeholder="Search"
      value={value}
      onChange={e => {
        
        
        const currValue = e.target.value;
        setValue(currValue);
        console.log(customers)
        const filteredData = customers.filter(entry =>
          
          entry[select].includes(currValue)               // <--- selected sisältää joko firstname, lastname, postcode jne...
        );
        setCustomers(filteredData);
        if (customers.length == 0 || currValue == "") {
          getCustomers();
        }
      }}>
       
      </Input>
        </>
      );

      
    }
  }






  
  return(

    <div>
      <Filter></Filter>
      
      
      
      <Table 
        dataSource={customers} columns={columns} />
      <Snackbar open={open} autoHideDuration={3000} 
        onClose={handleClose} message={msg} />
    </div>
  )
}


// <Addcustomer addCustomer={addCustomer}/>