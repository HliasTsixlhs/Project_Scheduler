import 'materialize-css/dist/css/materialize.min.css'
const { Link } = require("react-router-dom")

const Navbar = () => {
    return (
            <div>
                <header className="  orange darken-4">
                    <nav className="nav-wrapper  orange darken-4">

                    <Link to="/" className="brand-logo hide-on-med-and-down">Scheduler</Link>
                        <div className="container">
                        <span className="sidenav-trigger hide-on-large-only" data-target="mobile-menu">
                            <i className="material-icons white-text">menu</i>				
                        </span>                            
                            <ul className="right hide-on-med-and-down">
                                    <li><Link to="/" className="">
                                    Home<i className="material-icons white-text right small">home</i>  
                                    </Link></li>                                                                
                                <li><Link to="/skills" className="">
                                Skills <i className="material-icons white-text right small">school</i>
                                    </Link></li>                            
                                <li><Link to="/employees" className="">
                                Employees <i className="material-icons white-text right small">people</i> 
                                </Link></li>				
                            </ul>
                            <ul className="sidenav grey lighten-1" id="mobile-menu">
                                <li><Link to="/">Home<i className="material-icons black-text right small">home</i></Link></li>                            
                                <li><Link to="/skills">Skills<i className="material-icons black-text right small">school</i></Link></li>
                                <li><Link to="/employees">Employees<i className="material-icons black-text right small">people</i></Link></li>                                 
                            </ul>
                        </div>		
                    </nav>
                </header>            
            </div>
      );
}
 
export default Navbar;





