import React,{useState, useEffect, useRef} from 'react'
import Card from '../Card/Card';
import BarriosInDb from './BarriosInDb/BarriosInDb'
import TableContainer from './TableContainer/TableContainer'


function ContentRowTop() {
    const [barrios, setBarriosList] = useState([]);
    const [cantProductos, setCantProductosList] = useState([]);
    const [cantAgentes, setCantAgenteList] = useState([]);
    const [cantUsers, setCantUsersList] = useState([]);
    const [ultimoProducto, setUltimoProductoList] = useState([]);
    useEffect(()=>{
        async function fetchBarrios(){
            const barriosApi = await fetch('http://localhost:3001/api/productosPorBarrio');
            const barriosJson = await barriosApi.json();
            setBarriosList(barriosJson.data);
        }
        fetchBarrios();
    },[]);
    useEffect(()=>{
        async function fetchProductos(){
            const productosApi = await fetch('http://localhost:3001/api/propiedades');
            const productosJson = await productosApi.json();
            setCantProductosList(productosJson);
        }
        fetchProductos();
    },[]);

    useEffect(()=>{
        async function fetchAgentes(){
            const agentesApi = await fetch('http://localhost:3001/api/agentes');
            const agentesJson = await agentesApi.json();
            setCantAgenteList(agentesJson);
        }
        fetchAgentes();
    },[]);

    useEffect(()=>{
        async function fetchUsers(){
            const usersApi = await fetch('http://localhost:3001/api/users');
            const usersJson = await usersApi.json();
            setCantUsersList(usersJson);
        }
        fetchUsers();
    },[]);
    useEffect(() => {
        async function fetchUltimoProducto() {
            const ultimoProductoApi = await fetch('http://localhost:3001/api/ultimoProducto');
            const ultimoProductoJson = await ultimoProductoApi.json();
            setUltimoProductoList(ultimoProductoJson.data);
        }
        fetchUltimoProducto();
    }, []);


    return (
        <div>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>

                {/* <!-- Content Row Movies--> */}
                <div className="row">

                    {/* <!-- Movies in Data Base --> */}
                    <Card 
                    title="Cantidad de propiedades"
                    color="primary"
                    value={cantProductos}
                    icon="fa-building"
                    />

                    {/* <!-- Total awards --> */}
                    <Card
                    title="Cantidad de agentes"
                    color="success"
                    value={cantAgentes}
                    icon="fa-male"
                    />

                    {/* <!-- Actors quantity --> */}
                    <Card
                    title="Cantidad de usuarios"
                    color="warning"
                    value={cantUsers}
                    icon="fa-user-circle"
                    />
                </div>
                {/* <!-- End movies in Data Base --> */}


                {/* <!-- Content Row Last Movie in Data Base --> */}
                <div className="row">
                    {/* <!-- Last Movie in DB --> */}
                    <div className="col-lg-6 mb-4">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h5 className="m-0 font-weight-bold text-gray-800">Last movie in Data Base</h5>
                            </div>
                            <div className="card-body">
                                <div className="text-center">
                                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "40rem;" }} src="assets/images/mandalorian.jpg" alt=" Star Wars - Mandalorian " />
                                </div>
                                <p value={ultimoProducto}></p>
                                <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End content row last movie in Data Base --> */}

                    {/* <!-- Genres in DB --> */}
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
                </div>
            </div>
            <TableContainer/>
        </div>
    )
}

export default ContentRowTop
