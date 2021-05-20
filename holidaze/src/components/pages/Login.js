
import {useState, useContext, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { saveToken, saveUser } from "../functions/Storage";
import Heading from "../layout/Heading";
import { API } from "../constants/Api";
import bgImage from "../../img/cityskyline-fix.png";

function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const {user, setUser} = useContext(UserContext);
    console.log("user", user);

    useEffect(() => {
        if(user){
            history.push('/admin')
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(API + "/auth/local", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: email,
                    password
                })
            })
    
            const data = await response.json()
            console.log("data", data);

            if (data.user) {
                saveToken(data.jwt);
                saveUser(data.user);
            }
    
            if(data.message) {
                setError(data.message[0].messages[0].message)
    
                return //Stop execution
            }

            setUser(data);

        }catch(error) {
            setError("Ops, something went wrong: " + error);
        } 

    }

    return (
        <>
            <div className="form-bg">
            <Heading heading="Login" />

                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                            setError('')
                            setEmail(event.target.value)
                        }}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setError('')
                            setPassword(event.target.value)
                        }}
                    />
                    {error && <p className="error">{error}</p>}
                    <div className="btn-container-center">
					<button className="btn-1">login</button>
					</div>
                </form>
            </div>
            <div className="bg-image">
                <img src={bgImage} alt="city Background"/>
                <img src={bgImage} alt="city Background" className="second"/>
		    </div>
        </>
    )
}

export default Login;

/*

import {useState, useContext, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { saveToken, saveUser } from "../functions/Storage";
import bgImage from "../../img/cityskyline-fix.png";

function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const {user, setUser} = useContext(UserContext);
    console.log("user", user);

    useEffect(() => {
        if(user){
            history.push('/admin')
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch('https://powerful-tundra-28507.herokuapp.com/auth/local', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: email,
                    password
                })
            })
    
            const data = await response.json()
            console.log("data", data);

            if (data.user) {
                saveToken(data.jwt);
                saveUser(data.user);
            }
    
            if(data.message) {
                setError(data.message[0].messages[0].message)
    
                return //Stop execution
            }

            setUser(data);

        }catch(error) {
            setError("Ops, something went wrong: " + error);
        } 

    }

    return (
        <>
            <div className="form-bg">
            <h1>Login Page</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                            setError('')
                            setEmail(event.target.value)
                        }}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setError('')
                            setPassword(event.target.value)
                        }}
                    />
                    {error && <p className="error">{error}</p>}
                    <div className="btn-container-center">
					<button className="btn-1">login</button>
					</div>
                </form>
            </div>
            <div className="bg-image">
                <img src={bgImage} alt="city Background"/>
                <img src={bgImage} alt="city Background" className="second"/>
		    </div>
        </>
    )
}

export default Login;

*/