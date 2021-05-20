import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { API } from "../constants/Api";


function ModalComponent() {

    const { register, handleSubmit, formState: { errors } } = useForm();
	const [submitted, setSubmitted] = useState(false);

    async function onSubmit (data) {
        console.log(data);
		setSubmitted(true);

            const response = await fetch (API + "/enquiries", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            console.log(response);
    }

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
  

    return (
        <>
            <Button className="btn-1" onClick={handleShow}>Book</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Book hotel Now</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            {submitted ? <div className="success">Success! The form was submitted</div> : null}

                                <input placeholder="Name" type="text" {...register("name", { required: true, minLength: 3 })} />
                                {errors.name && <span className="error">This field is required</span>} 

                                <input placeholder="Email" type="text" {...register("mail", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
                                {errors.mail && <span className="error">Use a valid email</span>}

                                <input placeholder="From" type="date" {...register("datefrom", { required: true })} /> 
                                {errors.datefrom && <span className="error">Please enter date of arrival</span>}

                                <input placeholder="To" type="date" {...register("dateto", { required: true })} />
                                {errors.dateto && <span className="error">Please enter date of departure</span>}

                                <div className="btn-container-center">
                                    <button className="book-btn">Send</button>
                                </div>
                            </form>
                        </Modal.Body>
                </Modal>
        </>
    )
}

export default ModalComponent
