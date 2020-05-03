
class Filter extends React.Component {
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
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
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
          title: 'firstname',
          dataIndex: 'firstname',
          key: 'firstname',
          width: '30%',
          ...this.getColumnSearchProps('firstname'),
          sorter: (a, b) => { return a.firstname.localeCompare(b.firstname) }
        },
        {
          title: 'lastname',
          dataIndex: 'lastname',
          key: 'lastname',
          width: '20%',
          ...this.getColumnSearchProps('lastname'),
          sorter: (a, b) => { return a.lastname.localeCompare(b.lastname) }
        },
        {
          title: 'streetaddress',
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
          title: 'city',
          dataIndex: 'city',
          key: 'city',
          ...this.getColumnSearchProps('city'),
          sorter: (a, b) => { return a.city.localeCompare(b.city) },
        },
  
        {
          title: 'email',
          dataIndex: 'email',
          key: 'email',
          ...this.getColumnSearchProps('email'),
          sorter: (a, b) => { return a.email.localeCompare(b.email) },
        },
  
        {
          title: 'phone',
          dataIndex: 'phone',
          key: 'phone',
          ...this.getColumnSearchProps('phone'),
          sorter: (a, b) => { return a.phone.localeCompare(b.phone) },
        },
  
  
      ];
      return <Table columns={columns} dataSource={customers} />;
    }
  }