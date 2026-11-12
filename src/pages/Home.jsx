import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Search, Sparkles } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { api } from "../services/api";
const samples = [
 {id:"sample-1",title:"The Last Horizon",genre:"Sci-Fi",language:"English",rating:"8.9",posterUrl:"https://images.unsplash.com/photo-1440404653325-ab127d49?auto=format&fit=crop&w=800&q=80"},
 {id:"sample-2",title:"Midnight Run",genre:"Thriller",language:"Tamil",rating:"8.4",posterUrl:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"},
 {id:"sample-3",title:"Love in Paris",genre:"Romance",language:"English",rating:"8.1",posterUrl:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80"},
 {id:"sample-4",title:"The Final Game",genre:"Action",language:"Hindi",rating:"9.0",posterUrl:"https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80"}
];
export default function Home() {
 const [movies,setMovies]=useState(samples), [query,setQuery]=useState("");
 useEffect(()=>{api("/movies").then(x=>setMovies(x.items || [])).catch(()=>{});},[]);
 const visible=movies.filter(m=>m.title.toLowerCase().includes(query.toLowerCase()));
 return <main><section className="hero"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> YOUR NEXT BIG SCREEN MOMENT</div><h1>Stories worth<br/><em>stepping out for.</em></h1><p>Discover the latest movies, find your favourite seats, and make tonight unforgettable.</p><div className="hero-actions"><Link className="primary-btn" to="/movies">Explore movies <ArrowRight size={17}/></Link><a className="ghost-btn" href="#now-showing"><Play size={16}/> Now showing</a></div><div className="hero-meta"><span><b>120+</b> screens</span><span><b>40+</b> cities</span><span><b>One tap</b> booking</span></div></div><div className="hero-art"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="hero-poster"><img src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1000&q=85" alt="Cinema screen"/><div className="poster-caption"><span>FEATURED TONIGHT</span><b>The magic begins here</b></div></div><div className="floating-note">✦ &nbsp; Your seat is waiting</div></div></section>
 <section className="content-section" id="now-showing"><div className="section-heading"><div><div className="eyebrow">HANDPICKED FOR YOU</div><h2>Now showing</h2></div><Link to="/movies" className="text-link">View all <ArrowRight size={16}/></Link></div><label className="searchbox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search movies..."/></label><div className="movie-grid">{visible.map(m=><MovieCard key={m.id} movie={m}/>)}</div></section></main>;
}