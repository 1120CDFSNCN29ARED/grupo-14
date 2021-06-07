import React,{useState, useEffect, useRef} from 'react'


function BarriosInDb(props){
    return(
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    {props.bar}
                </div>
            </div>
        </div>
    )
}


export default BarriosInDb