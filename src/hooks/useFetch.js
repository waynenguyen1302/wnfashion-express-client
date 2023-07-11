import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await makeRequest.get(url);
        // console.log("Response:", response); // Log the entire response object
        setData(response.data);
      } catch (error) {
        setError(error.message);
        console.log("Error:", error.message); // Log the error object
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
  }, [url]); 
  // console.log("Data:", data); // Log the data state
  return { data, loading, error };
  
};

export default useFetch;