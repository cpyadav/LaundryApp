import React,{ useEffect,useState } from "react"
import {fetchDataList} from '../../../services/orderServices'
import './orderstyle.css';
import {useListData,StoreList,RateCardList,MotherCategoryList} from "../../../hooks/useOrderData";
//import {createorder} from '../create/createorder'
const UserList =()=>{
    let filters = { }
    const [userData,setUserData] = useState([]);
    const [orderStatus,setOrderStatus] = useState(true);
    const [orderData,setOrderata] = useState([]);
    const [quickorderStatus,setquickorderStatus] = useState(false);
    const [selectedStore,setselectedStore] = useState(2000);
    const [rateCardData,setRateCardData] = useState([]);
    const [motherCategories,setmotherCategories] = useState([]);

    //const {isLoading, hasData, data, errorMessage} = useListData(filters, ['', '']);
    const {isLoading, hasData, storedata, errorMessage} = StoreList(filters, ['', '']);
    const {ratecard} = RateCardList(filters, ['', '']);
    const {mclist} = MotherCategoryList(filters, ['', '']);

const HandleSearch = (event)=>{
    if(event.target.value && event.target.value.length>=3){
           fetchDataList(event.target.value, ['', '']).then(res=>{
            setUserData(res.data);
        })
    }
}
    const createOrder = (res) => {
        setOrderata(res);
        setOrderStatus(false)
        setquickorderStatus(true);
        console.log(res);
    }
    const handleStore = (store,index) => {
        console.log(ratecard)
        setselectedStore(index)
        if(store && store.ratecardOffline){
            var filtered = ratecard.filter(function(item) {
                return store.ratecardOffline.indexOf(item._id) !== -1;
            });
            setRateCardData(filtered)
            console.log(filtered);
        }
    }
    const handleRateCardChange = (event) => {
        console.log(mclist)
        var selectedratecard = event.target[event.target.selectedIndex].getAttribute('data-order')
        var card = JSON.parse(selectedratecard)
        var mcids = uniqueBy(card.rateCardServices, "mcId");
        if(mcids && mcids.length>0){
            var filtered = mclist.mc.filter(function(item) {
                return mcids.indexOf(item._id) !== -1;
            });
        }
       setmotherCategories(filtered)
        console.log('mother category++++++++'+filtered);
    }
    const uniqueBy = (arr, prop)=>{
        return arr.reduce((a, d) => {
          if (!a.includes(d[prop])) { a.push(d[prop]); }
          return a;
        }, []);
      }
      
  //  mccatgory
    return(
        <React.Fragment>
         {/* <createorder props={orderData} /> */}
{ quickorderStatus ?
    <div className="container">
                <form id="contact" action="" method="post">
                    <h3>Create Order</h3>
                    <fieldset>
                    <label>CHOSE SCHEDULE TYPE:</label>
                         <input type="radio" id="under_13" value="regular" name="schedule_type"></input><label for="under_13" className="light"> Regular</label>
                         <input type="radio" id="over_13" value="express" name="schedule_type"></input><label for="over_13" className="light"> Express</label>
                    </fieldset>
                    <fieldset>
                    <label>CHOSE ADDRESS:</label>
                        { 
                           orderData && orderData.address && orderData.address.length>0
                           ? 
                           orderData.address.map((addr,key)=>
                           <div><input  type="radio" name="address" value={addr._id} ></input> {addr.addr2 +' '+ addr.pincode}</div>
                            ) :''
                        }
                    <a href={'/customers?custId='+orderData._id}>Add Address</a>    
                    </fieldset>

                    <fieldset>
                        <ul className="hublist">
                            {storedata && storedata.store && storedata.store.length ?
                            storedata.store.map((str,index)=>
                            <li key={index}>
                               <a href="javascript:void(0)" className={(selectedStore ==index) ? 'hubClk msofficelink-link-handled active' :'hubClk msofficelink-link-handled' } onClick={()=>handleStore(str,index)} >{str.storeName+' ('+str.storeCode+')'}</a>
                            </li> ): ''}
                        </ul>
                    </fieldset>
                    <fieldset>
                    {rateCardData && rateCardData.length>0 ? 
                      <span><label>SELECT RATE CARD:</label>
                        <select name="rateCard" className="listdrop drpstyle" onChange={handleRateCardChange}>
                        <option key="s" value="">Select rate card</option>
                        {rateCardData.map((rtcard,index)=>
                            <option key={index} data-order={JSON.stringify(rtcard)} value={rtcard._id}>{rtcard.rateCardName}</option>
                            )}
                        </select>
                        </span>
                         : ''}
                    </fieldset>
                    
                    <fieldset>
                    {motherCategories && motherCategories.length>0 ? 
                      <span><label>SELECT MOTHER CATEGORY:</label>
                        <select name="rateCard" className="listdrop drpstyle">
                        <option key="s" value="">Select mother catgory</option>
                        {motherCategories.map((mcat,index)=>
                            <option key={index}  value={mcat._id}>{mcat.mcName}</option>
                            )}
                        </select>
                        </span>
                         : ''}
                    </fieldset>
                    <fieldset>
                            <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                     </fieldset>
  </form>
</div>
:''
}






        { orderStatus ? <div> <div className="col-md-10 text-right col-sm-9">
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
                            <td>{res.firstName +' '+res.lastName}</td>
                            <td>{res.mobileNumber }</td>
                            <td>{(res.address && res.address.length>0 ? 
                               res.address[0].addr2 +' '+ res.address[0].pincode
                                :'NA') }</td>
                            <td><input type="button" onClick={()=>createOrder(res)} value="Create Order"></input></td>
                        </tr>)}
                        
                    </table>
                </div>
            </div></div>  :'' }
        </React.Fragment>
    )
}

export default UserList;    