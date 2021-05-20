import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { CircleLoading } from 'react-loadingg';

import ModalComponent from "../layout/Modal";
import { API } from "../constants/Api";
import Placeholder from "../../img/placeholder.png";
import bgImage from "../../img/cityskyline-fix.png";

function HotelDetail() {
	const [hotel, sethotel] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);


	let history = useHistory();

	const { id } = useParams();

	if (!id) {
		history.push("/");
	}

	const url = API + "/hotels/" + id;

	useEffect(
		function () {
			async function fetchData() {
				try {
					const response = await fetch(url);
					const json = await response.json();
					console.log(json);
					sethotel(json);
	
				} catch (error) {
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}
			fetchData();
		},
		[url]
	);

	if (loading) {
		return 	<div className="loading">
					<CircleLoading />
				</div>;
	}

	if (error) {
		return <div>Ups, something went wrong: {error}</div>;
	}

    let imageUrl = Placeholder;
  
    if (hotel && hotel.img) {
        imageUrl = hotel.img.url;
    }

	return (
			<>
				<div className="container">
				<Link className="back-btn" to="/hotels">Back</Link>
					<div className="detail-card">	
						<div>
							<h2>{hotel.name}</h2>
							<p>{hotel.description}</p>
								<div className="extra-info">
									<p>Max {hotel.max} people</p>
									<p>Roms - {hotel.roms}</p>
									<p>Price from {hotel.price},- Nok</p>
								</div>
						</div>
						<div><img src={imageUrl} alt={hotel.name}></img></div>
					</div>
					<ModalComponent />
				</div>
			   	<div className="bg-image">
					<img src={bgImage} alt="city Background"/>
					<img src={bgImage} alt="city Background" className="second"/>
				</div>
			</>
	);
}

export default HotelDetail;
