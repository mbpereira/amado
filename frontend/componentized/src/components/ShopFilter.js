import React from 'react'

export default function ShopFilter(){
    return (
        <div className="col-12">
            <div className="product-topbar d-xl-flex align-items-end justify-content-between">
                <div className="total-products">
                    <p>Showing 1-8 0f 25</p>
                    <div className="view d-flex">
                        <a href="#"><i className="fa fa-th-large" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-bars" aria-hidden="true"></i></a>
                    </div>
                </div>
                <div className="product-sorting d-flex">
                    <div className="sort-by-date d-flex align-items-center mr-15">
                        <p>Sort by</p>
                        <form action="#" method="get">
                            <select name="select" id="sortBydate">
                                <option value="value">Date</option>
                                <option value="value">Newest</option>
                                <option value="value">Popular</option>
                            </select>
                        </form>
                    </div>
                    <div className="view-product d-flex align-items-center">
                        <p>View</p>
                        <form action="#" method="get">
                            <select name="select" id="viewProduct">
                                <option value="value">12</option>
                                <option value="value">24</option>
                                <option value="value">48</option>
                                <option value="value">96</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}