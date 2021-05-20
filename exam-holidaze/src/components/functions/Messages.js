import { useState, useEffect } from "react";
import { API } from "../constants/Api";

function Messages() {

    const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

    useEffect(function () {
		async function fetchData() {
			try {
				const response = await fetch(API + "/messages");
				const json = await response.json();
				console.log(json);
				setMessages(json);

			} catch (error) {
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	if (loading) {
		return <div className="loading">
					<h2>Page Is Loading...</h2>
				</div>;
	}

	if (error) {
		return <div>Ups, something went wrong: {error}</div>;
	}
    
    return (
            <>
                {messages.map(function (questions) {
                const { name, subject, mail, message, id } = questions;
                return <div className="message-cards" key={id}>
                            <p><span>Name</span> - {name}</p>
							<p><span>Subject</span> - {subject}</p>
                            <p><span>From</span> - {mail}</p>
                            <p><span>Message</span> - {message}</p>
                        </div>
                    })}
            </>
    )
}

export default Messages
