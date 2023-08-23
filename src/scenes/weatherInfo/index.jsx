import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";

const Weather = ({ city }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState("celsius");
  const [prevData, setPrevData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
      );

      const fetchedData = response.data;
      const prev = response.data.forecast.forecastday;
      setData(fetchedData);
      setPrevData(prev);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  if (!data) {
    return null;
  }

  const temperatureButtons = [
    { label: "Celsius", unit: "celsius" },
    { label: "Fahrenheit", unit: "fahrenheit" },
  ];

  const basicBox = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <Box
        sx={{
          flexDirection: "column",
        }}
        style={basicBox}
      >
        <Typography variant="h1">{data.location.name}</Typography>
        <Box style={basicBox}>
          <IconButton>
            <img
              src={data.current.condition.icon}
              alt="Weather icon"
              width={100}
            />
          </IconButton>
          <Typography variant="h3">
            {temp === "celsius"
              ? `${data.current.feelslike_c} °C `
              : temp === "fahrenheit"
              ? `${data.current.feelslike_f} °F`
              : null}
          </Typography>
        </Box>
        <Typography variant="h3">{data.current.condition.text}</Typography>
        <br />
        <Box>
          {temperatureButtons.map(({ label, unit }) => (
            <Button
              key={unit}
              onClick={() => setTemp(unit)}
              sx={{
                bgcolor: colors.blueAccent[600],
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: colors.blueAccent[400],
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Box>

      <Box style={basicBox} sx={{ margin: "2rem" }}>
        {prevData.map((row) => (
          <Box
            sx={{
              flexDirection: "column",
              margin: "8rem",
            }}
            style={basicBox}
            key={row.date_epoch}
          >
            <Typography variant="h1">{data.location.name}</Typography>
            <br />
            <Typography variant="h6">DATE : {row.date}</Typography>
            <Box style={basicBox}>
              <IconButton>
                <img
                  src={row.day.condition.icon}
                  alt="Weather icon"
                  width={100}
                />
              </IconButton>
              <Typography variant="h3">
                {temp === "celsius"
                  ? `${row.day.avgtemp_c} °C `
                  : temp === "fahrenheit"
                  ? `${row.day.avgtemp_f} °F`
                  : null}
              </Typography>
            </Box>
            <Typography variant="h3">{row.day.condition.text}</Typography>
            <br />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Weather;
