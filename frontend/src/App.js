import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ContextoUsuario } from "./componentes/contexto/Contexto";
import TelaLogin from "./componentes/telas/telaLogin";
import TelaMenu from './componentes/telas/telaMenu';
import Tela404 from "./componentes/telas/tela404";
import TelaCadastroCliente from "./componentes/telas/telaCadastroCliente";
import TelaCadastroPedido from "./componentes/telas/telaCadastroPedido";

function App() 
{
    const [usuario, setUsuario] = useState({
        nome: "",
        logado: false
    });

    if (!usuario.logado) 
    {
        return <ContextoUsuario.Provider value={[usuario, setUsuario]}>
            <TelaLogin />;
        </ContextoUsuario.Provider>;
    }
    else 
    {
        return (
            <div className="App">
                <ContextoUsuario.Provider value={[usuario, setUsuario]}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/cliente" element={<TelaCadastroCliente/>} />
                            <Route path="/pedido" element={<TelaCadastroPedido/>} />
                            <Route path="/" element={<TelaMenu/>} />
                            <Route path="*" element={<Tela404/>} />
                        </Routes>
                    </BrowserRouter>
                </ContextoUsuario.Provider>
            </div>
        );
    }
}

export default App;
