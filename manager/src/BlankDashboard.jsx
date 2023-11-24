import { Card, CardContent, CardHeader } from "@mui/material";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const chartData = {
    datasets: [{
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: [10, 20, 30, 40, 50, 60, 70]
    }]
};


export const Dashboard = () => (

    
    <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>

            <Doughnut data={chartData} />
            {/* <Bar data={chartData}/> */}
        
        </Grid>
    </Grid>
    
);
