import React from "react";
import {useNavigate} from "react-router-dom";

const Error = () => {
    let navigator = useNavigate();
    return(
        <div>
            <h1>Xəta baş verdi</h1>
                <button className='btn btn-info' onClick={() => {navigator('/')}}>Ana səyfəyə qayıt</button>
        </div>
    )
}

export default Error;