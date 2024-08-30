import React from 'react';
import './HomePage.css';
import noteJoter_Gif from '../Assert/notejot_gif.gif'
import { NavLink } from 'react-router-dom';
import { useGlobalContex } from '../Context';
import { FaCircleArrowDown } from "react-icons/fa6";


const HomePage = () => {
    const {token} = useGlobalContex();

  return (
    <div className="ideasJotter">
        <div className="container">
            <div className="ideasJotter-homepage">
                <h1>Welcome to ideasjoter</h1>
                <h2>Preserve Your Innovative Concepts for Future Exploration</h2>
                <p>Jot down ideas you think is great</p>
                <small className='arrow_down'>
                <FaCircleArrowDown />
                </small>
                <NavLink to={!token? "/signup":"/add"} className='btn'>Add Your Note</NavLink>
            </div> 
            <div className="row">
                <div className="col-2">
                    <img src={noteJoter_Gif} alt="" />
                </div>
                <div className="col-2">
                    <h1>Ideas Rule the World you know</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage
