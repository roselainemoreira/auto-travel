import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";

import IApagar from "../../assets/icons/lixo.png";
import ICopiar from "../../assets/icons/copiar-texto.png";
import ICopiado from "../../assets/icons/texto-copiado.png";

import Header from "../../components/Header";

function ListaEmFoto() {
    const [imagem, setImagem] = useState(null);
    const [texto, setTexto] = useState("");
    const [textoFormatado, setTextoFormatado] = useState("");
    const [textoCopiado, setTextoCopiado] = useState(false);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    // Função para extrair texto da imagem
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagem(URL.createObjectURL(file)); // Mostra a imagem carregada
            setLoading(true);
    
            try {
                const { data: { text } } = await Tesseract.recognize(file, "por"); // OCR em português
                console.log("Texto extraído:", text);
    
                // Processa o texto para extrair apenas Nome e RG
                const textoFormatado = text
                    .split("\n") // Divide por linhas
                    .map((linha) => {
                        const linhaLimpa = linha.replace(/\s+/g, " ").trim();
    
                        // Expressão regular para capturar apenas Nome e RG (primeiro número encontrado)
                        const match = linhaLimpa.match(/^(.+?)\s+(\d{7,}-?\d*)\b/);
    
                        if (match) {
                            const nome = match[1].trim();
                            const rg = match[2].trim();
                            return `${nome} ${rg}`;
                        }
    
                        return null; // Descarta linhas que não correspondem ao padrão
                    })
                    .filter(Boolean) // Remove valores nulos
                    .join("\n");
    
                setTexto(textoFormatado); // Define o texto extraído e formatado
                setLoading(false);
            } catch (error) {
                console.error("Erro ao processar a imagem:", error);
                alert("Erro ao processar a imagem. Tente outra.");
                setLoading(false);
            }
        }
    };
    

    // Função para formatar os dados extraídos
    const formatarTexto = (e) => {
        e.preventDefault();

        const linhas = texto.split("\n");
        
        // Filtra e formata apenas as colunas Nome e RG
        const textoFormatado = linhas
            .map((linha) => {
                const linhaLimpa = linha.replace(/\s+/g, " ").trim();
                const match = linhaLimpa.match(/^(.+?)\s+([\w\d.-]+)$/);

                if (match) {
                    const nome = match[1].trim();
                    const rg = match[2].trim();
                    return `${nome};${rg}`;
                }

                return null; // Descarta linhas que não correspondem ao padrão
            })
            .filter(Boolean) // Remove valores nulos
            .join("\n");

        setTextoFormatado(textoFormatado);
    };

    // Função para copiar o texto formatado
    const copiarTexto = () => {
        if (textoFormatado) {
            navigator.clipboard
                .writeText(textoFormatado)
                .then(() => setTextoCopiado(true))
                .catch(() => alert("Erro ao copiar o texto."));
        }
    };

    // Função para limpar tudo
    const handleClear = () => {
        setImagem(null);
        setTexto("");
        setTextoFormatado("");
        setTextoCopiado(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
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
                                    <h4><b>Upload da imagem da lista</b></h4>
                                </div>
                                <input
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    className="form-control mb-3"
                                    onChange={handleImageUpload}
                                    ref={fileInputRef}
                                />
                            </div>
                        </div>

                        {imagem && (
                            <div className="text-center">
                                <img src={imagem} alt="Imagem carregada" style={{ maxWidth: "100%", maxHeight: "300px" }} />
                            </div>
                        )}

                        {loading && <p className="text-center mt-3">🔄 Processando imagem...</p>}

                        <div className="row mt-3">
                            <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h4><b>Texto Extraído:</b></h4>
                                    <div onClick={handleClear}>
                                        <img src={IApagar} alt="Ícone lixeira" />
                                    </div>
                                </div>
                                <textarea
                                    className="form-control"
                                    rows="10"
                                    placeholder="Texto extraído da foto aparecerá aqui..."
                                    value={texto}
                                    readOnly
                                ></textarea>
                            </div>

                            <div className="col-12 col-md-6">
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
                                        <textarea
                                            className="form-control"
                                            rows="10"
                                            value={textoFormatado}
                                            readOnly
                                        ></textarea>
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

export default ListaEmFoto;
