import React,{useState, useEffect, useRef} from 'react'
import Card from './Card/Card';
function ContentRowCards(){

    const [cantProductos, setCantProductosList] = useState([]);
    const [cantAgentes, setCantAgenteList] = useState([]);
    const [cantUsers, setCantUsersList] = useState([]);

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



    return(
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
    )
}

export default ContentRowCards