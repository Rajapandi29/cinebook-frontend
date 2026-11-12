import { Link } from "react-router-dom";
import { Star } from "lucide-react";
export default function MovieCard({ movie }) {
  return <Link className="movie-card" to={`/movies/${movie.id}`}>
    <div className="poster-wrap"><img src={movie.posterUrl || `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700`} alt={`${movie.title} poster`} loading="lazy"/><span className="rating"><Star size={13} fill="currentColor"/> {movie.rating || "New"}</span></div>
    <div className="movie-info"><h3>{movie.title}</h3><p>{movie.language || "English"} · {movie.genre || "Drama"}</p></div>
  </Link>;
}