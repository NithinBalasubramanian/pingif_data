import React, { useEffect, useState } from "react"
import axiosInstance from "../../Api/AxiosInstance";
import styles from './style.module.css'

const SelectedColumnDisplay = ({ fileUrl, selectedHeaders }) => {

    const [data, setData] = useState([])
    const [generatedFile, setGeneratedFile] = useState("")

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

    const handleGenerateDataExcel = async () => {
        try {
            const payload = {
                "file_url": fileUrl,
                "headers": selectedHeaders,
                "count": 20
            }

            const response = await axiosInstance.post("/generateExcelByColumns", payload);
            setGeneratedFile(response.data.url ?? '')

        }
        catch {
            console.log("error")
        }
    }

    const downloadGeneratedFile = async () => {
        try {
            if (generatedFile === "") {
                return
            }

            const payload = {
                "file_url": "/filesource/refsource/uploaded/Updated_Lab_Location_as_on_Aug_2024.xlsx"
            }

            const response = await axiosInstance.post("/downloadCSV", payload);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Get the suggested filename from the Content-Disposition header if available
            // Otherwise, use the provided filename or a default
            const contentDisposition = response.headers.get('Content-Disposition');
            let effectiveFilename = "data.csv";
            if (contentDisposition && contentDisposition.includes('filename=')) {
                const filenameMatch = contentDisposition.match(/filename\*?=['"]?([^"';]+)['"]?/);
                if (filenameMatch && filenameMatch[1]) {
                    effectiveFilename = decodeURIComponent(filenameMatch[1]);
                }
            }
    
            const blob = await response.blob(); // Get the response as a Blob
    
            // Create a temporary URL for the blob
            const blobUrl = window.URL.createObjectURL(blob);
    
            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = effectiveFilename; // Set the filename for download
            document.body.appendChild(link); // Append to body to make it clickable
            link.click(); // Programmatically click the link to trigger download
            document.body.removeChild(link); // Clean up the temporary link
    
            window.URL.revokeObjectURL(blobUrl); // Release the object URL
        }
        catch {
            console.log("error")
        }
    }
    
    
    return (
        <div>
            <h3>Columns Selected</h3>
            {data && data.length > 0 && (
                <div>
                    <button onClick={handleGenerateDataExcel} className="customButton">Generate New Excel</button> 
                    <span className={styles.notes}> Note: New excel will be created with new columns selected</span>
                    {/* To do download file  */}
                    {/* <button onClick={downloadGeneratedFile} className="customButton">Download</button>  */}
                </div>
            )}
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
                                <td>{ itm[`${header_column}`] ? itm[`${header_column}`] : '-'}</td>
                            ))
                            }
                        </tr>))}
                </table>
            </div>
        </div>
    )
}

export default SelectedColumnDisplay