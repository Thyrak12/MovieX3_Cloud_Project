import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { Login } from "./Modal-login";
import SearchForm from "./SearchForm";
import { categoriesAPI } from '../services/api';
import { CATEGORY_NAV_ITEMS } from '../constants/navigation';

export default function Header({ isSearch, setIsSearch, setMovies }) {

  const [showDropdown, setShowDropdown] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

  const location = useLocation();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Handle scroll event to update header styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // If user scrolls more than 50px, the navbar will appear
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Dynamically adjust navbar style based on scroll position and current route
  const navbarStyle = {
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    background: isScrolled ? "#212529" : "transparent",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 1000,
    boxShadow: isScrolled ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    display: (location.pathname === "/" || isScrolled) ? "block" : "none", // Show on Home page or when scrolled
  };


  return (
    <>
      <Navbar expand="lg" className="navbar-dark" style={navbarStyle}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontSize: "28px" }}>
            MovieX3
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to={`/category/${categories.find((e) => e.name === CATEGORY_NAV_ITEMS[0].key)?.id || ''}`}>Latest</Nav.Link>

              <NavDropdown title="Categories" id="navbarScrollingDropdown">
                {CATEGORY_NAV_ITEMS.slice(1).map((item) => (
                  <NavDropdown.Item key={item.key} as={Link} to={`/category/${categories.find((e) => e.name === item.key)?.id || ''}`}>
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <Nav.Link href="#">Favorite</Nav.Link>
            </Nav>

            <div id="right_nav">
              <Button
                id="button"
                style={{ outline: "none", border: "none" }}
                variant="outline-light"
                onClick={() => setShowToast(true)}
              >
                <i className="bi bi-bell-fill"></i>
              </Button>

              <Dropdown
                show={showDropdown}
                onToggle={(isOpen) => setShowDropdown(isOpen)}
              >
                <Dropdown.Toggle
                  as={Button}
                  id="button"
                  variant="outline-light"
                  style={{ outline: "none", border: "none", background: "none" }}
                >
                  <i className="bi bi-person-circle"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="#settings">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleShow}>Login/SignUp</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <SearchForm
                setMovies={setMovies}
                setIsSearch={setIsSearch}
              />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="light"
        >
          <Toast.Header>
            <i className="bi bi-bell-fill me-2 text-warning"></i>
            <strong className="me-auto">Notifications</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>You have new notifications!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Login show={showModal} handleClose={handleClose} />
    </>
  );
}


