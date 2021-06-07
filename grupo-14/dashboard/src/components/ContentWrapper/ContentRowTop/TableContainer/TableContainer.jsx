import React,{useState, useEffect, useRef} from 'react'
import TableContent from './TableContent/TableContent'

function TableContainer(){
    const [productos,setProductosList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    useEffect(()=>{
        async function fetchProductos(){
            const productosApi = await fetch(`http://localhost:3001/api/tablaDeProductos/${page}`);
            const productosJson = await productosApi.json();
            setProductosList(productosJson.propiedades);
            setTotalPages(productosJson.totalPages);
        }
        fetchProductos();
    },[page])

    const pageUp = ()=> {
        if(page<5){
            setPage(page+1)
        }
    }
    const pageDown = ()=> {
        if(page>1){
            setPage(page-1)
        }
    }
    return(
        <div className="card shadow mb-4">
            <p>Pagina <b>{page}</b> de <b>{totalPages}</b></p>
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
                        <div className = "tableBtn"> 
                        <span onClick={pageDown}>Anterior</span> 
                        <span>                                                                      </span>
                        <span onClick={pageUp}>Siguiente</span>
                    </div>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default TableContainer