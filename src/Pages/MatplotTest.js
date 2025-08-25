import React, { useEffect, useState } from "react"
import axiosInstance from "../Api/AxiosInstance"
import axios from "axios";


const MatplotTest = () => {

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        fetchGraph()
    }, [])

    const fetchGraph = async () => {
        try {

            const response = await axios.get("http://127.0.0.1:8000/api/matplot",  {
            responseType: 'blob', // This is crucial for handling binary data
            });
             const blob = response.data;
            const url = URL.createObjectURL(blob);
        
            // Update the state with the new image URL
            setImageUrl(url);
        }
        catch {
            console.log("error")
        }
    }

    return (
        <div style={{width: "80%", margin:"15px auto"}}>
           <button onClick={fetchGraph}>Generate</button>
           { imageUrl && (
              <img 
                src={imageUrl} 
                alt="Bar chart generated from Django API" 
                style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc' }} 
            />
           )}
        </div>
    )
}

export default MatplotTest