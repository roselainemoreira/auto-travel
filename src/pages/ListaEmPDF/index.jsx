import React, { useState, useRef } from "react";

import IApagar from "../../assets/icons/lixo.png";
import ICopiar from "../../assets/icons/copiar-texto.png";
import ICopiado from "../../assets/icons/texto-copiado.png";

import Header from "../../components/Header";

import * as pdfjs from "pdfjs-dist/build/pdf";

// Corrigir o caminho do Worker para Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

function ListaEmPDF() {
    const [texto, setTexto] = useState("");
    const [textoFormatado, setTextoFormatado] = useState("");
    const [textoCopiado, setTextoCopiado] = useState(false);

    const fileInputRef = useRef(null);
    const pdfInputRef = useRef(null);


    // Função para copiar o texto formatado
    const copiarTexto = () => {
        if (textoFormatado) {
            navigator.clipboard
                .writeText(textoFormatado)
                .then(() => setTextoCopiado(true))
                .catch(() => alert("Erro ao copiar o texto."));
        }
    };

    // Função para processar o upload de PDF e extrair texto corretamente
    const handlePDFUpload = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const typedArray = new Uint8Array(e.target.result);
                const pdf = await pdfjs.getDocument(typedArray).promise;
                let extractedText = "";

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();

                    // Agora, cada item do PDF será separado corretamente por "\n"
                    const pageText = textContent.items.map(item => item.str).join("\n");
                    extractedText += pageText + "\n";
                }

                // Separar o texto em linhas corretamente e remover "_____"
                let lines = extractedText.split("\n").map(line => line.trim()).filter(line => line && line !== "_____");

                // **1️⃣ Encontrar a linha onde começa a tabela**
                let nomeIndex = lines.findIndex(line => line.toLowerCase() === "nome");
                let rgIndex = lines.findIndex(line => line.toLowerCase() === "rg");

                if (nomeIndex === -1 || rgIndex === -1) {
                    setTexto("Cabeçalho não encontrado.");
                    return;
                }

                // O cabeçalho está identificado, pegamos os dados abaixo
                let headerIndex = Math.min(nomeIndex, rgIndex);

                // **2️⃣ Capturar os dados da tabela a partir do cabeçalho**
                const tableData = lines.slice(headerIndex + 1);

                let formattedRows = [];
                let currentName = "";

                // **3️⃣ Processar os dados agrupando Nome + RG corretamente**
                for (let i = 0; i < tableData.length; i++) {
                    let line = tableData[i];

                    // Expressão regular para identificar qualquer número válido (RG ou RG+CPF juntos)
                    const numberMatch = line.match(/\b[\d\.\-]{7,30}\b/);

                    if (numberMatch) {
                        if (currentName) {
                            formattedRows.push(`${currentName} ${numberMatch[0]}`);
                            currentName = ""; // Resetar para o próximo nome
                        }
                    } else if (!line.match(/^\d+$/) && !["Código", "Documento", "Status", "RG"].includes(line)) {
                        if (currentName) {
                            currentName += ` ${line}`;
                        } else {
                            currentName = line;
                        }
                    }
                }

                // **4️⃣ Formatando a saída para exibição**
                const filteredText = formattedRows.join("\n");
                setTexto(filteredText);
            };
            reader.readAsArrayBuffer(file);
        }
    };


    // Função para processar o texto e extrair nome e CPF
    const formatarTexto = (e) => {
        e.preventDefault();

        const linhas = texto.split("\n");

        const textoFormatado = linhas
            .map((linha) => {
                // Substitui múltiplos espaços ou tabulações por um único espaço
                const linhaLimpa = linha.replace(/\s+/g, " ").trim();

                // Expressão regular para capturar nome e número (RG ou RG+CPF juntos)
                const match = linhaLimpa.match(/^(.+?)\s+([\d.\-]+)$/);

                if (match) {
                    const nome = match[1].trim();
                    const numero = match[2].trim();
                    return `${nome};${numero}`;
                }

                return null; // Retorna null para evitar linhas inválidas
            })
            .filter((linha) => linha !== null) // Remove linhas inválidas
            .join("\n");

        setTextoFormatado(textoFormatado);
    };


    // const handlePDFUpload = async (event) => {
    //     const file = event.target.files[0];

    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = async (e) => {
    //             const typedArray = new Uint8Array(e.target.result);
    //             const pdf = await pdfjs.getDocument(typedArray).promise;
    //             let extractedText = "";

    //             for (let i = 1; i <= pdf.numPages; i++) {
    //                 const page = await pdf.getPage(i);
    //                 const textContent = await page.getTextContent();

    //                 // Agora, cada item do PDF será separado corretamente por espaço
    //                 const pageText = textContent.items.map(item => item.str).join(" ");
    //                 extractedText += pageText + "\n";
    //             }

    //             console.log("Texto Extraído:", extractedText); // Debug para ver o texto real

    //             // Separar as linhas do texto extraído corretamente
    //             const lines = extractedText.split(/\s{2,}/).map(line => line.trim()).filter(line => line);

    //             console.log("Linhas Extraídas:", lines); // Verificar se agora as linhas estão separadas corretamente

    //             // **Criar um novo array para reconstruir os nomes com os documentos**
    //             let formattedLines = [];
    //             let currentName = "";

    //             lines.forEach((line, index) => {
    //                 // Expressão regular para identificar um CPF válido
    //                 const cpfMatch = line.match(/(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})/);

    //                 if (cpfMatch) {
    //                     // Se a linha contém um CPF, assumimos que a linha anterior tinha o nome
    //                     formattedLines.push(`${currentName} ${cpfMatch[1]}`);
    //                     currentName = ""; // Resetar para evitar acumular nomes errados
    //                 } else if (!line.match(/^\d+$/)) {
    //                     // Se a linha não é um número isolado (código ou RG), assumimos que é um nome
    //                     currentName = line;
    //                 }
    //             });

    //             // Garantir que os dados estejam formatados corretamente
    //             const filteredText = formattedLines.join("\n");

    //             if (!filteredText.trim()) {
    //                 console.warn("Nenhuma correspondência encontrada. Verifique a estrutura do PDF.");
    //             }

    //             setTexto(filteredText);
    //         };
    //         reader.readAsArrayBuffer(file);
    //     }
    // };



    // Função para limpar os dados do formulário
    const handleClear = () => {
        setTexto("");
        setTextoFormatado("");
        setTextoCopiado(false);

        if (fileInputRef.current) fileInputRef.current.value = "";
        if (pdfInputRef.current) pdfInputRef.current.value = "";
    };

    return (
        <div className="home">
            <Header />
            <div className="container mt-5">
                <form onSubmit={formatarTexto}>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <h4><b>Formatação dos nomes da lista em PDF</b></h4>

                                {/* Input para Upload de PDF */}
                                <input
                                    type="file"
                                    accept=".pdf"
                                    className="form-control mb-3"
                                    onChange={handlePDFUpload}
                                    ref={pdfInputRef}
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

export default ListaEmPDF;
