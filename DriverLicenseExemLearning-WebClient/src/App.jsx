import './App.css'
import {LandingPage} from "./pages/LandingPage/LandingPage.jsx";
import "../public/css/style.css"
import '../public/css/bootstrap.min.css';
import {theme} from "./assets/theme/index.js";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Register.jsx";

function App() {
  return (
      <ThemeProvider theme={theme}>
          <BrowserRouter>
              <>
                  <Routes>
                      <Route path="/" element={<Outlet/>}>
                          <Route path="/" element={<LandingPage/>}/>
                          <Route path="/login" element={<Login/>}/>
                          <Route path="/register" element={<SignUp/>}/>
                      </Route>
                  </Routes>
              </>
          </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
