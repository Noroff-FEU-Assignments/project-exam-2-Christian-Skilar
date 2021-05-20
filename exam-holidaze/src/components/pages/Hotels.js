import { useState, useEffect } from "react";
import { CircleLoading } from 'react-loadingg';
import CardLink from "../functions/CardLink";
import { API } from "../constants/Api";
import Footer from "../layout/Footer";
import bgImage from "../../img/cityskyline-fix.png";

function Hotels() {
	const [hotels, sethotels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function fetchData() {
			try {
				const response = await fetch(API + "/hotels");

				if (response.ok) {
					const json = await response.json();
					console.log(json);
					sethotels(json);
				} else {
					setError("An error occured");
				}
			} catch (error) {
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	if (loading) {
		return	<div className="loading">
					<CircleLoading />
				</div>;
	}

	if (error) {
		return <div>Ups, something went wrong: {error}</div>;
	}

	return (
		<>
		<div>
			{hotels.map(function (hotel) {
				const { id, name, img, description } = hotel;
				return <CardLink key={id} id={id} name={name} img={img} description={description}/>;
			})}
		<div className="bg-image">
			<img src={bgImage} alt="city Background"/>
			<img src={bgImage} alt="city Background" className="second"/>
		</div>
		</div>
		<Footer />
		</>
	);
}

export default Hotels;