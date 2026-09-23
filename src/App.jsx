import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//react
import { useEffect, useState } from "react";

//material ui components
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

// external libaries
import axios from "axios";

const theme = createTheme({
  typography: {
    fontFamily: "Tajawal",
  },
});

function App() {
  const [temp, setTemp] = useState({
    number: null,
    discription: "",
    min: null,
    max: null,
    icon: null,
  });

  let cancelAxios = null;
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=33.510414&lon=36.278336&appid=29fda52877ac3347b95230ca9d75ad08",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        },
        {
          params: {
            postId: 5,
          },
        },
      )
      .then((response) => {
        const responseTemp = Math.round(response.data.main.temp - 273.15);
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const discription = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          discription: discription,
          min: min,
          max: max,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });

        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      console.log("cancel axios");
      cancelAxios();
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" style={{}}>
          {/* content container */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* card */}
            <div
              dir="rtl"
              style={{
                background: "rgb(28 52 91 /36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 15px 1px rgba(0,0,0,0.05)",
                width: "100%",
              }}
            >
              {/* content */}
              <div style={{}}>
                {/* city & time */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir="rtl"
                >
                  <Typography
                    variant="h1"
                    style={{ marginRight: "20px", fontWeight: "600" }}
                  >
                    دمشق
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    الاثنين 10/10/2026
                  </Typography>
                </div>
                {/*=== city & time=== */}
                <hr />
                {/* container of degree + icon */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* degree & discription */}
                  <div>
                    {/* temp */}
                    <div
                      style={{
                        display:"flex",
                        justifyContent: "center",
                        alignItems: "center",
                       
                       
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}°
                      </Typography>
                      <img src={temp.icon}  />
                    </div>
                    {/*=== temp ===*/}
                    <Typography variant="h6" style={{}}>
                      {temp.discription}
                    </Typography>
                    {/* min & max */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>الصغرى: {temp.min}°</h5>
                      <h5 style={{ margin: "0px 5px" }}>|</h5>
                      <h5>العظمى: {temp.max}°</h5>
                    </div>
                  </div>
                  {/*=== degree & discription=== */}
                  <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
                {/*=== container of degree + icon ===*/}
              </div>
              {/*=== content ===*/}
            </div>
            {/*=== card === */}

            {/* transilation container */}
            <div
              dir="rtl"
              style={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button variant="text" style={{ color: "white" }}>
                Text
              </Button>
            </div>
            {/* === transilation container ===*/}
          </div>
          {/*=== content container=== */}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
