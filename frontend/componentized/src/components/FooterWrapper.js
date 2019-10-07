import React from 'react'

export default function FooterWrapper(props){
    return (
        <div className={props.className}>
            <div className="single_widget_area">
                {props.children}
            </div>
        </div>
    )
}