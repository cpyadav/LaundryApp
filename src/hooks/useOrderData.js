import {useEffect} from "react";
import {fetchDataList} from "../services/orderServices";
import useFetch from "../services/useFetch";


const useListData = (filters = {}, deps = []) => {
    const {isLoading, data, fetchData, errorMessage, hasData} = useFetch(fetchDataList);

    useEffect(() => {
        fetchData(filters);
    }, deps);
    return {isLoading, data: data && data.data, errorMessage, hasData};

}


export {useListData}
