import { useState, useEffect } from "react";

const useAllData = (apiLink) => {
    const [ error, setError ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch(apiLink, { mode: "cors" })
            .then((response) => response.json())
            .then((response) => setData(response))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [apiLink])

    return { error, loading, data };
}

export default useAllData;