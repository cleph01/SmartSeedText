import { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";
import Blocked from "../components/Blocked";

import { db } from "../services/firebase/firebase-config";

import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";

import "../lib/css/pages/landing-page.scss";

function LandingPage() {
    const { businessId } = useParams();

    const [businessExists, setBusinessExists] = useState(false);
    const [businessInfo, setBusinessInfo] = useState();

    const [message, setMessage] = useState({
        message: {
            customerCell: "",
            customerName: "",
            rooferCell: "",
            body: "",
        },
        submitting: false,
        error: false,
        success: false,
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

        const twilioPayload = {
            to: message.message.rooferCell,
            from: businessInfo.twilioNumber,
            body: `New Message from Contact Form: Customer Name: ${message.message.customerName} - ${message.message.body} - Call them @ : ${message.message.customerCell}`,
            businessId: businessId,
            businessName: businessInfo.businessName,
        };

        const chat = document.getElementsByClassName("chat")[0];

        chat.innerHTML +=
            "<div class='yours messages'><div class='message last'>" +
            message.message.body +
            "</div></div><div id='sending' class='mine messages'><div class='message last'>Sending Your Message...</div></div>";

        db.collection("textMessages")
            .add(twilioPayload)
            .then((docRef) => {
                setMessage({ ...message, submitting: false, success: true });
                const sendingEl = document.getElementById("sending");

                sendingEl.remove();

                chat.innerHTML +=
                    "<div class='mine messages'><div class='message last'>Your message has successfully been sent!! Someone will be in touch with you shortly. ✅ </div></div>";

                // Reset Message Fields, Keeping Roofer # intact
                setMessage((prevState) => ({
                    ...prevState,
                    message: {
                        ...prevState.message,
                        customerCell: "",
                        customerName: "",
                        body: "",
                    },
                }));
            })
            .catch((error) => {
                console.log("Error Creating New text message: ", error);

                setMessage({ ...message, submitting: false, error: true });

                chat.innerHTML +=
                    "<div class='mine messages'><div class='message last'>There was an error sending your message !! 😟 Please Call us at " +
                    businessInfo.businessCell +
                    "</div></div>";
            });
    };

    useEffect(() => {
        if (businessId) {
            db.collection("businesses")
                .doc(businessId)
                .get()
                .then((doc) => {
                    setBusinessExists(doc.exists);

                    setBusinessInfo({
                        businessId: businessId,
                        ...doc.data(),
                    });

                    setMessage((prevState) => ({
                        ...prevState,
                        message: {
                            ...prevState.message,
                            rooferCell: doc.data()
                                ? doc.data().businessCell
                                : "",
                        },
                    }));
                })
                .catch((error) => {
                    console.log("error geting business info: ", error);
                });
        }

        return () => setBusinessExists(false);
    }, []);

    if (!businessInfo) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                }}
            >
                <Skeleton variant="rectangular" width={350} height={218} />
            </div>
        );
    }

    if (!businessExists) {
        return <Redirect to="/page-not-found/404" />;
    }

    if (businessInfo?.isBlocked) {
        return <Blocked />;
    }

    return (
        <>
            <NavBar businessInfo={businessInfo} />
            <div className="landing-container">
                <div id="response_div"></div>
                <div className="chat-container">
                    <header>
                        <h2>Text Message Contact Form</h2>

                        <div className="input-wrapper">
                            <TextField
                                className="input"
                                label="Your Name"
                                type="text"
                                name="customerName"
                                placeholder="Enter your Name"
                                value={message.message.customerName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-wrapper">
                            <TextField
                                className="input"
                                type="tel"
                                label="Your Phone Number"
                                name="customerCell"
                                id="cellphone"
                                placeholder="NO Spaces, Dashes, or Parantheses"
                                value={message.message.customerCell}
                                onChange={handleChange}
                                inputProps={{ maxLength: 10 }}
                            />
                        </div>
                        <div className="input-wrapper">
                            <TextField
                                id="msg"
                                className="msg-input"
                                label="Your Message"
                                variant="outlined"
                                name="body"
                                placeholder="Enter Message (100 Characters Max)"
                                value={message.message.body}
                                onChange={handleChange}
                                inputProps={{ maxLength: 100 }}
                                multiline
                            />
                        </div>
                        <div
                            className="send-button"
                            id="twilio-contact-form-submit"
                            onClick={handleSubmit}
                        >
                            Send
                        </div>
                    </header>
                    <div className="chat">
                        <div className="mine messages">
                            <div className="message">
                                Welcome to {businessInfo.businessName}! Send us
                                a text message below and we will get in touch
                                with you shortly.
                            </div>
                            <div className="message last">
                                Include your name and your Cellphone number.
                            </div>
                        </div>
                    </div>
                    <div className="msg-input-container"></div>

                    <div className="footer">
                        <p className="signature">
                            Powered by SmartSeed Technologies
                        </p>
                        <p>Copyright &copy; 2023</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
