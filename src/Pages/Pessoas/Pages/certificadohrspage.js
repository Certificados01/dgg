import React from "react";
import "./certificadohrspage.css";
import LogoImage from "../../../Images/Assinatura principal - negativa.png";
import { Link } from "react-router-dom";
import { pdf, Document, Page, Text, View, StyleSheet, Image} from "@react-pdf/renderer";
import { useState } from "react";
import Certificado from "../../../Images/Modelo certificado.png";
import Modal from "./Modal";
import axios from "axios";
import {saveAs} from "file-saver";

function CertificadoPage() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [mesEntrada, setMesEntrada] = useState("");
  const [mesSaida, setMesSaida] = useState("");
  const [categoria, setCategoria] = useState("");
  const [email, setEmail] = useState("");
  const [anoEntrada, setAnoEntrada] = useState("");
  const [anoSaida, setAnoSaida] = useState("");
  const [Horas, setHoras] = useState("");
  const [showPDF, setShowPDF] = useState(false);
  const [PDFUrl, setPDFUrl] = useState("");

  async function handleGeneratePDF() {
    const styles = StyleSheet.create({
      page: {
        orientation: 'landscape',
      },
      text: {
        fontSize: 22,
        textTransform: "uppercase",
        textAlign:"center"
      },
      image: {
        width: "100%",
        height: "100%",
      },
    });
    
    const doc = (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View>
            <Image src={Certificado} style={styles.image} />
            <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center',}}> 
              <Text style={[styles.text, { maxWidth:670}]}>
                CERTIFICA-SE QUE O MEMBRO {nomeCompleto} EXERCEU ATIVIDADE NA EMPRESA JÚNIOR CIMATEC jr NO PERÍODO ENTRE {mesEntrada} DE {anoEntrada} A {mesSaida} DE {anoSaida} NA QUALIDADE DE {categoria} COM A CARGA HORÁRIA EQUIVALENTE A {Horas} HORAS.
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  
      const blob = await pdf(doc).toBlob();
      setShowPDF(true);
      setPDFUrl(URL.createObjectURL(blob));
      }

      async function handleDownloadPDF() {
        const styles = StyleSheet.create({
          page: {
            orientation: 'landscape',
          },
          text: {
            fontSize: 22,
            textTransform: "uppercase",
            textAlign:"center"
          },
          image: {
            width: "100%",
            height: "100%",
          },
        });
      
        const doc = (
          <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
              <View>
                <Image src={Certificado} style={styles.image} />
                <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center',}}> 
                  <Text style={[styles.text, { maxWidth:670}]}>
                    CERTIFICA-SE QUE O MEMBRO {nomeCompleto} EXERCEU ATIVIDADE NA EMPRESA JÚNIOR CIMATEC jr NO PERÍODO ENTRE {mesEntrada} DE {anoEntrada} A {mesSaida} DE {anoSaida} NA QUALIDADE DE {categoria} COM A CARGA HORÁRIA EQUIVALENTE A {Horas} HORAS.
                  </Text>
                </View>
              </View>
            </Page>
          </Document>
        );
      
        const blob = await pdf(doc).toBlob();
        saveAs(blob, 'certificado.pdf');
      }

  function handleFormSubmit(event){
    event.preventDefault();
    console.log(nomeCompleto, email, PDFUrl);
    send(nomeCompleto, email, PDFUrl);
  }

  
  async function send() {

    const pdfBlob = await fetch(PDFUrl).then(res => res.blob());
    const pdfFile = new File([pdfBlob], `[${nomeCompleto}] Certificado.pdf`);

    const formData = new FormData();
    formData.append("nomeCompleto", nomeCompleto);
    formData.append("email", email);
    formData.append("pdf", pdfFile,);  

    axios.post("http://localhost:3030/send", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => alert(response.data))
    .catch(error => console.error(error));
  }
  
  

  const handleCloseModal = () => {
    setShowPDF(false);
  };

  return (
    <div className="container-certificado">
    <img
      className="logo-certificado"
      src={LogoImage}
      alt="Logo da empresa"
    />
    <div className="form-container">
      <form onSubmit={handleFormSubmit} className="form">
        <div className="form-field">
          <label htmlFor="nome-completo">Nome completo:</label>
          <input
            type="text"
            id="nome-completo"
            name="nome-completo"
            value={nomeCompleto}
            onChange={(event) => setNomeCompleto(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="mes-entrada">Mês de entrada:</label>
          <input
            type="text"
            id="mes-entrada"
            name="mes-entrada"
            value={mesEntrada}
            onChange={(event) => setMesEntrada(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="ano-entrada">Ano de Entrada:</label>
          <input
            type="text"
            id="ano-entrada"
            name="ano-entrada"
            value={anoEntrada}
            onChange={(event) => setAnoEntrada(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="mes-saida">Mês de saída:</label>
          <input
            type="text"
            id="mes-saida"
            name="mes-saida"
            value={mesSaida}
            onChange={(event) => setMesSaida(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="ano-saida">Ano de Saída:</label>
          <input
            type="text"
            id="ano-saida"
            name="ano-saida"
            value={anoSaida}
            onChange={(event) => setAnoSaida(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="categoria">Categoria:</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="categoria">Horas:</label>
          <input
            type="text"
            id="horas"
            name="horas"
            value={Horas}
            onChange={(event) => setHoras(event.target.value)}
          />
        </div>
        <div className="form-field remove">
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <button
  type="button"
  className="btn-certificado"
  onClick={handleGeneratePDF}
>
  Gerar Certificado
</button>
<div>           
  {showPDF && (
    <Modal onClose={handleCloseModal}>
      <a href={PDFUrl}>
        <iframe src={PDFUrl} />
      </a>
    </Modal>
  )}
</div>
<input type="submit" className="btn-enviar-certificado" value="Enviar">

</input>

        <button
          type="button"
          className="download"
          onClick={handleDownloadPDF}>
          Gerar Certificado
        </button>

      </form>
    </div>
    <div className="btn btn-voltar-certificado">
      <Link to="/Pessoas" className="btn-text-voltar">
        Voltar
      </Link>
    </div>
  </div>

  );

}


export default CertificadoPage;
