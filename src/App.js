import "/api/axiosDefaults";
import ProfilePage from "./pages/profiles/ProfilePage";
import { Route } from "react-router-dom";

function App() {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

    return (
        <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
    )
}

export default App;