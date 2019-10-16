import React from 'react'
import FooterBusiness from './FooterBusiness'
import FooterMenu from './FooterMenu'

export default function Footer(){
    return (
        <footer className="footer_area clearfix">
            <div className="container">
                <div className="row align-items-center">
                    <FooterBusiness />
                    <FooterMenu />
                </div>
            </div>
        </footer>
    )
}