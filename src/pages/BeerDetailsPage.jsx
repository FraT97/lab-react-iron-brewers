import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function BeerDetailsPage() {
  const [beer, setBeer] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { beerId } = useParams(); 
  const navigate = useNavigate(); 

 
  useEffect(() => {
    const fetchBeer = async () => {
      try {
        setLoading(true); 
        const response = await axios.get(
          `https://ih-beers-api2.herokuapp.com/beers/${beerId}`
        );
        setBeer(response.data); 
        setError(null); 
      } catch (err) {
        console.error("Error fetching beer:", err);
        setError("Failed to fetch beer details. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    fetchBeer();
  }, [beerId]); 

  
  return (
    <div className="d-inline-flex flex-column justify-content-center align-items-center w-100 p-4">
      {loading && <p>Loading beer details...</p>}
      {error && <p className="text-danger">{error}</p>}
      {beer && !loading && !error && (
        <>
          <img
            src={beer.image_url}
            alt={`${beer.name} Image`}
            height="300px"
            width="auto"
          />
          <h3>{beer.name}</h3>
          <p>{beer.tagline}</p>
          <p>Attenuation level: {beer.attenuation_level}</p>
          <p>Description: {beer.description}</p>
          <p>Created by: {beer.contributed_by}</p>

          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default BeerDetailsPage;
