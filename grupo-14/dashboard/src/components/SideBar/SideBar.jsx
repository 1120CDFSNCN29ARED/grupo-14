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

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon">
                    <img className="w-100" src="assets/images/logo-DH.png" alt="Digital House"/>
				</div>
			</a>

           
			<hr className="sidebar-divider my-0"/>

                   
			<li className="nav-item active">
                        <Link className="nav-link" to="/">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard - DH movies</span></Link>
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
            <Switch>
                    <Route exact path="/">
                        
                    </Route>
                    <Route exact path="/BarriosInDb">
                        <BarriosInDb />
                    </Route>
                    <Route exact path="/ContentRowCards">
                        <ContentRowCards />
                    </Route>
                    <Route exact path="/table">
                        <TableContainer />
                    </Route>
            </Switch>
        </React.Fragment>
    )
}

export default SideBar