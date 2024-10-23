import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {

    const [action,setAction] = useState("Sign Up");
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <div className="background">
            <div className="header">
                Microservice Anomaly Detection System
            </div>
            <div className="image">
                <  div className="welcome">
                    Welcome to Microservice Anomaly Detection System!
                </div>
                <img src="https://media.licdn.com/dms/image/v2/C5612AQEPjDRjEK7L0Q/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520059990427?e=1734566400&v=beta&t=N26wcgYDoS_JoESzaf58gui_IyQol208PcEBcA6Z0H4" alt="Anomaly Detection"/>
            </div>
            <div className="description">
                <span className="typing-text">
                    This tool is designed to help you monitor and maintain the health of your microservices architecture by automatically detecting unusual patterns and potential issues. By leveraging advanced machine learning algorithms, our system ensures that your services run smoothly, allowing you to focus on innovation while we take care of reliability.
                </span>
            </div>
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{navigate("/Signup")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{navigate("/Login")}}>Login</div>
            </div>
            </div>
        </div>
    )
}

export default LandingPage;