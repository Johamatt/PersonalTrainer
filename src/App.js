
import './App.css';
import Customerlist from './components/Customerlist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Traininglist from './components/Traininglist';
import Addcustomer from './components/Addcustomer';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import PeopleIcon from '@material-ui/icons/People';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Demoapp from './components/Kalenteri';


import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Layout, Menu,Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, PlusOutlined  } from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


function App() {

  return (
<Router>
    <Layout>
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
        <PeopleIcon />&nbsp;
           Customers
          <Link to="/Customerlist" />
        </Menu.Item>
        <Menu.Item key="2">
        <SportsHandballIcon/>
          <span>Trainings</span>
          <Link to="/Traininglist" />
        </Menu.Item>
        <Menu.Item key="3">
          <CalendarTodayIcon />&nbsp;
          Calendar
          <Link to="/Calendar" />
        </Menu.Item>
      </Menu>
    </Header>

      

      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
    
      <Route exact path="/" component={Customerlist} />
     
      <Route path="/Customerlist" component={Customerlist} />
              <Route path="/Traininglist" component={Traininglist} />
              <Route path="/Calendar" component={Demoapp} />
              
      </Content>

      <Layout>

      </Layout>


    
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
</Router>


  );
}

export default App;
