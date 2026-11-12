import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import Bookings from "./pages/Bookings";
import { loginRequest } from "./auth/config";
import { setAccessToken } from "./services/api";

function RoutesView() {
  return <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/movies" element={<Movies/>}/>
    <Route path="/movies/:id" element={<MovieDetails/>}/>
    <Route path="/shows/:showId/seats" element={<SeatSelection/>}/>
    <Route path="/bookings" element={<Bookings/>}/>
    <Route path="*" element={<main className="page"><h1>Page not found</h1><Link to="/">Go home</Link></main>}/>
  </Routes>;
}
function AuthenticatedShell() {
  const { instance, accounts } = useMsal();
  const account = accounts[0];
  useEffect(() => {
    let active = true;
    if (account && loginRequest.scopes.length) {
      instance.acquireTokenSilent({ ...loginRequest, account })
        .then(result => { if (active) setAccessToken(result.accessToken); })
        .catch(error => console.error("Token acquisition failed; interactive login may be required.", error));
    } else setAccessToken(null);
    return () => { active = false; };
  }, [account, instance]);
  const login = () => account ? instance.logoutRedirect() : instance.loginRedirect(loginRequest);
  return <><Header user={account?.name} onLogin={login}/><RoutesView/><footer>© 2026 CineBook <span>Made for movie moments.</span></footer></>;
}
function DemoShell() {
  const [demoUser,setDemoUser]=useState("");
  return <><Header user={demoUser} onLogin={()=>setDemoUser(demoUser?"":"Demo guest")}/><RoutesView/><footer>© 2026 CineBook <span>Demo mode — configure Entra External ID to enable secure sign-in.</span></footer></>;
}
export default function App() {
  return import.meta.env.VITE_ENTRA_CLIENT_ID && import.meta.env.VITE_ENTRA_AUTHORITY
    ? <AuthenticatedShell/>
    : <DemoShell/>;
}