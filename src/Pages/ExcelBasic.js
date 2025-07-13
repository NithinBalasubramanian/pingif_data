import React, { useEffect, useState } from "react";
import ListHeaders from "../Componet/ExcelBasic/ListHeaders";
import UploadFile from "../Componet/ExcelBasic/UploadFile";
import SelectedColumnDisplay from "../Componet/ExcelBasic/SelectedColumnDisplay";

const ExcelBasic = () => {

    // /filesource/refsource/bios.csv eference url place as initial to get data

    const [fileUrl, setFileUrl] = useState("");
    const [selectedHeaders, setSelectedHeaders] = useState([])

    useEffect(() => {
        if (fileUrl === '') {
            setSelectedHeaders([])
        }
    }, [fileUrl])

    return (
        <div className="app">
            <div className="appContainer">
                <UploadFile setFileUrl={ setFileUrl } />
                {fileUrl && fileUrl !== '' && (
                    <>
                        <ListHeaders fileUrl={ fileUrl } selectedHeaders={ selectedHeaders } setSelectedHeaders={ setSelectedHeaders } />
                        <SelectedColumnDisplay fileUrl={ fileUrl } selectedHeaders={ selectedHeaders } />
                    </>
                )}
            </div>
        </div>
    )
}

export default ExcelBasic