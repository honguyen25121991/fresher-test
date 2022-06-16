import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/images/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout success");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <span> Manager User App</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto link">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/users" className="nav-link">
                Manager User
              </NavLink>
            </Nav>
            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavLink to="/login" className="dropdown-item">
                  Login
                </NavLink>
                <NavLink
                  to="/logout"
                  className="dropdown-item"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </NavLink>
                {/* <NavDropdown.Item href="/login">Login</NavDropdown.Item> */}
                {/* <NavDropdown.Item href="/logout">Logout</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
