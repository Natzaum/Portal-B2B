import { useState } from 'react'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    if (!usuario || !senha) {
      setErro('Preencha usuário e senha.')
      return
    }

    // TODO: chamar sua API aqui (ex: api.post('/login', { usuario, senha }))
    console.log({ usuario, senha })
    alert('Login enviado! (implementar chamada à API)')
  }

  return (
    <div style={{ maxWidth: 360, margin: '40px auto' }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <label>Usuário</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />

        {erro && <p style={{ color: 'tomato', marginTop: 0 }}>{erro}</p>}

        <button type="submit" style={{ width: '100%', padding: 10 }}>Entrar</button>
      </form>
    </div>
  )
}
