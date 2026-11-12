import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import "./styles.css";

const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID;
const authority = import.meta.env.VITE_ENTRA_AUTHORITY;
const msalInstance = clientId && authority ? new PublicClientApplication({
  auth: { clientId, authority, redirectUri: import.meta.env.VITE_ENTRA_REDIRECT_URI || window.location.origin },
  cache: { cacheLocation: "sessionStorage" }
}) : null;

async function start() {
  if (msalInstance) await msalInstance.initialize();
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode><BrowserRouter>{msalInstance ? <MsalProvider instance={msalInstance}><App /></MsalProvider> : <App />}</BrowserRouter></React.StrictMode>
  );
}
start().catch(console.error);