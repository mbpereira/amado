import React from 'react'

import success from '../assets/img/success.svg'
import error from '../assets/img/error.svg'
import warning from '../assets/img/warning.svg'

function Title(props) {
  switch (props.type) {
    case 'success':
      return (
        <div>
          <strong>Sucesso!</strong>
          <img src={success} width="32" height="32" />
        </div>
      )
    case 'danger':
        return (
          <div>
            <strong>Erro!</strong>
            <img src={error} width="32" height="32" />
          </div>
        )
    default: 
      return (
        <div>
          <strong>Cuidado!</strong>
          <img src={warning} width="32" height="32" />
        </div>
      )
  }
}

export default function Dialog(props) {
  return (
    <div className={`dialog shadow border border-${props.type} ${props.isOpen ? 'show' : ''}`}>
      <div className="dialog-header d-flex justify-content-between">
        <Title type={props.type} />
        <button 
          type="button"
          className="close" 
          aria-label="Close"
          onClick={props.onClose} >
          &times;
        </button>
      </div>
      <div className="dialog-body">
        <p>{props.children}</p>
      </div>
    </div>
  )
}