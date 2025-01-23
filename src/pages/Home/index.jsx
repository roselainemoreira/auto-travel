import React, { useState } from "react";

import LogoAT from "../../assets/img/logo-auto-travel.png";
import "./style.css";
import Footer from "../../components/Footer";
import Passageiros from "../Passageiros";

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
                <div className="col-5 mt-5">
                    <button className="btn btn-light btn-lg"
                        onClick={() => setPassageiro(true)}><b>Passageiros</b></button>
                </div>
            </header>
            
            {
                passageiro ? <Passageiros/> :
                    <>
                        <div className="text-center bg-home">
                            {/* Home principal */}
                            <div className="row" style={{ width: "50%" }}>
                                <div className="col-12 text-home" style={{ marginTop: "200px" }}>
                                    <h1><b>AutoTravel! <br />Simplificando Processos das<br />
                                        listas de Passageiros!</b></h1>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </>
            }
        </div>

    )

};
export default Home;