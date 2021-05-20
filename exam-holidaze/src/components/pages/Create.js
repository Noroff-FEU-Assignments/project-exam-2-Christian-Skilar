import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { API } from "../constants/Api";
import Heading from "../layout/Heading";
import bgImage from "../../img/cityskyline-fix.png";

function Create() {

    const history = useHistory();
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(!user){
            history.push('/')
        }
    });

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    console.log("file", file);

    async function onSubmit (data) {
		console.log(data);
		setSubmitted(true);

        const formData = new FormData()
        formData.append("data", JSON.stringify({name: data.name, roms: data.roms, max: data.max, price: data.price, description: data.description}));
        formData.append("files.img", file);

        try {
            const response = await fetch (API + "/hotels", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: formData
            })
    
            const data = await response.json();
            console.log("data", data);
    
        } catch (error){
            console.log(error);
            setError(error);
        }
    }
    return (
            <>
                <div className="container">
                <Link className="back-btn" to="/admin">Back</Link>
                <Heading heading="Register new establishment" />

                    {error && <p>{error}</p>}

                        <form onSubmit={handleSubmit(onSubmit)}>
                        {submitted ? <div className="success">Success! The form was submitted</div> : null}

                            <input  placeholder="Name" 
                                    name="name" 
                                    {...register("name", { required: true, minLength: 3 })}
                                    />
                                    {errors.name && <span className="error">This field is requires a name</span>}

                            <input  placeholder="Roms"
                                    name="roms" 
                                    {...register("roms", { required: true })}
                                    />
                                    {errors.roms && <span className="error">Add the establishment total bedroms</span>}

                            <input  placeholder="Max" 
                                    name="max"
                                    {...register("max", { required: true })}
                                    />
                                    {errors.max && <span className="error">Add establishments max capacity</span>}

                            <input  placeholder="Price" 
                                    name="price"
                                    type="number"
                                    {...register("price", { required: true })}
                                    />
                                    {errors.price && <span className="error">This field is requires a price</span>}

                            <textarea   className="border" 
                                        placeholder="Description"
                                        name="description" 
                                        rows="6" 
                                        {...register("description", { required: true, minLength: 10 })}
                                        />
                                        {errors.description && <span className="error">Message requires a minimum of 10 characters</span>}

                            <input  type="file" 
                                    className="file-upload" 
                                    onChange={(event) => setFile(event.target.files[0])} 
                                    />

                            <div className="btn-container-center">
					            <button className="btn-1">submit</button>
					        </div>
                        </form>
                </div>
                    <div className="bg-image">
                        <img src={bgImage} alt="city Background"/>
                        <img src={bgImage} alt="city Background" className="second"/>
                    </div>
                <div className="space"></div>
            </>
    )
}

export default Create;


