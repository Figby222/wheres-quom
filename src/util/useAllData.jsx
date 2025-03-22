import { useState, useEffect } from "react";

const useAllData = (apiLink) => {
    const [ error, setError ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch(apiLink, { mode: "cors", method: "POST" })
            .then(async (response) => {return { token: response.headers.get("authorization"), data: await response.json() } })
            .then((response) => setData({ ...response.data, authorization: response.token }))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [apiLink])

    return { error, loading, data };
}

export default useAllData;