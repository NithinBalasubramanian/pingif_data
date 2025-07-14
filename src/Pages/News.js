import React, { useEffect, useState } from "react"


const News = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await fetch("http://api.mediastack.com/v1/news?access_key=8dac207b11663c2a0324f55f5038fdad").then(async(res) => {
            const response = await res.json();
            setData(response.data);
        })
    }

    return (
        <div style={{width: "80%", margin:"15px auto"}}>
            {data.length > 0 && data.map((itm) => {
                return(
                    <div style={{ padding:"20px 0px 40px 0px", borderBottom: "1px solid gray"}}>
                        <span style={{padding: "6px 14px", backgroundColor: "#00538a", color: "#fff", fontWeight: 600, textDecoration: "capitalize", margin:"10px 0px"}}>{itm.source}</span>
                        <h2 style={{lineHeight: "38px", marginBottom: "10px"}}>{itm.title}</h2>
                        {itm.image && (<img src={itm.image} width="auto" height="480px" />)}
                        <div style={{ margin: "20px 0px", lineHeight: "30px", textAlign: "justify"}}>{itm.description}</div>
                        <a href={itm.url} target="_blank" style={{ color: "#00538a", float: "left"}}>view more</a>
                    </div>
                )
            })}
        </div>
    )
}

export default News