import React from 'react'
import Topbar from "./Topbar/topbar"
import ContentRowTop from "./ContentRowTop/ContentRowTop"
import Footer from "./Footer/Footer"
import {BrowserRouter,Link, Route, Switch} from 'react-router-dom';
import ContentRowCards from './ContentRowTop/ContentRowCards/ContentRowCards';
import BarriosInDb from './ContentRowTop/BarriosConteiner/BarriosConteiner';
import TableContainer from './ContentRowTop/TableContainer/TableContainer'

function ContentWrapper() {
    return (
      <React.Fragment>
        <Switch>
                    <Route exact path="/">
                    <div id="content-wrapper" className="d-flex flex-column">
                      {/* <!-- Main Content --> */}
                      <div id="content">
                          {/* <!-- Topbar --> */}
                      <Topbar />
                              {/* <!-- End of Topbar --> */}
                      {/* <!-- Content Row Top --> */}
                      <ContentRowTop />
                                  {/* <!--End Content Row Top--> */}
                      </div>
                              {/* <!-- End of MainContent --> */}
                      {/* <!-- Footer --> */}
                      <Footer />
                              {/* <!-- End of Footer --> */}
                              
                      </div>
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

export default ContentWrapper