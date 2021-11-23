import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import "../../lib/css/modals/edit-modal.scss";

import { db } from "../../services/firebase/firebase-config";

const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 355,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function EditModal({
    openEditModal,
    setOpenEditModal,
    targetBusiness,
    setOpenSnackBar,
    setAlertMsg,
    setBusinesses,
}) {
    console.log("Target Business: ", targetBusiness);

    const [newClientInfo, setNewClientInfo] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        setNewClientInfo({
            ...newClientInfo,
            [name]: event.target.value,
        });
    };

    const handleCloseEditModal = () => setOpenEditModal(false);

    const handleSubmit = () => {
        db.collection("businesses")
            .doc(targetBusiness.businessId)
            .update(newClientInfo)
            .then(() => {
                setBusinesses((prevState) => {
                    return prevState.map((business) => {
                        var temp = Object.assign({}, business);
                        if (business.businessId === targetBusiness.businessId) {
                            temp = { ...temp, newClientInfo };
                        }

                        return temp;
                    });
                });

                setAlertMsg({
                    message: `Successfully Updated Business Info`,
                    severity: "success",
                });

                setOpenSnackBar(true);
            })
            .catch((error) => {
                setAlertMsg({
                    message: "Error Updating Business Info",
                    severity: "error",
                });

                setOpenSnackBar(true);

                console.log("Error updating Text Page Url: ", error);
            });

        setOpenEditModal(false);
    };

    console.log("New Client INfo: ", newClientInfo);

    return (
        <Modal
            open={openEditModal}
            onClose={handleCloseEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="input-wrapper">
                    <h3 style={{ marginBottom: "35px" }}>
                        Edit Business Details
                    </h3>

                    <TextField
                        className="input"
                        label="Business Name"
                        type="text"
                        name="businessName"
                        placeholder="Enter New Business Name"
                        value={
                            newClientInfo.businessName ||
                            targetBusiness?.businessName
                        }
                        onChange={handleChange}
                        
                    />
                </div>
                <div className="input-wrapper">
                    <TextField
                        className="input"
                        label="Receiver of Text Message"
                        type="tel"
                        name="businessCell"
                        placeholder="Receiver of Text Message"
                        value={
                            newClientInfo.businessCell ||
                            targetBusiness?.businessCell
                        }
                        inputProps={{ maxLength: 10 }}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <TextField
                        className="input"
                        label="New Website Address"
                        type="text"
                        name="website"
                        placeholder="Enter Client Website Address"
                        value={newClientInfo.website || targetBusiness?.website}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <TextField
                        className="input"
                        label="URL of Logo"
                        type="text"
                        name="logoUrl"
                        placeholder="Enter Logo URL"
                        value={newClientInfo.logoUrl || targetBusiness?.logoUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <TextField
                        className="input"
                        label="Back Button Hex Code"
                        type="text"
                        name="backBtnColor"
                        placeholder="Enter Customer Name"
                        value={
                            newClientInfo.backBtnColor ||
                            targetBusiness?.backBtnColor
                        }
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <TextField
                        className="input"
                        label="Nav Bar Color Hex Code"
                        type="text"
                        name="navBarColor"
                        placeholder="Enter Nav Bar Color Hex Code"
                        value={
                            newClientInfo.navBarColor ||
                            targetBusiness?.navBarColor
                        }
                        onChange={handleChange}
                    />
                </div>

                <div className="btn-wrapper">
                    <div className="edit-btn" onClick={handleSubmit}>
                        Submit
                    </div>
                    <div className="cancel-btn" onClick={handleCloseEditModal}>
                        Cancel
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

export default EditModal;
