import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const API_URL: string = (import.meta.env.VITE_API_URL as string);

const col_name = [ "BranchName","Year","Month","ProjectName","Categoria","RiskCategory","RiskItem","Maturity","Status","Reasons","Actions"]

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'BranchName',
    headerName: 'Branch Name',
    width: 150,
    editable: true,
  },
  {
    field: 'Date',
    headerName: 'Date',
    type: 'date',
    width: 80,
    editable: true,
    valueGetter: (params: GridValueGetterParams) => {
      const month = params.row.Month ;
      const year = params.row.Year;
      const date_str =  month + "-" + year;
      const date  = new Date(date_str);
      return date;
    },
  },
  {
    field: 'ProjectName',
    headerName: 'Project Name',
    width: 250,
    editable: true,
  },
  {
    field: 'Categoria',
    headerName: 'Category',
    width: 120,
    editable: true,
  },
  {
    field: 'RiskCategory',
    headerName: 'Risk Category',
    width: 150,
    editable: true,
  },
  {
    field: 'RiskItem',
    headerName: 'Risk Item',
    width: 150,
    editable: true,
  },
  {
    field: 'Maturity',
    headerName: 'Maturity',
    width: 120,
    editable: true,
  },
  {
    field: 'Status',
    headerName: 'Status',
    width: 120,
    editable: true,
  }
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },  
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

async function getRows(){
  const headers = {
    'Content-Type': 'application/json',
    'Connection':'keep-alive'
  };

  const response = await fetch(API_URL + '/data', {
    method: 'GET',
    headers: headers,
  });
  
  const data = await response.json();
    // Add the index of each row as its `id` property

  // Add the index of each row as its `id` property
  let rows = JSON.parse(data['body']).map((row: any, index: number) => {
      return {
        ...row,
        id: index.toString()
      };
  });
  return rows;  
}

let rows = await getRows();

console.log(rows);


export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}