import React from 'react'

export default function WrapperContent(props){
    const { className, title, children, ...rest } = props
    return (
        <div {...rest} className={`section-padding-100 flex-shrink-1 flex-grow-1 ${className || ''}`}>
            <div className="container-fluid">
                <div className={"section-title mt-50"}>
                    <h2>{title}</h2>
                </div>
                {children}
            </div>

        </div>
    )
}