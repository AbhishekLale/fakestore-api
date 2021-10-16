import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Link to="/"> 
                        <Navbar.Brand>Fake-Store</Navbar.Brand>
                    </Link>
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                        <Link to="/add-product" className="nav-link">
                            Add Product
                        </Link>
                        <Link to="/cart" className="nav-link">
                            Cart
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar