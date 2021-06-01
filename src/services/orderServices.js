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
export const  getStoreDataList = async (filters) => {
    console.log(Axiosconfig.config);
    const list = await axios.get( Axiosconfig.main + 'store',Axiosconfig.config
        ).catch(HttpException.create);
    return list.data;
}
export const  getRateList = async (filters) => {
    console.log(Axiosconfig.config);
    const list = await axios.get( Axiosconfig.main + 'ratecard',Axiosconfig.config
        ).catch(HttpException.create);
    return list.data;
}
export const  getMotherCategoryList = async (filters) => {
    console.log(Axiosconfig.config);
    const list = await axios.get( Axiosconfig.main + 'mc',Axiosconfig.config
        ).catch(HttpException.create);
    return list.data;
}
