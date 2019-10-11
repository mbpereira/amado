import React from 'react'

export default function ButtonPrimary(props) {
    return (
        <button type={props.type} onClick={props.onClick} className={"btn amado-btn " + (props.className || '') }>
            <span className="w-100">{props.children}</span>
        </button>
    )
}