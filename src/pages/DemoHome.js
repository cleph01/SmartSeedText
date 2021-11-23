import { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";

import DemoNavBar from "../components/DemoNavBar";

import AddBusiness from "../pages/AddBusiness";
import Text from "../pages/Text";
import ClientList from "../pages/ClientList";

import { UserContext } from "../contexts/UserContext";

import { db } from "../services/firebase/firebase-config";

import "../lib/css/pages/demo-home.scss";

function Demo({ authUser }) {
    const { userState, userDispatch } = useContext(UserContext);

    const [user, setUser] = useState();

    useEffect(() => {
        // Try and Refactor with Async/Await

        // Check if User Exists

        if (!userState.userId) {
            db.collection("users")
                .doc(authUser.uid)
                .get()
                .then((user) => {
                    // If User exists,
                    //Set User Context with Reducer

                    if (user.exists) {
                        userDispatch({
                            type: "USER/SET_EXISTING_USER",
                            payload: {
                                userId: user.id,
                                role: user.data().role,
                                displayName: user.data().displayName,
                            },
                        });

                        setUser({ userId: user.id, role: user.data().role });
                    } else {
                        // If doesn't Exist, Create New User and set State with Reducer

                        const newUserData = {
                            displayName: authUser.email,
                            avatarUrl: authUser.photoURL,
                            role: "0",
                            email: authUser.email,
                            phoneNumber: authUser.phoneNumber,
                            timestamp: Date.now(),
                            userId: authUser.uid,
                        };

                        db.collection("users")
                            .doc(authUser.uid)
                            .set(newUserData)
                            .then((docRef) => {
                                userDispatch({
                                    type: "USER/CREATE_NEW_USER",
                                    payload: newUserData,
                                });

                                setUser(newUserData);

                                console.log(
                                    "Created User with Id: ",
                                    authUser.uid
                                );
                            })
                            .catch((error) => {
                                console.log("Error Creating New User: ", error);
                            });
                    }
                })
                .catch((error) => {
                    console.log("Error Checking User Exists: ", error);
                });
        }
        return () => {
            setUser(null);
        };
    }, []);

    console.log("User State: ", userState);
    return (
        <div
            className="landing-container"
            style={{ backgroundImage: 'url("/logo192.png")' }}
        >
            <DemoNavBar user={userState} />

            <Route path="/demo/text">
                <Text user={userState} />
            </Route>

            <Route path="/demo/business/add/:userId">
                <AddBusiness user={userState} />
            </Route>

            <Route path="/demo/clients/all/:userId">
                <ClientList user={userState} />
            </Route>
        </div>
    );
}

export default Demo;
