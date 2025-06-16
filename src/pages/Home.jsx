import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Logo"
          className="home-logo"
        />
        <h1>Bem-vindo ao ConnectTi!</h1>
        <p>
          Conecte profissionais de TI e empresas em um só lugar.<br />
          Encontre oportunidades, publique vagas e faça networking!
        </p>
        <div className="home-actions">
          <a href="/cadastro" className="home-btn">Cadastre-se</a>
          <a href="/login" className="home-btn home-btn-outline">Entrar</a>
        </div>
      </div>
    </div>
  );
}

export default Home;