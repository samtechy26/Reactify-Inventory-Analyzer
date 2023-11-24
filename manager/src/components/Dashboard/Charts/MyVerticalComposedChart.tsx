import useSWR from "swr";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import Title from "../Title";

interface HouseCount {
  count: number;
  town: string;
  property_type: string;
}

interface TownsCount {
  town: string;
}

export default function MyVerticalComposedChart() {
  const theme = useTheme();
  const [town, setTown] = useState("Berlin");
  const [towns, setTowns] = useState<string[]>([]);

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, error } = useSWR<HouseCount[]>(
    `http://127.0.0.1:8000/houses/sample/${town}`,
    fetcher
  );

  const { data: townsData, error: townsError } = useSWR<TownsCount[]>(
    "http://127.0.0.1:8000/houses/towns",
    fetcher
  );

  useEffect(() => {
    if (townsData) {
      const townNamesArray = townsData.map((item) => item.town);
      setTowns(townNamesArray);
    }
  }, [townsData]);

  const chartData = data
    ? data.map((item) => ({
        count: item.count,
        town: item.town,
        property_type: item.property_type,
      }))
    : [];

  const handleTownChange = (event: SelectChangeEvent<string>) => {
    setTown(event.target.value);
  };

  if (error || townsError) {
    return <div>Failed to load data</div>;
  }

  return (
    <React.Fragment>
      {/* <Title>Today</Title> */}
      <div>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="town-select-label">Town</InputLabel>
          <Select
            labelId="town-select-label"
            id="town-select"
            value={town}
            label="Town"
            onChange={handleTownChange}
          >
            {towns.map((townOption) => (
              <MenuItem key={townOption} value={townOption}>
                {townOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <XAxis
            type="number"
            interval={0}
            angle={-45}
            textAnchor="end"
            tick={{ fontSize: 9 }}
          />
          <YAxis
            dataKey="property_type"
            type="category"
            scale="band"
            interval={0}
            textAnchor="end"
            tick={{ fontSize: 9 }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" barSize={20} fill={theme.palette.primary.main} />
        </ComposedChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
