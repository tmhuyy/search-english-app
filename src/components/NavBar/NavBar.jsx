import { Link } from "react-router-dom";
const NavBar = () => {
    return ( 
        <nav className="flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/search-word">Search</Link>
        </nav>
     );
}
 
export default NavBar;
