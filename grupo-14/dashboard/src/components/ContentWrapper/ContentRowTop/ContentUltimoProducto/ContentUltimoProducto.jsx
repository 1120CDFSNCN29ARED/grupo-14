import React, { useState, useEffect, useRef } from 'react'

function ContentUltimoProducto() {
    
    const [ultimoProducto, setUltimoProducto] = useState([]);
    
    useEffect(() => {
        async function fetchProductos() {
            const ultimoProductoApi = await fetch(`http://localhost:3001/api/ultimoProducto`);
            const ultimoProductoJson = await ultimoProductoApi.json();
            setUltimoProducto(ultimoProductoJson)
        }
        fetchProductos();
    }, [])
    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo inmueble agregado en Data Base</h5>
                </div>
                <div className="card-body">
                    <b style={{ fontSize: '30px' }} >{ultimoProducto.name}</b>
                    <div className="text-center">
                        <img src={`http://localhost:3001/img/${ultimoProducto.image}`} className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} alt="foto-inmueble" />
                    </div>

                    <p>Direccion: {ultimoProducto.direccion}</p>
                    <p>Barrio: {ultimoProducto.barrio}</p>
                    <p>Descripcion de la publicacion: {ultimoProducto.descripcion}</p>
                    <b>Precio: {ultimoProducto.precio}</b>
                </div>
            </div>
        </div>
        )
    }

export default ContentUltimoProducto