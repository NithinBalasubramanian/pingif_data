import React, { useEffect, useState } from "react";
import axiosInstance from "../../Api/AxiosInstance";
import styles from './style.module.css'

const ListHeaders = ({fileUrl, selectedHeaders, setSelectedHeaders}) => {

    const [headerData, setHeaderData] = useState([]);
    
    useEffect(() => {
        if (fileUrl !== '') {
            fetchHeader();
        } 
    }, [fileUrl])

    const fetchHeader = async () => {
        try {
            const payload = {
                "file_url": fileUrl
            }

            const { data } = await axiosInstance.post("/fetchHeaderColumnsFromFile", payload);
            setHeaderData(data.data);
        }
        catch {
            console.log("error")
        }
    }

    const handleHeaderList = (header_column) => {
        let headerList = [...selectedHeaders];
        if (headerList.includes(header_column)) {
            headerList = headerList.filter((itm) => itm !== header_column);
        } else {
            headerList.push(header_column);
        }
        setSelectedHeaders(headerList);
    }

    return (
        <div>
            <h3>Headers List</h3>
            <div className={styles.headerList} >
                    {headerData.length > 0 && headerData.map((itm) => {
                        return <div className={selectedHeaders.includes(itm) ? styles.columnDispActive : styles.columnDisp} onClick={() => handleHeaderList(itm)}>{itm}{selectedHeaders.includes(itm) ? <span className={styles.removeIcon}>x</span> : <span className={styles.removeIcon}>+</span> }</div>
                    })}
            </div>
        </div>
    )
}

export default ListHeaders