import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from 'react';
import { ContextoUsuario } from '../contexto/Contexto';
import { Link } from 'react-router-dom';

export default function Menu(props) 
{
    const [usuario, setUsuario] = useContext(ContextoUsuario);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to="/">Menu</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to="/cliente">Clientes</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/pedido">Pedidos</Link></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" onClick={() => {
                                setUsuario({ ...usuario, logado: false})
                            }
                        }>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
