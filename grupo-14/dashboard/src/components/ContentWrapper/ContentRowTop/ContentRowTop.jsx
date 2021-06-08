import React,{useState, useEffect, useRef} from 'react'
import ContentRowCards from './ContentRowCards/ContentRowCards'
import BarriosConteiner from './BarriosConteiner/BarriosConteiner'
import TableContainer from './TableContainer/TableContainer'
import ContentUltimoProducto from './ContentUltimoProducto/ContentUltimoProducto'

function ContentRowTop() {
    

    return (
        <div>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>

                {/* <!-- Content Row Movies--> */}
                <ContentRowCards/>
                {/* <!-- End movies in Data Base --> */}


                {/* <!-- Content Row Last Movie in Data Base --> */}
                <div className="row">
                    {/* <!-- Last Movie in DB --> */}
                    <ContentUltimoProducto/>
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
