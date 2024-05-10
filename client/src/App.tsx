import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import routes from "./routes";
import EmptyLayout from "./layouts/EmptyLayout";
import { createContext } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "./shared/services/authen/config";

export const MyContext = createContext({
  accountList: [
    { id: "", role: "admin", email: "admin@gmail.com", password: "123456" },
    { id: "1", role: "hr", email: "hr@gmail.com", password: "123456" },
    { id: "1", role: "user", email: "user@gmail.com", password: "123456" },
  ],
});

function App() {
  const accountList = [
    { role: "admin", id: "", email: "admin@gmail.com", password: "123456" },
    { role: "hr", id: "1", email: "hr@gmail.com", password: "123456" },
    { role: "user", id: "1", email: "user@gmail.com", password: "123456" },
  ];

  return (
    <Auth0Provider
    domain={AUTH0_DOMAIN}
    clientId={AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}>
      <MyContext.Provider value={{ accountList: accountList }}>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              const Layout = route.layout || EmptyLayout;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            {/*  */}
            <Route path="*" element={<Navigate to="/" />} />
            {/* <Route path="*" element={<Navigate to="/error-path" />} /> */}
            {/* <Route path="*" element={<Navigate to="/quan-ly-cv" />} /> */}
          </Routes>
        </Router>
    </MyContext.Provider>
    </Auth0Provider>
    
  );
}

export default App;
