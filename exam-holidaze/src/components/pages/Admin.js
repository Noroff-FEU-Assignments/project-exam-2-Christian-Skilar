import { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Heading from "../layout/Heading";
import Messages from "../functions/Messages";
import Enquiries from "../functions/Booking";
import bgImage from "../../img/cityskyline-fix.png";

function Admin() {

    const history = useHistory();
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(!user){
            history.push('/')
        }
    });
    
    return (
            <>
                <div className="admin container">
                <Heading heading="Admin" />
                    <div className="space-top"><Link className="admin-btn" to="/create">New hotel</Link></div>
                    <h3>Messages</h3>
                    <div className="message-container"><Messages /></div>
                    <h3>Bookings</h3>
                    <div className="message-container"><Enquiries /></div>
                </div>
                    <div className="bg-image">
                        <img src={bgImage} alt="city Background"/>
                        <img src={bgImage} alt="city Background" className="second"/>
                    </div>
            </>
    )
}

export default Admin
