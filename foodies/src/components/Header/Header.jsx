import React from 'react'
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div>
      <div className='p-5 mb-4 rounded-4 mt-3' style={{
        background: "linear-gradient(135deg, #FFA17F 0%, #00223E 100%)",
        color: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
      }}>
        <div className="container-fluid py-5 text-center">
          <h1 className='display-5 fw-bold mb-3' style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.4)" }}>
            Order Your Favorite Food Here
          </h1>
          <p className='col-md-8 fs-5 mx-auto mb-4' style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.3)" }}>
            Discover the best food and drinks in Bengaluru
          </p>
          <Link 
            to={"/explore"} 
            className='btn btn-light btn-lg fw-bold shadow-sm'
            style={{ transition: "all 0.3s ease" }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  )
}
