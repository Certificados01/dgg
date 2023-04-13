import React from 'react';
import './homepage.css';
import LogoImage from '../../Images/Assinatura principal - negativa.png';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
<div className="container-home">
  <img className="logo-home" src={LogoImage} alt="Logo da empresa" />
  <div className="btn-container-home">
    <div className="btn-home">
      <Link to="/Financeiro" className="btn-text-home">
        Financeiro
      </Link>
    </div>
    <div className="btn-home">
      <Link to="/Pessoas" className="btn-text-home">
        Pessoas
      </Link>
    </div>
  </div>
</div>

  );
}

export default HomePage;
