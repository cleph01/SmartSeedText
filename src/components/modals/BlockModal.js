import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "../../lib/css/modals/block-modal.scss";

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

function BlockModal({
    openBlockModal,
    setOpenBlockModal,
    targetBusiness,
    setOpenSnackBar,
    setAlertMsg,
    setBusinesses,
    isBlocked,
}) {
    const handleBlock = () => {
        db.collection("businesses")
            .doc(targetBusiness.businessId)
            .update({
                isBlocked: !isBlocked,
            })
            .then(() => {
                setBusinesses((prevState) => {
                    return prevState.map((business) => {
                        var temp = Object.assign({}, business);
                        if (business.businessId === targetBusiness.businessId) {
                            temp.isBlocked = !isBlocked;
                        }

                        return temp;
                    });
                });

                setAlertMsg({
                    message: `Successfully ${
                        isBlocked ? "UnBlocked" : "Blocked"
                    } Business`,
                    severity: "success",
                });

                setOpenSnackBar(true);
            })
            .catch((error) => {
                setAlertMsg({
                    message: "Error Blocking Business",
                    severity: "error",
                });

                setOpenSnackBar(true);

                console.log("Error updating Text Page Url: ", error);
            });

        setOpenBlockModal(false);
    };

    const handleCloseBlockModal = () => setOpenBlockModal(false);

    return (
        <Modal
            open={openBlockModal}
            onClose={handleCloseBlockModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    sx={{ textAlign: "center", borderColor: "#f0f0f0" }}
                >
                    {isBlocked ? "UnBlock" : "Block"} Client
                </Typography>
                <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, textAlign: "center" }}
                >
                    Sure About Blocking Client?
                </Typography>

                <h3>Cannot Be Reversed</h3>
                <div className="btn-wrapper">
                    <div className="block-btn" onClick={handleBlock}>
                        Yes, {isBlocked ? "UnBlock" : "Block"}
                    </div>
                    <div className="cancel-btn" onClick={handleCloseBlockModal}>
                        Cancel
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

export default BlockModal;
