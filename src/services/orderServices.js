import axios from "axios";
import HttpException from './exceptions/HttpException';
import Axiosconfig from  '../Axios/AxiosConfig'
const API_URL ='';


export const  fetchDataList = async (filters) => {
    console.log(Axiosconfig.config);
    const list = await axios.get( Axiosconfig.main + 'customer/?name='+filters,Axiosconfig.config
        ).catch(HttpException.create);
    return list.data;
}