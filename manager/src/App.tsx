import {
  Admin,
  defaultTheme,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import HouseIcon from '@mui/icons-material/House';
import { HouseList, HouseShow, HouseEdit, HouseCreate } from "./Houses";
// import { Dashboard } from "./BlankDashboard";
import Dashboard from "./components/Dashboard/Dashboard";
import { authProvider } from "./authProvider";
import indigo from '@mui/material/colors/indigo';
import pink from '@mui/material/colors/pink';
import red from '@mui/material/colors/red';



export const App = () => (

<Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
  <Resource
    name="houses"
    list={HouseList}
    show={HouseShow}
    edit={HouseEdit}
    create={HouseCreate}
    icon={HouseIcon}
   />  
</Admin>

)