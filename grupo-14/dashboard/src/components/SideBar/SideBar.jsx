import React from 'react'
import {BrowserRouter,Link, Route, Switch} from 'react-router-dom';
import ContentRowCards from '../ContentWrapper/ContentRowTop/ContentRowCards/ContentRowCards';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import BarriosInDb from '../ContentWrapper/ContentRowTop/BarriosConteiner/BarriosConteiner';
import TableContainer from '../ContentWrapper/ContentRowTop/TableContainer/TableContainer'
function SideBar(){
    return(
        <React.Fragment>
        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

			<hr className="sidebar-divider my-0"/>

                   
			<li className="nav-item active">
                        <Link className="nav-link" to="/">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard - Prop Tech</span></Link>
                    </li>

                  
			<hr className="sidebar-divider"/>

                   
			<div className="sidebar-heading">Actions</div>

			<li className="nav-item">
                            <Link className="nav-link collapsed" to="/BarriosInDb">
                                <i className="fas fa-fw fa-folder"></i>
                                <span>Barrios</span>
                            </Link>
                        </li>

           
			<li className="nav-item">
                            <Link className="nav-link" to="/ContentRowCards">
                                <i className="fas fa-fw fa-chart-area"></i>
                                <span>Charts</span></Link>
                        </li>

                   
			<li className="nav-item">
                            <Link className="nav-link" to="/table">
                                <i className="fas fa-fw fa-table"></i>
                                <span>Tables</span></Link>
                        </li>

			<hr className="sidebar-divider d-none d-md-block"/>
		</ul>
          
        </React.Fragment>
    )
}

export default SideBar