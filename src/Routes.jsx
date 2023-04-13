import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import HomePage from "./Pages/Home/homepage";
import PessoasPage from "./Pages/Pessoas/pessoaspage";
import FinanceiroPage from "./Pages/Financeiro/financeiropage";
import CertificadoPage from "./Pages/Pessoas/Pages/certificadohrspage";

export const Rotas = () => {

    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="Pessoas" element={<PessoasPage/>} />
                <Route path="Financeiro" element={<FinanceiroPage/>} />
                <Route path="Certificadohrs" element={<CertificadoPage/>} />
            </Routes>
        </Router>
    )
}

