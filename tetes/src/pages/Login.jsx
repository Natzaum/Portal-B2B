import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // TODO: chamar sua API de autenticação
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <header className="login-header">
          <h2>Login</h2>
          <p>Faça o login!</p>
        </header>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <div className="form-actions">
            <label className="remember">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
              />
              <span>Lembrar minha senha</span>
            </label>

            <Link className="link-inline" to="/recuperar-senha">
              Esqueceu a senha?
            </Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <footer className="login-footer">
          <span>Não tem conta?</span>
          <Link className="link-inline" to="/registrar">
            Crie uma
          </Link>
        </footer>
      </div>
    </div>
  );
}
