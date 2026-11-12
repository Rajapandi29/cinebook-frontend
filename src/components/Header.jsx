import { Link, NavLink } from "react-router-dom";
import { Film, Ticket, UserRound } from "lucide-react";
export default function Header({ onLogin, user }) {
  return <header className="topbar"><Link className="brand" to="/"><span className="brand-icon"><Film size={21}/></span>CINE<span>BOOK</span></Link>
    <nav><NavLink to="/">Home</NavLink><NavLink to="/movies">Movies</NavLink><NavLink to="/bookings">My bookings</NavLink></nav>
    <button className="profile-btn" onClick={onLogin}>{user ? <><UserRound size={17}/> {user}</> : <><Ticket size={17}/> Sign in</>}</button>
  </header>;
}