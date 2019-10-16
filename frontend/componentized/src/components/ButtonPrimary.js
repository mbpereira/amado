import React from 'react'

export default function ButtonPrimary(props) {
    const { children, className, ...rest } = props
    return (
        <button {...rest} className={`btn amado-btn ${className}`}>
            <span className="w-100">{children}</span>
        </button>
    )
}