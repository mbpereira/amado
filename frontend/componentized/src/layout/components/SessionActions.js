import React from 'react'

export default function SessionActions(props) {
    const { sessionInfo, onLogout } = props
    if(!sessionInfo) {
        return (
            <div className="session-actions">
                <span>Não conectado. <a href="/login">Entrar!</a></span>
            </div>
        )
    }

    return (
        <div className="session-actions">
            <span className="d-block mb-2">Bem vindo(a), {sessionInfo.name}!</span>
            <a className="action" href="/">Minha conta</a>
            <button onClick={onLogout} className="action btn">Sair</button>
        </div>
    )
}