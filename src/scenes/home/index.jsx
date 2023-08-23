import { TextField, useTheme, Button, Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import Weather from "../weatherInfo";
import axios from "axios";


const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [currentCity, setCurrentCity] = useState("")
  const [city, setCity] = useState("");
  const showWeather = true;



  useEffect(() => {
    fetchlocation();
    
  },[])

  useEffect(() => {
    setCity(currentCity)
  },[currentCity])

  const fetchlocation = async () => {

    const response  = await axios.get("https://ipapi.co/json")
    setCurrentCity(response.data.city)
  } 
  
  const center ={
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }

  return (
    <>
      <Box sx={{margin:"6rem"}}>

      <Typography variant="h2">Enter Your City Name</Typography>
      <br />
        <TextField
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
        />
        <Button
          
          sx={{
            bgcolor: colors.blueAccent[400],
            "&:hover": {
              cursor: "pointer",
              backgroundColor: colors.blueAccent[300],
            },
           
          }}
          style={center}

        >
          Search
        </Button>
        {showWeather && <Weather city={city} />}
      </Box>
    </>
  );
};

export default Home;
