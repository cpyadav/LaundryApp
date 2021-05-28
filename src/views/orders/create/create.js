import React,{ useEffect,useState } from "react"
import {fetchDataList} from '../../../services/orderServices'
import './orderstyle.css';
import {useListData} from "../../../hooks/useOrderData";
const UserList =()=>{
    let filters = { }
    const [userData,setUserData] = useState([]);
    //const {isLoading, hasData, data, errorMessage} = useListData(filters, ['', '']);
const HandleSearch = (event)=>{
    if(event.target.value && event.target.value.length>=3){
        const result = fetchDataList(event.target.value, ['', '']).then(res=>{
            setUserData(res.data);
        })
       
    }
}

    return(
        <React.Fragment>
            <div className="col-md-10 text-right col-sm-9">
            <div className="col-12 brand-module mb-4 mt-5 ">
                    <table id="customers">
                         <tr>
                            <td><input type="text" name="search" className="form-search" placeholder="sear by name" onChange={HandleSearch} ></input></td>                           
                        </tr>
                        </table>

                        </div>
            </div>
            <div className="col-12 brand-module mb-4 mt-5 ">
                <div className="col-12 brand-module mb-4 mt-5 ">
                    <table id="customers">
                        <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                      {userData && userData.map((res,index)=> <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                            <td>Germany</td>
                        </tr>)}
                        
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserList;    