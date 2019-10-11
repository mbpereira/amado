import React from 'react'

export default function Modal(props) {
    return (
        <div className={`modal fade ${props.isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="modal-label">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 
                            className="modal-title" 
                            id="modal-label">
                            {props.title}
                        </h5>
                        <button 
                            onClick={props.onClose} 
                            type="button"
                            className="close" 
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        <button 
                            onClick={props.onClose} 
                            type="button" 
                            className="btn btn-sm btn-danger">
                            Cancelar
                        </button>
                        <button 
                            onClick={props.onSwapCommit} 
                            type="button" 
                            className="btn custom-btn-primary btn-sm">
                            Alterar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}