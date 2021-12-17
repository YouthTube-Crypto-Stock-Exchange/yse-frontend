import { useEffect, useState } from "react";

function Trade({ searchValue }){
    const [pageFound,setPageFound] = useState(false);

    useEffect( ()=>{
        let path= 'http://localhost:4000/doesChannelExist/'+searchValue;
        fetch(path)
            .then(response => response.json())
            .then(data => {
                if(data.channelFound) setPageFound(true);
                else setPageFound(false);
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