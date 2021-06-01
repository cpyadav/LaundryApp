import {useEffect} from "react";
import {fetchDataList,getStoreDataList,getRateList,getMotherCategoryList} from "../services/orderServices";
import useFetch from "../services/useFetch";


const useListData = (filters = {}, deps = []) => {
    const {isLoading, data, fetchData, errorMessage, hasData} = useFetch(fetchDataList);

    useEffect(() => {
        fetchData(filters);
    }, deps);
    return {isLoading, data: data && data.data, errorMessage, hasData};

}
const StoreList = (filters = {}, deps = []) => {
    const {isLoading, data, fetchData, errorMessage, hasData} = useFetch(getStoreDataList);

    useEffect(() => {
        fetchData(filters);
    }, deps);
    return {isLoading, storedata: data && data.data, errorMessage, hasData};

}
const RateCardList = (filters = {}, deps = []) => {
    const {isLoading, data, fetchData, errorMessage, hasData} = useFetch(getRateList);

    useEffect(() => {
        fetchData(filters);
    }, deps);
    return {isLoading, ratecard: data && data.data, errorMessage, hasData};

}
const MotherCategoryList = (filters = {}, deps = []) => {
    const {isLoading, data, fetchData, errorMessage, hasData} = useFetch(getMotherCategoryList);

    useEffect(() => {
        fetchData(filters);
    }, deps);
    return {isLoading, mclist: data && data.data, errorMessage, hasData};

}


export {useListData,StoreList,RateCardList,MotherCategoryList}
