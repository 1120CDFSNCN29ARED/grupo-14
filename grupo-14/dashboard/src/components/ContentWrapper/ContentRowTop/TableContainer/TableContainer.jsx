import React,{useState, useEffect, useRef} from 'react'
import TableContent from './TableContent/TableContent'

function TableContainer(){
    const [productos,setProductosList] = useState([]);
    useEffect(()=>{
        async function fetchProductos(){
            const productosApi = await fetch('http://localhost:3001/api/tablaDeProductos');
            const productosJson = await productosApi.json();
            setProductosList(productosJson);
        }
        fetchProductos();
    },[])
    return(
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Metros Cuadrados</th>
                                <th>Ambientes</th>
                                <th>Barrio</th>
                                <th>Reservado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productos.map((producto,i)=>{
                                    return <TableContent {...producto} key = {`${producto.name}${i}`}/>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default TableContainer