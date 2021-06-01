import React,{ useEffect,useState } from "react"
import {fetchDataList} from '../../../services/orderServices'
import './orderstyle.css';
import {useListData} from "../../../hooks/useOrderData";
const OrderForm =(props)=>{ 
    let filters = { }
    const [userData,setUserData] = useState([]);
    const [orderStatus,setOrderStatus] = useState(true);

    //const {isLoading, hasData, data, errorMessage} = useListData(filters, ['', '']);
const HandleSearch = (event)=>{
    if(event.target.value && event.target.value.length>=3){
       fetchDataList(event.target.value, ['', '']).then(res=>{
            setUserData(res.data);
            console.log(res.data)
        })
       
    }
}
  
    return(
        <React.Fragment>
            <div className="container">
                <form id="contact" action="" method="post">
                    <h3>Create Order</h3>
                    <fieldset>
                    <label>Age:</label>
                        <input type="radio" id="under_13" value="under_13" name="user_age"></input><label for="under_13" className="light">Under 13</label>
                        <input type="radio" id="over_13" value="over_13" name="user_age"></input><label for="over_13" className="light">Over 13</label>
                    </fieldset>
                    <fieldset>
                        <input placeholder="Your name" type="text" tabindex="1" required autofocus></input>
                    </fieldset>
                    <fieldset>
                        <input placeholder="Your Email Address" type="email" tabindex="2" required></input>
                    </fieldset>
                    {/* <fieldset>
                        <input placeholder="Your Phone Number (optional)" type="tel" tabindex="3" required></input>
                      </fieldset>
                        <fieldset>
                            <input placeholder="Your Web Site (optional)" type="url" tabindex="4" required></input>
                        </fieldset>
                        <fieldset>
                            <textarea placeholder="Type your message here...." tabindex="5" required></textarea>
                        </fieldset> */}
                        <fieldset>
                            <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                        </fieldset>
  </form>
</div>
        </React.Fragment>
    )
}

export default OrderForm;    