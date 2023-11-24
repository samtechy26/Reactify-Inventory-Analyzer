import useSWR from "swr";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { useTheme } from '@mui/material/styles';

import Title from '../Title';
import { CssBaseline } from '@mui/material';

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

interface HouseCount {
  _id: string;
  count: number;
}

export default function Chart() {

  const theme  = useTheme()

  const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());


  const { data, error } = useSWR<HouseCount[]>(
    `http://127.0.0.1:8000/houses/town/count`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

const chartData = data.map((item) => ({
  name: item._id, // Assuming _id should be used as the name
  count: item.count, // Use the appropriate property as per your data structure
}));

  return (
    <>
      <Title>Houses Sold Per Town</Title>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={400} margin={{ top: 20, right: 30, left: 20, bottom: 50 }} data={chartData}>
          <XAxis dataKey="name" 
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
          angle={-45} 
          textAnchor="end" 
          tick={{ fontSize: 4 }}
          />
          <YAxis dataKey="count"
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
          />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )

}