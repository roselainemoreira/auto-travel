import React, { useState, useRef } from "react";

import * as XLSX from "xlsx";

import IApagar from "../../assets/icons/lixo.png";
import ICopiar from "../../assets/icons/copiar-texto.png";
import ICopiado from "../../assets/icons/texto-copiado.png";

import Header from "../../components/Header";

function Passageiros() {
    const [texto, setTexto] = useState("");
    const [textoFormatado, setTextoFormatado] = useState("");
    const [textoCopiado, setTextoCopiado] = useState(false);

    // Referência para acessar o input de arquivo
    const fileInputRef = useRef(null);

    // Função para formatar o texto
    const formatarTexto = (e) => {
        e.preventDefault();

        const linhas = texto.split("\n");

        const textoFormatado = linhas
            .map((linha) => {
                // Substitui múltiplos espaços ou tabulações por um único espaço
                const linhaLimpa = linha.replace(/\s+/g, " ").trim();

                // Expressão regular para capturar o nome e o CPF
                const match = linhaLimpa.match(/^(.+?)\s+([\w\d.-]+)$/);

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


    // Função para ler o arquivo Excel e extrair os dados
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                // Pega a primeira aba do Excel
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Converte para JSON
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                // Filtra as linhas para pegar apenas Nome e Documento (sem formatação)
                const rawData = jsonData
                    .slice(1) // Ignora o cabeçalho
                    .filter(row => row.length >= 2) // Garante que tenha pelo menos 2 colunas
                    .map(row => `${row[0]} ${row[1]}`) // Apenas separa por espaço (não formata)
                    .join("\n");

                setTexto(rawData);
            };

            reader.readAsArrayBuffer(file);
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
            <div className="container mt-5">
                <form onSubmit={formatarTexto}>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4><b>Formatação dos nomes da lista</b></h4>
                                </div>
                                {/* Input para Upload do Excel */}
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    className="form-control mb-3"
                                    onChange={handleFileUpload}
                                    ref={fileInputRef}
                                />
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
                                    placeholder="Cole os nomes e CPFs aqui ou faça o upload de um arquivo Excel..."
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

export default Passageiros;
