import {useEffect, useState} from "react";

const useFetch = (fetchFunction) => {
    const [data, setData] = useState(false);
    const [hasData, setHasData] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [error, setError] = useState(null);

    function fetchDataEnhanced() {
        setIsLoading(true);
        fetchFunction.apply(null, arguments)
            .then(response => {
                setData(response);
            })
            .catch(err => {
                console.error(err)
                setErrorMessage(err.message);
                setError(err);
                setData(null);
            });
    }

    useEffect(() => {

        if (data !== false) {
            const hasData = (Array.isArray(data) && data.length > 0) || (!Array.isArray(data) && data);
            if (hasData) {
                setErrorMessage(null);
                setHasData(true);
            } else {
                setHasData(false);
            }
            setIsLoading(false);
        }
    }, [data])

    return {
        isLoading,
        data, fetchData: fetchDataEnhanced,
        errorMessage, error,
        hasData
    };
}
export default useFetch;
