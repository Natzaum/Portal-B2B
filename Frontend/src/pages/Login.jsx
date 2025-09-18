export default function Login() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Digite seu email" />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" placeholder="Digite sua senha" />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
