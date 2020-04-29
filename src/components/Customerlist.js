import React, { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';
import { Table, Button, Input, Select, } from 'antd';
import 'antd/dist/antd.css';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';


import Highlighter from 'react-highlight-words'
import { SearchOutlined, UserAddOutlined, } from '@ant-design/icons';





export default function Customerlist() {
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
    if (window.confirm('Are you sure?')) {
      fetch(customer,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
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

  const updateCustomer = (link, customer) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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
      sorter: (a, b) => { return a.firstname.localeCompare(b.firstname) },
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
      sorter: (a, b) => { return a.lastname.localeCompare(b.lastname) },
    },
    {
      title: 'Street address',
      dataIndex: 'streetaddress',
      key: 'streetaddress',
      sorter: (a, b) => { return a.streetaddress.localeCompare(b.streetaddress) },
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
      sorter: (a, b) => { return a.city.localeCompare(b.city) },
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => { return a.email.localeCompare(b.email) },
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


/*
  const [select, setSelect] = useState('Select Column');
  const [value, setValue] = useState('');
  const filterColumn = ['firstName', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone']
  class Filter extends React.Component {
    state = {
      column: filterColumn,
    };
    handleProvinceChange = value => {
      setSelect(value);
      this.setState({
        column: filterColumn[value],
      });
    };
    render() {

      const { column } = this.state;
      return (
        <>
          <Input.Group>
            <Select
              value={select}
              style={{ width: 120 }}
              onChange={this.handleProvinceChange}
            >
              {filterColumn.map(column => (
                <Option key={column}>{column}</Option>
              ))}
            </Select>
            {column.map(column => (
              <Option key={column} >{column}</Option>
            ))}
            <Input
              disabled={select == ''} // disable search when column not selected  
              style={{ width: 250 }}
              placeholder="Search"
              value={value}

              onChange={e => {


                const currValue = e.target.value;
                setValue(currValue);
                const filteredData = customers.filter(entry =>

                  entry[select].includes(currValue)               // <--- selected sisältää joko firstname, lastname, postcode jne...
                );
                setCustomers(filteredData);
                if (customers.length == 0 || currValue == "") {
                  getCustomers();
                }
              }}>

            </Input>
          </Input.Group>
        </>
      );
    }
  }
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
        title: 'First name',
        
        dataIndex: 'firstname',
        key: 'firstname',
        width: '30%',
        ...this.getColumnSearchProps('firstname'),
        sorter: (a, b) => { return a.firstname.localeCompare(b.firstname) }
      },
      {
        title: 'Last name',
        dataIndex: 'lastname',
        key: 'lastname',
        width: '20%',
        ...this.getColumnSearchProps('lastname'),
        sorter: (a, b) => { return a.lastname.localeCompare(b.lastname) }
      },
      {
        title: 'Street address',
        dataIndex: 'streetaddress',
        key: 'streetaddress',
        ...this.getColumnSearchProps('streetaddress'),
        sorter: (a, b) => { return a.streetaddress.localeCompare(b.streetaddress) },
      },
      {
        title: 'Postcode',
        dataIndex: 'postcode',
        key: 'postcode',
        ...this.getColumnSearchProps('postcode'),
        sorter: (a, b) => a.postcode - b.postcode,
      },

      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        ...this.getColumnSearchProps('city'),
        sorter: (a, b) => { return a.city.localeCompare(b.city) },
      },

      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        ...this.getColumnSearchProps('email'),
        sorter: (a, b) => { return a.email.localeCompare(b.email) },
      },

      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        ...this.getColumnSearchProps('phone'),
        sorter: (a, b) => { return a.phone.localeCompare(b.phone) },
      },

      {
        title: 'Operations',
        colSpan: 3,
        render: (row) => (<Addtraining customer={row}/>)  
      },     
      {
        render: (row) => (<Editcustomer customer={row} updateCustomer={updateCustomer} />)
      },
      {
        render: (row) => (<Button type="primary" danger shape='round' size='small' onClick={() => deleteCustomer(row.links[0].href)}>Delete</Button>)
        
      },
      
    ];

    return <Table columns={columns} dataSource={customers} bordered />;
  }
}


  return (

    <div>
      <Addcustomer addCustomer={addCustomer}/>
      
      <FilterTable></FilterTable>
      <Snackbar open={open} autoHideDuration={3000}
        onClose={handleClose} message={msg} />
    </div>
  )
}


