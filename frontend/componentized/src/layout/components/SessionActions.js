import React from 'react'

export default function SessionActions(props) {
  const { sessionInfo, onLogout } = props
  if (!sessionInfo) {
    return (
      <div className="session-actions">
        <span>Não conectado. <a href="/login">Entrar</a> ou <a href="/register">Cadastrar</a>!</span>
      </div>
    )
  }

  return (
    <div className="session-actions">
      <span className="d-block mb-2">Bem vindo(a), {sessionInfo.name}!</span>
      <a className="action" href="/profile">Minha conta</a>
      <button onClick={onLogout} className="action btn">Sair</button>
    </div>
  )
}