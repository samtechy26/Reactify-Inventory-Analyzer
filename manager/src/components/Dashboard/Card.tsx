import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Card(prop: any) {
  const {title, quantity} = prop

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="p" variant="h4">
        {quantity}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View all
        </Link>
      </div>
    </React.Fragment>
  );
}