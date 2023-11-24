import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Chart from "./Charts/Chart";
import MyBarChart from "./Charts/MyBarChart";
import MyVerticalComposedChart from "./Charts/MyVerticalComposedChart";
import Card from "./Card";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Sam Akan Admin Inventory
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface PropertyCounts {
  total: number;
  townsCount: number;
  propertyTypesCount: number;
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const apiUrl = process.env.VITE_SIMPLE_REST_URL;
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [propertyCounts, setPropertyCounts] = useState<PropertyCounts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/houses/summary');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        setPropertyCounts(data);
        console.log(propertyCounts)
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {/* <Toolbar /> */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              
            {propertyCounts && (
              <>
                <Grid item xs={12} lg={4}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                    <Card title="Total Houses" quantity={propertyCounts.total} />
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                    <Card title="Total Towns" quantity={propertyCounts.townsCount} />
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                    <Card title="Property Types" quantity={propertyCounts.propertyTypesCount} />
                  </Paper>
                </Grid>
              </>
            )}
                
              
              {/* Chart */}

              {/* Recent Orders */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 440,
                  }}
                >
                  <MyBarChart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 440,
                  }}
                >
                  <MyVerticalComposedChart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 440,
                    width: "100%",
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
