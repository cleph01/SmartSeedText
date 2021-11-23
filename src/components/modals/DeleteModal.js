import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "../../lib/css/modals/delete-modal.scss";

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

function DeleteModal({
    openDeleteModal,
    setOpenDeleteModal,
    targetBusiness,
    setOpenSnackBar,
    setAlertMsg,
    setBusinesses,
}) {
    const handleDelete = () => {
        db.collection("businesses")
            .doc(targetBusiness)
            .delete()
            .then(() => {
                setBusinesses((prevState) => {
                    return prevState.filter(
                        (business) => business.businessId !== targetBusiness
                    );
                });
                setAlertMsg({
                    message: "Successfully Deleted Record",
                    severity: "success",
                });
                setOpenSnackBar(true);
            })
            .catch((error) => {
                setAlertMsg({
                    message: "Error Deleting Record",
                    severity: "error",
                });
                setOpenSnackBar(true);

                console.log("Error deleting Record: ", error);
            });

        setOpenDeleteModal(false);
    };

    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    return (
        <Modal
            open={openDeleteModal}
            onClose={handleCloseDeleteModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    sx={{ textAlign: "center", borderColor: "#f0f0f0" }}
                >
                    Delete Client from Database
                </Typography>
                <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, textAlign: "center" }}
                >
                    Are You Sure?
                </Typography>

                <h3>Cannot Be Reversed</h3>
                <div className="btn-wrapper">
                    <div className="delete-btn" onClick={handleDelete}>
                        Delete
                    </div>
                    <div
                        className="cancel-btn"
                        onClick={handleCloseDeleteModal}
                    >
                        Cancel
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

export default DeleteModal;
