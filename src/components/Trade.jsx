import { useEffect, useState } from "react";

function Trade({ searchValue }){
    const [pageFound,setPageFound] = useState(false);

    useEffect( ()=>{
        console.log("request sent");
        console.log(searchValue);
        let path= 'http://localhost:4000/doesChannelExist/'+searchValue;
        console.log(path);
        fetch(path)
            .then(response => response.json())
            .then(data => {
                if(data.channelFound) setPageFound(true);
            });
    },[searchValue])
    return ( <>
        { pageFound ? (
            <div>
                Trade page
            </div>
        ) : (
            <h2>
                Channel doesn't exists
                Please Try again
            </h2>
        )}
    </>);
}
export default Trade;