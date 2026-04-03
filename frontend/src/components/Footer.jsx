import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-4">
                        <h5>MovieHub</h5>
                        <p>&copy; 2025 MovieHub. All Rights Reserved.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="#" className="text-white text-decoration-none">Movies</Link></li>
                            <li><Link to="#" className="text-white text-decoration-none">TV Shows</Link></li>
                            <li><Link to="#" className="text-white text-decoration-none">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <a href="#" className="text-white me-2"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="text-white me-2"><i className="bi bi-twitter"></i></a>
                        <a href="#" className="text-white me-2"><i className="bi bi-instagram"></i></a>
                        <a href="#" className="text-white"><i className="bi bi-youtube"></i></a>
                    </div>
                </div>
                <hr className="bg-light" />
                <p className="mb-0">Privacy Policy | Terms of Service</p>
            </div>
        </footer>
    );
}
