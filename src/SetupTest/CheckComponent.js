import React, { useEffect } from  "react";
import axios from "axios";

const CheckComponent = () => {

    useEffect(() => {
        fetchTestData()
    }, [])

    const fetchTestData = async () => {
        try {
            const payload = {
                "file_url": "/filesource/refsource/bios.csv",
                "field": "born_country",
                "search": "IND",
                "sub_field": "born_region"
            }

            const result = await axios.post("http://127.0.0.1:8000/api/fetchValuesOfColumSelected", payload);
            console.log("result", result)
        }
        catch {
            console.log("error")
        }
    }

    return (
        <h1>Test</h1>
    )
}

export default CheckComponent