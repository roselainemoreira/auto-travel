import React, { useState } from "react";

import IApagar from "../../assets/icons/lixo.png";
import ICopiar from "../../assets/icons/copiar-texto.png";
import ICopiado from "../../assets/icons/texto-copiado.png";

function Formulario() {
    const [texto, setTexto] = useState("");
    const [textoFormatado, setTextoFormatado] = useState("");
    const [textoCopiado, setTextoCopiado] = useState(false);

    // Função para formatar o texto
    const formatarTexto = (e) => {
        e.preventDefault();
    
        const linhas = texto.split("\n");
    
        const textoFormatado = linhas
            .map((linha) => {
                // Substitui múltiplos espaços ou tabulações por um único espaço
                const linhaLimpa = linha.replace(/\s+/g, " ").trim();
    
                // Expressão regular para capturar o nome e o CPF
                const match = linhaLimpa.match(/^(.+?)\s+(\d{9,11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/);
    
                if (match) {
                    const nome = match[1].trim();
                    const cpf = match[2].trim();
                    return `${nome};${cpf}`;
                }
    
                // Retorna a linha original se não corresponder ao padrão esperado
                return linhaLimpa;
            })
            .filter((linha) => linha !== "") // Remove linhas vazias
            .join("\n");
    
        setTextoFormatado(textoFormatado);
    };
    
    
    // Função para copiar o texto formatado
    const copiarTexto = () => {
        if (textoFormatado) {
            navigator.clipboard
                .writeText(textoFormatado)
                .then(() => {
                    setTextoCopiado(true);
                })
                .catch(() => {
                    alert("Erro ao copiar o texto.");
                });
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={formatarTexto}>
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>
                            <b>Formatação dos nomes da lista</b>
                        </h4>
                        <div onClick={() => { setTexto(""); setTextoFormatado(""); setTextoCopiado(false); }}>
                            <img src={IApagar} alt="Ícone lixeira" />
                        </div>
                    </div>

                    <textarea
                        className="form-control"
                        id="exampleTextarea"
                        rows="10"
                        placeholder="Cole os nomes e CPFs aqui..."
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Formatar
                </button>
            </form>

            {/* Exibição do texto formatado */}
            {textoFormatado && (
                <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>
                            <b>Texto Formatado:</b>
                        </h4>
                        {
                            !textoCopiado ?
                                <div onClick={() => { copiarTexto(); }} style={{ cursor: "pointer" }}>
                                    <img src={ICopiar} alt="Ícone copiar" /><span><b>Copiar</b></span>
                                </div> :
                                <div style={{ cursor: "pointer" }}>
                                    <img src={ICopiado} alt="Ícone copiado" /><span><b>Copiado</b></span>
                                </div>
                        }
                    </div>
                    <textarea
                        className="form-control"
                        rows="10"
                        value={textoFormatado}
                        readOnly
                    ></textarea>
                </div>
            )}
        </div>
    );
}

export default Formulario;
