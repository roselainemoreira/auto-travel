import React, { useState, useRef } from "react";


import IApagar from "../../assets/icons/lixo.png";
import ICopiar from "../../assets/icons/copiar-texto.png";
import ICopiado from "../../assets/icons/texto-copiado.png";

import Header from "../../components/Header";

function ListaCopiaCola() {
    const [texto, setTexto] = useState("");
    const [textoFormatado, setTextoFormatado] = useState("");
    const [textoCopiado, setTextoCopiado] = useState(false);

    // Referência para acessar o input de arquivo
    const fileInputRef = useRef(null);

    // Função para formatar o texto
    const formatarTexto = (e) => {
        e.preventDefault();
    
        const linhas = texto.split("\n").map(line => line.trim()).filter(line => line !== "");
    
        let formattedRows = [];
        let currentName = "";
    
        for (let i = 0; i < linhas.length; i++) {
            let line = linhas[i];
    
            // Expressão regular para capturar documentos (CPF/RG)
            const documentoMatch = line.match(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b|\b\d{9}-\d{2}\b/);
    
            if (documentoMatch) {
                if (currentName) {
                    formattedRows.push(`${currentName};${documentoMatch[0]}`); // Agora separa Nome e CPF com `;`
                    currentName = ""; // Resetar para o próximo nome
                }
            } else if (!line.match(/^\d+$/) && !documentoMatch) {
                // Se não for um número isolado e não for CPF, consideramos como nome
                if (!linhas[i + 1] || !linhas[i + 1].match(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b|\b\d{9}-\d{2}\b/)) {
                    continue; // Ignora essa linha, pois não é um CPF
                }
    
                // Se não ignorarmos, adicionamos como nome
                if (currentName) {
                    currentName += ` ${line}`;
                } else {
                    currentName = line;
                }
            }
        }
    
        // Exibir o resultado formatado com `;`
        setTextoFormatado(formattedRows.join("\n"));
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


    // Função para limpar o arquivo e os dados do formulário
    const handleClear = () => {
        setTexto("");
        setTextoFormatado("");
        setTextoCopiado(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Limpa o campo de upload de arquivo
        }
    };


    return (
        <div className="home">
            <Header />
            <div className="container mt-3">
                <form onSubmit={formatarTexto}>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4><b>Cole o texto com dos nomes e documentos da lista</b></h4>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h4><b>Texto:</b></h4>
                                    <div onClick={() => { handleClear(); }}>
                                        <img src={IApagar} alt="Ícone lixeira" />
                                    </div>
                                </div>

                                <textarea
                                    className="form-control"
                                    id="exampleTextarea"
                                    rows="10"
                                    placeholder="Cole os nomes e CPFs aqui ..."
                                    value={texto}
                                    onChange={(e) => setTexto(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="col-12 col-md-6">

                                {/* Exibição do texto formatado */}
                                {textoFormatado && (
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h4><b>Texto Formatado:</b></h4>
                                            {!textoCopiado ? (
                                                <div onClick={copiarTexto} style={{ cursor: "pointer" }}>
                                                    <img src={ICopiar} alt="Ícone copiar" /><span><b>Copiar</b></span>
                                                </div>
                                            ) : (
                                                <div style={{ cursor: "pointer" }}>
                                                    <img src={ICopiado} alt="Ícone copiado" /><span><b>Copiado</b></span>
                                                </div>
                                            )}
                                        </div>
                                        <textarea className="form-control" rows="10" value={textoFormatado} readOnly></textarea>
                                    </div>
                                )}
                            </div>


                        </div>

                    </div>
                    <button type="submit" className="btn btn-primary">Formatar</button>
                </form>


            </div>
        </div>
    );
}

export default ListaCopiaCola;
