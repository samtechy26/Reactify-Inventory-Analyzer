import * as React from 'react';
import { useGetList } from 'react-admin';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { type } from 'os';


// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type House =  {
  id: string,
  list_year: Date,
  date_recorded: Date,
  town: string,
  address: string,
  proposed_value: number,
  sale_amount: number,
  property_type: string

}

export default function Orders() {

  const endDate = new Date(); // Set your desired end date (today)
  const startDate = new Date(endDate);
  startDate.setMonth(startDate.getMonth() - 6); // Subtract 6 months

  const { data: houses, total, isLoading, error } = useGetList<House>('houses', {
    pagination: { page: 1, perPage: 10 },
    // filter: { date_recorded: { $gte: startDate.toISOString(), $lt: endDate.toISOString() } }
  });

  if (isLoading) {
    return <p>Loading...</p>; // or some loading indicator
  }

  if (error || !houses) {
    return <p>Error fetching data</p>;
  }

  return (
    <React.Fragment>
      <Title>Recent Sales</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>List Year</TableCell>
            <TableCell>Date Recorded</TableCell>
            <TableCell>Town</TableCell>
            <TableCell>Address</TableCell>
            <TableCell >Proposed Value</TableCell>
            <TableCell >Sale Amount</TableCell>
            <TableCell >Property Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {houses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>No houses found</TableCell>
            </TableRow>
          ) : (
            houses.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.list_year instanceof Date
                    ? row.list_year.toLocaleString()
                    : 'Invalid Date'}
                </TableCell>
                <TableCell>
                  {row.date_recorded instanceof Date
                    ? row.date_recorded.toLocaleString()
                    : 'Invalid Date'}
                </TableCell>
                <TableCell>{row.town}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell >{`$${row.proposed_value}`}</TableCell>
                <TableCell>{row.sale_amount}</TableCell>
                <TableCell>{row.property_type}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}