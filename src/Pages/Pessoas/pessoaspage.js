import React from "react";
import './pessoaspage.css';
import LogoImage from '../../Images/Assinatura principal - negativa.png';
import { Link } from "react-router-dom";

function PessoasPage() {
    return(
<div className="container-pessoas">
  <img className="logo-pessoas" src={LogoImage} alt="Logo da empresa" />
  <div className="btn-container-pessoas">
    <div className="btn-pessoas">
      <Link to="/Certificadohrs" className="btn-text-pessoas">
        Certificados
      </Link>
    </div>
    <div className="btn-pessoas">
      <Link to="/" className="btn-text-pessoas">
        Voltar
      </Link>
    </div>
  </div>
</div>

  );
}

export default PessoasPage;

