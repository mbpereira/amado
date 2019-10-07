import React from 'react'

export default function ShopPagination(){
    return (
        <div className="col-12">
            <nav aria-label="navigation">
                <ul className="pagination justify-content-end mt-50">
                    <li className="page-item active"><a className="page-link" href="#">01.</a></li>
                    <li className="page-item"><a className="page-link" href="#">02.</a></li>
                    <li className="page-item"><a className="page-link" href="#">03.</a></li>
                    <li className="page-item"><a className="page-link" href="#">04.</a></li>
                </ul>
            </nav>
        </div>
    )
}