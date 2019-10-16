import React from 'react'
import FooterWrapper from './FooterWrapper'

export default function FooterBusiness(){
    return (
        <FooterWrapper className="col-12 col-lg-4">
            <div className="single_widget_area">
                <div className="footer-logo mr-50">
                    <a href="index.html"><img src="img/core-img/logo2.png" alt="" /></a>
                </div>
                <p className="copywrite">
                    Copyright &copy;<script>document.write(new Date().getFullYear());</script> 
                    All rights reserved | This template is made with 
                    <i className="fa fa-heart-o" aria-hidden="true" rel="noopener noreferrer"></i> 
                    by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                </p>
            </div>
        </FooterWrapper>
    )
}