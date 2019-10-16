import React from 'react'

export default function CartTable(props){

    return (
        <div className="cart-table clearfix">
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    )
}