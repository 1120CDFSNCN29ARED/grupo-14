import React,{useState, useEffect, useRef} from 'react'


function TableContent(props){
    let text;
    if(props.reservado){
        text = 'si';
    }else{
        text = 'no';
    }
    return(
        <tr>
                    <td>{props.name}</td>
                    <td>{props.precio}</td>
                    <td>{props.superficieCubierta}</td>
                    <td>{props.ambientes}</td>
                    <td>{props.barrio}</td>
                    <td>{text}</td>
                </tr>
    )
}

export default TableContent