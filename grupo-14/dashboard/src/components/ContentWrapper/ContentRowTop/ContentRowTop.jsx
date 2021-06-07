import React,{useState, useEffect, useRef} from 'react'
import ContentRowCards from './ContentRowCards/ContentRowCards'
import BarriosConteiner from './BarriosConteiner/BarriosConteiner'
import TableContainer from './TableContainer/TableContainer'


function ContentRowTop() {
    
    

    return (
        <div>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>

                {/* <!-- Content Row Movies--> */}
               
                {/* <!-- End movies in Data Base --> */}


                {/* <!-- Content Row Last Movie in Data Base --> */}
                <div className="row">
                    {/* <!-- Last Movie in DB --> */}
                    <div className="col-lg-6 mb-4">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h5 className="m-0 font-weight-bold text-gray-800">Ultimo inmueble agregado en Data Base</h5>
                            </div>
                            <div className="card-body">
                                <b style={{fontSize:'30px'}} >{ultimoProducto.name}</b>
                                <div className="text-center">
                                    <img src={`../../../../../site/public/img/${ultimoProducto.image}`} alt="foto-inmueble" />
                                </div>
                                
                                <p>Direccion: {ultimoProducto.direccion}</p>
                                <p>Barrio: {ultimoProducto.barrio}</p>
                                <p>Descripcion de la publicacion: {ultimoProducto.descripcion}</p>
                                <b>Precio: {ultimoProducto.precio}</b>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End content row last movie in Data Base --> */}

                    {/* <!-- Genres in DB --> */}
                    <BarriosConteiner/>
                </div>
            </div>
            <TableContainer/>
        </div>
    )
}

export default ContentRowTop
