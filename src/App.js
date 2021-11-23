import { useReducer, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { UserContext } from "./contexts/UserContext";
import UserReducer from "./store/reducers/user-reducer/userReducer.js";

import useAuthListener from "./hooks/use-auth-listener";
import Skeleton from "@mui/material/Skeleton";

import * as ROUTES from "./routing/routes";
import * as COMPONENTS from "./routing/routeComponents";
import PrivateRoute from "./routing/PrivateRoute";
import IsUserLoggedIn from "./routing/IsUserLoggedIn";

import "./App.css";

const initialState = {
    userId: null,
};

function App() {
    const [userState, userDispatch] = useReducer(UserReducer, initialState);

    const { authUser } = useAuthListener();

    console.log("AuthUser at App: ", authUser);

    return (
        <div className="App">
            <UserContext.Provider value={{ userState, userDispatch }}>
                <Router>
                    <Suspense
                        fallback={
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "10px",
                                }}
                            >
                                <Skeleton
                                    variant="rectangular"
                                    width={350}
                                    height={218}
                                />
                            </div>
                        }
                    >
                        <Switch>
                            <IsUserLoggedIn
                                authUser={authUser}
                                path={ROUTES.LOGIN}
                                loggedInPath={ROUTES.DEMO_HOME}
                            >
                                <COMPONENTS.Login />
                            </IsUserLoggedIn>

                            <PrivateRoute
                                path={ROUTES.DEMO_HOME}
                                authUser={authUser}
                            >
                                <COMPONENTS.DemoHome />
                            </PrivateRoute>

                            <Route
                                exact
                                path={ROUTES.MAIN}
                                component={COMPONENTS.LiveTextPage}
                            />
                            <Route>
                                <COMPONENTS.NotFound />
                            </Route>
                        </Switch>
                    </Suspense>
                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default App;
