import React from 'react';
import useSWR from "swr";
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from '../Title';

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

interface HouseCount {
  _id: string;
  count: number;
}

export default function MyBarChart() {
  const theme = useTheme();

  const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());


  const { data, error } = useSWR<HouseCount[]>(
    `http://127.0.0.1:8000/houses/type/count`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const chartData = data.map((item) => ({
    name: item._id, // Assuming _id should be used as the name
    count: item.count, // Use the appropriate property as per your data structure
  }));

  return (
    <React.Fragment>
      <Title>Property Types</Title>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          width={600} // Set the width
          height={400} // Set the height
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" tick={{ fontSize: 9 }}/>
          <YAxis dataKey="count" interval={0}/>
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill={theme.palette.primary.main} activeBar={<Rectangle fill="gray" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}