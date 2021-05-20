import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Placeholder from "../../img/placeholder.png";


function CardLink({ id, name, img, description }) {

    let imageUrl = Placeholder;
  
    if (img && img.url) {
        imageUrl = img.url;
    }


	return (
            <div className="card">
                <h3>{name}</h3>
                <div className="container-card">
                <div>
                    <img src={imageUrl} alt={name}></img>
                </div>
                <div>
                    <p className="card-description">{description}</p>
                    
                    <div className="vm-btn">
                    <Link className="cta type2" to={`detail/${id}`}>View More</Link>
                    </div>
                </div>
                </div>
            </div>
	);
}

CardLink.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
    img: PropTypes.object,
    description: PropTypes.string,
};

export default CardLink;

