import React, { useEffect, useState } from "react"
import axiosInstance from "../../Api/AxiosInstance";

const SelectedColumnDisplay = ({ fileUrl, selectedHeaders }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        if (selectedHeaders.length > 0) {
            handleGenerateData()
        }
    }, [selectedHeaders])

    const handleGenerateData = async () => {
        try {
            const payload = {
                "file_url": fileUrl,
                "headers": selectedHeaders,
                "count": 20
            }

            const { data } = await axiosInstance.post("/fetchDataBasedOnArrayOfHeader", payload);
            setData(data.data)
        }
        catch {
            console.log("error")
        }
    }
    
    return (
        <div>
            <h3>Columns Selected</h3>
            {/* {selectedHeaders && selectedHeaders.length > 0 && selectedHeaders.map((itm) => {
                return( <div>{itm}</div> )
            })} */}
            <div>
                <button onClick={handleGenerateData}>Generate New Excel</button> <span>Note: New excel will be created with new columns selected</span>
            </div>

            <div>
                <table>
                    <tr>
                        {selectedHeaders && selectedHeaders.length > 0 && selectedHeaders.map((itm) => (
                            <th>{ itm }</th>
                        ))}
                    </tr>
                        {data && data.length > 0 && data.map((itm) => (

                        <tr>
                            {selectedHeaders.map((header_column) => (
                                <td>{ itm[`${header_column}`]}</td>
                            ))
                            }
                        </tr>))}
                </table>
            </div>
        </div>
    )
}

export default SelectedColumnDisplay