import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
      <nav style={{ display: 'flex', gap: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}
