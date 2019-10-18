import React from 'react'

export default function WrapperContent(props) {
  const { className, title, children, ...rest } = props
  return (
    <div {...rest} className={`section-padding-100 wrapper-content ${className || ''}`}>
      <div className="container-fluid">
        <div className={"section-title mt-50"}>
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  )
}