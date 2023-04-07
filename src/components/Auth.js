import { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebase } from "../services/firebase/firebase-config";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Auth() {
    const [loadingUser, setLoadingUser] = useState(false);

    if (loadingUser) {
        return (
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <StyledFirebaseAuth
            uiConfig={{
                signInFlow: "redirect",
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                ],
                signInSuccessUrl: "/demo",
                callbacks: {
                    signInSuccessWithAuthResult: (authUser, redirectUrl) => {
                        setLoadingUser(true);

                        return false;
                    },
                },
            }}
            firebaseAuth={firebase.auth()}
        />
    );
}

export default Auth;
