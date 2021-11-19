import { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

import "../lib/css/landing-page.scss";

function LandingPage() {
    const [message, setMessage] = useState({
        message: {
            customerCell: "",
            customerName: "",
            rooferCell: "",
            body: "",
        },
        submitting: false,
        error: false,
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setMessage((prevState) => ({
            ...prevState,
            message: { ...prevState.message, [name]: event.target.value },
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage({ ...message, submitting: true });

        axios
            .post(
                "https://sms-contact-form-api.herokuapp.com/api/messages",
                // "http://localhost:5000/api/messages",
                {
                    message: message.message,
                },
                { headers: { "Access-Control-Allow-Origin": "*" } }
            )
            .then((response) => {
                if (response.success) {
                    setMessage({
                        ...message,
                        error: false,
                        submitting: false,
                        message: {
                            customerCell: "",
                            customerName: "",
                            rooferCell: "",
                            body: "",
                        },
                    });
                } else {
                    setMessage({
                        error: true,
                        submitting: false,
                        message: {
                            customerCell: "",
                            customerName: "",
                            rooferCell: "",
                            body: "",
                        },
                    });
                }
            })
            .catch((error) => {});
    };

    console.log(message);
    return (
        <>
            <NavBar />
            <div className="landing-container">
                <div id="response_div"></div>
                <div className="chat-container">
                    <header>
                        <h2>Text Message Contact Form</h2>
                        <div className="input-wrapper">
                            <label className="input-label" htmlFor="your_name">
                                Potential Customer Name
                            </label>
                            <input
                                type="text"
                                name="customerName"
                                placeholder="Enter your Name"
                                value={message.message.customerName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label className="input-label" htmlFor="cellphone">
                                Potential Customer Cell Number
                            </label>
                            <input
                                type="tel"
                                name="customerCell"
                                id="cellphone"
                                placeholder="Enter your Cellphone"
                                value={message.message.customerCell}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label className="input-label" htmlFor="cellphone">
                                Business Owner Cell Number
                            </label>
                            <input
                                id="sender_num"
                                name="rooferCell"
                                type="tel"
                                maxLength="10"
                                placeholder="Enter Cell # To Receive Test Msg"
                                value={message.message.rooferCell}
                                onChange={handleChange}
                            />
                        </div>
                    </header>
                    <div className="chat">
                        <div className="mine messages">
                            <div className="message">
                                Welcome to Valley Roofing and Siding! Send us a
                                text message below and Chris will get in touch
                                with you shortly.
                            </div>
                            <div className="message last">
                                Include your name and your Cellphone number.
                            </div>
                        </div>
                    </div>
                    <div className="msg-input-container">
                        <input
                            id="msg"
                            className="msg-input"
                            name="body"
                            type="text"
                            maxLength="100"
                            placeholder="Enter Message (100 Characters Max)"
                            value={message.message.body}
                            onChange={handleChange}
                        />

                        <div
                            className="send-button"
                            id="twilio-contact-form-submit"
                            onClick={handleSubmit}
                        >
                            Send
                        </div>
                    </div>

                    <div className="footer">
                        <p className="signature">
                            Powered by SmartSeed Technologies
                        </p>
                        <p>Copyright &copy; 2021</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
