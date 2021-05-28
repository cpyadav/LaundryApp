import React from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import SideNav from '../SidebarNav/SidebarNav';
import Topbar from '../TopBar/TopBar';
import Login from '../views/Login/Login'

import Create_Cats from '../views/Master_Fields/categories/Create'
import Master_Items from '../views/Master_Fields/master_items/items'
import TimeSlots from '../views/Master_Fields/timeSlots/time'

import Ratecards from '../views/ratecards/Manage'

import Customers from '../views/customers/Manage'

import CreateStores from '../views/stores/create/CreateStore'
import ManageStores from '../views/stores/manage/Manage'
import TimeStores from '../views/stores/timeslots/time'

import CreateStaff from '../views/staffs/CreateStaff'
import ManageStaff from '../views/staffs/Manage'

import CreateOrder from '../views/orders/create/create'
import ManageOrder from '../views/orders/manage/Manage.jsx'

import Membership from '../views/memberships/Manage'

import Wallet from '../views/wallet/Manage'

import CreateCoupon from '../views/coupon/create/Create'
import ManageCoupon from '../views/coupon/manage/Manage'

import Dashboard from '../views/Dashboard/Dashboard'

import Setting from '../views/settings/settings'

import Pickup from '../views/pickup/pickups'

import Delivery from '../views/delivery/delivery'




import './final.css'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import theme from './theme'

export default function App() {
 
    
    if(JSON.parse(window.localStorage.getItem("auth_user")) !== null){

        return(
           <MuiThemeProvider theme = {theme}>


<Router>
        <div>
        
        <div id = "maincontent_scroll_comp" class = "mainContent_maindiv">
        <div  class = "mainContent_innerdiv">
        <Switch>
          <Route path="/categories"> <Create_Cats /> </Route>
          <Route path="/master_items"> <Master_Items /> </Route>
          <Route path="/ratecards"> <Ratecards /> </Route>
          <Route path="/customers"> <Customers /> </Route>
          <Route path="/stores/create"> <CreateStores /> </Route>
          <Route path="/stores/manage"> <ManageStores /> </Route>
          <Route path="/stores/timeslots"> <TimeStores /> </Route>

          

          <Route path="/staffs/create"> <CreateStaff /> </Route>
          <Route path="/staffs/update"> <CreateStaff /> </Route>
          <Route path="/staffs/manage"> <ManageStaff /> </Route>

          
          <Route path="/order/create"> <CreateOrder /> </Route>
          <Route path="/order/manage"> <ManageOrder /> </Route>
          <Route path="/Membership/manage"> <Membership /> </Route>

          <Route path="/Wallet/manage"> <Wallet /> </Route>

          <Route path="/Coupon/create"> <CreateCoupon /> </Route>
          <Route path="/Coupon/manage"> <ManageCoupon /> </Route>
          <Route path="/timeslots"> <TimeSlots /> </Route>


          <Route path="/settings"> <Setting /> </Route>

          <Route path="/pickups"> <Pickup /> </Route>

          <Route path="/drops"> <Delivery /> </Route>

          <Route path="/"> <Dashboard /> </Route>
          <Route path="/dahsboard"> <Dashboard /> </Route>
         

        </Switch>
        </div>
        </div>

        <SideNav/>
        <Topbar/>
       
        
        
        </div>


    </Router>

           </MuiThemeProvider>
        )

    }else{

        if(window.location.pathname !== "/login"){
            window.location.href = "/login"
        }

        return(
            <Login /> 
         )



    }

        

}


