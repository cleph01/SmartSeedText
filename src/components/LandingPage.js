import "../lib/css/landing-page.scss";

function LandingPage() {
    return (
        <div className="landing-container">
            <div id="response_div"></div>
            <div className="chat-container">
                <header>
                    <h2>Text Message Contact Form</h2>
                    <div className="input-wrapper">
                        <label className="input-label" for="your_name">
                            Potential Customer Name
                        </label>
                        <input
                            type="text"
                            name="your_name"
                            id="your_name"
                            placeholder="Enter your Name"
                        />
                    </div>
                    <div className="input-wrapper">
                        <label className="input-label" for="cellphone">
                            Potential Customer Cell Number
                        </label>
                        <input
                            type="tel"
                            name="cellphone"
                            id="cellphone"
                            placeholder="Enter your Cellphone"
                        />
                    </div>
                    <div className="input-wrapper">
                        <label className="input-label" for="cellphone">
                            Business Owner Cell Number
                        </label>
                        <input
                            id="sender_num"
                            type="tel"
                            maxlength="10"
                            placeholder="Enter Cell # To Receive Test Msg"
                        />
                    </div>
                </header>
                <div className="chat">
                    <div className="mine messages">
                        <div className="message">
                            Welcome to Valley Roofing and Siding! Send us a text
                            message below and Chris will get in touch with you
                            shortly.
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
                        type="text"
                        maxlength="100"
                        placeholder="Enter Message (100 Characters Max)"
                    />

                    <div
                        className="send-button"
                        id="twilio-contact-form-submit"
                        onclick="submit_twilio_contact_form()"
                    >
                        Send
                    </div>
                </div>
                <div className="send-button" onclick="showVW()">
                    Show VW
                </div>

                <div className="footer">
                    <p class="signature">Powered by SmartSeed Technologies</p>
                    <p>Copyright &copy; 2021</p>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
