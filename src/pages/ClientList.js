import React, { useState, useEffect, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import EditModal from "../components/modals/EditModal";
import BlockModal from "../components/modals/BlockModal";
import DeleteModal from "../components/modals/DeleteModal";
import ToolTip from "../components/ToolTip";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Divider from "@mui/material/Divider";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { db } from "../services/firebase/firebase-config";

import "../lib/css/pages/client-list.scss";

function ClientList() {
    const { userId } = useParams();

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openBlockModal, setOpenBlockModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [businesses, setBusinesses] = useState();
    const [targetBusiness, setTargetBusiness] = useState();

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [alertMsg, setAlertMsg] = useState({
        message: "",
        severity: "success",
    });

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackBar(false);
    };

    useEffect(() => {
        db.collection("businesses")
            .where("salespersonId", "==", userId)
            .get()
            .then((querySnapshot) => {
                setBusinesses(
                    querySnapshot.docs.map((doc) => ({
                        businessId: doc.id,
                        ...doc.data(),
                    }))
                );
            })
            .catch((error) => {
                console.log("Error Getting businesses: ", error);
            });
    }, []);

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    console.log("businesses: ", businesses);

    if (!businesses) {
        return <div>Loading... </div>;
    }
    return (
        <div className="client-list-container">
            <div className="inner-wrapper">
                <h2>Paying Clients</h2>

                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                    }}
                >
                    <Divider />
                    {businesses.map((business, i) => (
                        <div key={business.businessId}>
                            <ListItem divider>
                                <ListItemAvatar>
                                    <Avatar src={business.logoUrl} />
                                </ListItemAvatar>
                                <ListItemText primary={business.businessName} />
                                <div
                                    style={{
                                        display: "flex",
                                        alignContent: "flex-end",
                                        justifyContent: "space-between",
                                        marginRight: "-20px",
                                    }}
                                >
                                    <IconButton>
                                        <CopyToClipboard
                                            text={business.textPageUrl}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "flex-end",
                                                    mt: 2,
                                                }}
                                            >
                                                <ToolTip
                                                    content="Copied!"
                                                    direction="top"
                                                >
                                                    <ContentCopyIcon
                                                        sx={{
                                                            color: "action.active",
                                                            mr: 1,
                                                            my: 0.5,
                                                        }}
                                                    />
                                                </ToolTip>
                                            </Box>
                                        </CopyToClipboard>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setTargetBusiness({ ...business });
                                            setOpenEditModal(true);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setTargetBusiness({
                                                businessId: business.businessId,
                                                isBlocked: business.isBlocked,
                                            });
                                            setOpenBlockModal(true);
                                        }}
                                    >
                                        {business.isBlocked ? (
                                            <CheckIcon />
                                        ) : (
                                            <BlockIcon />
                                        )}
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setTargetBusiness(
                                                business.businessId
                                            );
                                            setOpenDeleteModal(true);
                                        }}
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </div>
                            </ListItem>
                        </div>
                    ))}
                </List>
            </div>
            <EditModal
                openEditModal={openEditModal}
                setOpenEditModal={setOpenEditModal}
                targetBusiness={targetBusiness}
                setBusinesses={setBusinesses}
                setOpenSnackBar={setOpenSnackBar}
                setAlertMsg={setAlertMsg}
            />
            <BlockModal
                openBlockModal={openBlockModal}
                setOpenBlockModal={setOpenBlockModal}
                targetBusiness={targetBusiness}
                setOpenSnackBar={setOpenSnackBar}
                setAlertMsg={setAlertMsg}
                setBusinesses={setBusinesses}
                isBlocked={targetBusiness?.isBlocked}
            />
            <DeleteModal
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                targetBusiness={targetBusiness}
                setOpenSnackBar={setOpenSnackBar}
                setAlertMsg={setAlertMsg}
                setBusinesses={setBusinesses}
            />

            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                >
                    <Alert
                        onClose={handleCloseSnackBar}
                        severity={alertMsg.severity}
                        sx={{ width: "100%" }}
                    >
                        {alertMsg.message}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    );
}

export default ClientList;
