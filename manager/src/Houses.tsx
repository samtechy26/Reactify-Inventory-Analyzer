import {
  Datagrid,
  DateField,
  List,
  Show,
  Edit,
  Create,
  TextInput,
  DateInput,
  NumberInput,
  SimpleShowLayout,
  SimpleForm,
  NumberField,
  TextField,
} from "react-admin";

// const postFilters = [
//     <TextInput source="town" label="Search" alwaysOn />,
// ];

export const HouseList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <DateField source="list_year" />
      <DateField source="date_recorded" />
      <TextField source="town" />
      <TextField source="address" />
      <NumberField source="proposed_value" />
      <NumberField source="sale_amount" />
      <TextField source="property_type" />
    </Datagrid>
  </List>
);

export const HouseShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <DateField source="list_year" />
      <DateField source="date_recorded" />
      <TextField source="town" />
      <TextField source="address" />
      <NumberField source="proposed_value" />
      <NumberField source="sale_amount" />
      <TextField source="property_type" />
    </SimpleShowLayout>
  </Show>
);

export const HouseEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" InputProps={{disabled:true}} />
      <DateInput source="list_year" />
      <DateInput source="date_recorded" />
      <TextInput source="town" />
      <TextInput source="address" multiline rows={5} />
      <NumberInput source="proposed_value" />
      <NumberInput source="sale_amount" />
      <TextInput source="property_type" />
    </SimpleForm>
  </Edit>
);

export const HouseCreate = () => (
    <Create>
      <SimpleForm>
        <DateInput source="list_year" />
        <DateInput source="date_recorded" />
        <TextInput source="town" />
        <TextInput source="address" multiline rows={5} />
        <NumberInput source="proposed_value" />
        <NumberInput source="sale_amount" />
        <TextInput source="property_type" />
      </SimpleForm>
    </Create>
  );
