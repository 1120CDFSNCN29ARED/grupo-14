import React,{useState, useEffect, useRef} from 'react'
import BarriosInDb from './BarriosInDb/BarriosInDb'

function BarriosConteiner(){
    const [barrios, setBarriosList] = useState([]);

    useEffect(()=>{
        async function fetchBarrios(){
            const barriosApi = await fetch('http://localhost:3001/api/productosPorBarrio');
            const barriosJson = await barriosApi.json();
            setBarriosList(barriosJson.data);
        }
        fetchBarrios();
    },[]);
    return(

        <div className="col-lg-6 mb-4">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h5 className="m-0 font-weight-bold text-gray-800">Barrios In Data Base</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {
                                        barrios.map((barrio,i)=>{
                                            return  <BarriosInDb bar={barrio} key = {i} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

    )
}

export default BarriosConteiner;