import React, { useState } from "react";

import LogoAT from "../../assets/img/logo-auto-travel.png";
import IUser from "../../assets/icons/user.png";
import IMaps from "../../assets/icons/pin.png";

import Footer from "../../components/Footer";
import Passageiros from "../Passageiros";

import "./style.css";


const Home = () => {

    const [passageiro, setPassageiro] = useState(false);

    return (

        <div className="home">
            <header
                className="container-fluid d-flex align-items-center justify-content-between"
                style={{ height: "145px", marginTop: "-15px", background: "rgb(108 108 109)" }}
            >
                <div className="col-7" onClick={() => setPassageiro(false)}>
                    <div className="logo">
                        <img
                            src={LogoAT}
                            alt="Logo"
                            style={{ height: "100px" }}
                        />
                    </div>
                </div>
                {/* <div className="col-5 mt-5">
                    
                </div> */}
            </header>

            {
                passageiro ? <Passageiros /> :
                    <>
                        <div className="text-center bg-home">
                            {/* Home principal */}
                            <div className="row justify-content-evenly mt-5" style={{ background: "rgb(255 255 255 / 24%)", height: "70vh", width: "96%", margin: "0 auto" }}>
                                {/* Card Passageiros */}
                                <div className="col-12 col-md-4 col-lg-3 mt-2 ms-1" onClick={() => setPassageiro(true)}>
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
                                        <img src={IUser} className="img-fluid" alt="Imagem do Card" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                                        <div className="card-body d-flex align-items-center" style={{ width: "100%", height: "100%" }}>
                                            <h4 className="card-title m-0"><b>Passageiros</b></h4>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Google Maps */}
                                <div className="col-12 col-md-4 col-lg-3 mt-2 mx-1">
                                    <a href="https://www.google.com.br/maps/" target="_blanck" rel="noopener noreferrer" 
                                    style={{ textDecoration:"none"}}>

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
                                            <div className="card-body d-flex align-items-center" style={{ width: "100%", height: "100%" }}>
                                                <h4 className="card-title m-0"><b>Google Maps</b></h4>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-12 col-md-3 col-lg-2"></div>
                                <div className="col-12 col-md-3 col-lg-2"></div>
                            </div>
                        </div>
                        <Footer />
                    </>
            }
        </div>

    )

};
export default Home;