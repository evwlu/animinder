import '../styles/Navbar.css';
import { Outlet, Link } from "react-router-dom";

function Navbar() {
    return (
        <ul>
            <li><Link to={`/`}>Home</Link></li>
            {/* Commented out are the WIP pages.
            <li><Link to={'/second-page'}>Second Page</Link></li>
            <li><Link to={'/scratch-work'}>Scratch Work</Link></li> */}
            <li><Link to={'/search'}>Search</Link></li>
            <li><Link to={'/gallery'}> Gallery </Link></li>
            <li><Link to={'/friends'}> Friends </Link></li>
        </ul>
    );
  }
  
  export default Navbar;