import React from "react";
import { Link } from "react-router-dom";


import IExcel from "../../assets/icons/excel.png";
import IPdf from "../../assets/icons/pdf-file.png";
import IFoto from "../../assets/icons/photo.png";
import IMaps from "../../assets/icons/pin.png";

import Footer from "../../components/Footer";

import "./style.css";
import Header from "../../components/Header";


const Home = () => {

    return (

        <div className="home">
            <Header />

            {/* {
                passageiro ? <Passageiros /> :
                    <> */}
            <div className="text-center bg-home">
                {/* Home principal */}
                <div className="row justify-content-evenly mt-5" style={{ background: "rgb(255 255 255 / 24%)", height: "70vh", width: "96%", margin: "0 auto" }}>
                    {/* Card Passageiros */}
                    <div className="col-12 col-md-4 col-lg-3 mt-2 ms-1" >
                        <Link to="/lista-em-excel" style={{ textDecoration: "none" }}>

                            <div className="card shadow-lg d-flex flex-row align-items-center p-3"
                                style={{
                                    // width: "300px",
                                    height: "200px",
                                    border: "2px solid #1c4986",
                                    borderRadius: "7px",
                                    transition: "all 0.3s ease-in-out",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
                                    e.currentTarget.style.transform = "translateY(0px)";
                                }}
                            >
                                <img src={IExcel} className="img-fluid" alt="Imagem do Card" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                                <div className="card-body d-flex align-items-center" style={{ width: "100%", height: "100%", color:"#1c4986" }}>
                                    <h4 className="card-title m-0"><b>Lista em Excel</b></h4>
                                </div>
                            </div>
                        </Link>
                    </div>



                    {/* Card lista em PDF */}
                    <div className="col-12 col-md-4 col-lg-3 mt-2 ms-1">
                        <Link to="/lista-em-pdf" style={{ textDecoration: "none" }}>
                            <div className="card shadow-lg d-flex flex-row align-items-center p-3"
                                style={{
                                    // width: "300px",
                                    height: "200px",
                                    border: "2px solid #1c4986",
                                    borderRadius: "7px",
                                    transition: "all 0.3s ease-in-out",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
                                    e.currentTarget.style.transform = "translateY(0px)";
                                }}
                            >
                                <img src={IPdf} className="img-fluid" alt="Imagem do Card" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                                <div className="card-body d-flex align-items-center" style={{ width: "100%", height: "100%", color:"#1c4986" }}>
                                    <h4 className="card-title m-0"><b>Lista em PDF</b></h4>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Card lista em Foto */}
                    <div className="col-12 col-md-4 col-lg-3 mt-2 ms-1">
                        <Link to="/lista-em-foto" style={{ textDecoration: "none" }}>
                            <div className="card shadow-lg d-flex flex-row align-items-center p-3"
                                style={{
                                    // width: "300px",
                                    height: "200px",
                                    border: "2px solid #1c4986",
                                    borderRadius: "7px",
                                    transition: "all 0.3s ease-in-out",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
                                    e.currentTarget.style.transform = "translateY(0px)";
                                }}
                            >
                                <img src={IFoto} className="img-fluid" alt="Imagem do Card" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                                <div className="card-body d-flex align-items-center" style={{ width: "100%", height: "100%", color:"#1c4986" }}>
                                    <h4 className="card-title m-0"><b>Lista em Foto</b></h4>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Card Google Maps
                    <div className="col-12 col-md-4 col-lg-3 mt-2 mx-1">
                        <a href="https://www.google.com.br/maps/" target="_blanck" rel="noopener noreferrer"
                            style={{ textDecoration: "none" }}>

                            <div className="card shadow-lg d-flex flex-row align-items-center p-3"
                                style={{
                                    height: "200px",
                                    border: "2px solid #1c4986",
                                    borderRadius: "7px",
                                    transition: "all 0.3s ease-in-out",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
                                    e.currentTarget.style.transform = "translateY(0px)";
                                }}
                            >
                                <img src={IMaps} className="img-fluid" alt="Imagem do Card" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                                <div className="card-body d-flex align-items-center" style={{ width: "100%", height: "100%", color:"#1c4986" }}>
                                    <h4 className="card-title m-0"><b>Google Maps</b></h4>
                                </div>
                            </div>
                        </a>
                    </div> */}

                    {/* <div className="col-12 col-md-3 col-lg-2"></div>
                    <div className="col-12 col-md-3 col-lg-2"></div> */}
                </div>
            </div>
            <Footer />
            {/* </>
            } */}
        </div>

    )

};
export default Home;