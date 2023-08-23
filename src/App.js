import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Home from "./scenes/home";
import Weather from "./scenes/weatherInfo";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">

          <main className="content">
            <Topbar />

            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/weather-info" element={<Weather />} />

             
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
