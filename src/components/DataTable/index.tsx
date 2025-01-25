import React, { FC, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.less'
import SearchInput from './SearchInput';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2f3032' },
    // secondary: { main: '#f48fb1' },
    background: { default: 'rgba(255, 255, 255, 0.06)', paper: '#2f3032' },
    // text: { primary: '#fff', secondary: 'rgba(255, 255, 255, 0.7)' },
  },
});

const columns: GridColDef[] = [
  { field: 'uid', headerName: 'User Id' },
  { field: 'lamport_id', headerName: 'Lamport Id', minWidth: 150 },
];

const paginationModel = { page: 0, pageSize: 15 };

const DataTable : FC<{isShow: boolean, data: any}> = ({isShow, data}) => {
  const [inputVal, setInputVal] = React.useState('');
  const [gridData, setGridData] = useState([])
  console.log('gr', data)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputVal(val);
    
  }

  useEffect(() => {
    if(inputVal){
      if(gridData){
        const filterData = gridData.filter((itm: any) => {
          return itm.uid.includes(inputVal) || itm.lamport_id.includes(inputVal)
        })  
        setGridData(filterData)
      }
    } else {
      setGridData(data)
    }
  }, [inputVal])

  useEffect(() => {
    setGridData(data)
  }, [data])

  return (
    <ThemeProvider theme={darkTheme}>
      {
        isShow ? (
          <div className="table-container" >
            <SearchInput value={inputVal} onChange={(e) => onInputChange(e)} />
            <Paper className='paper'>
              <DataGrid
                rows={gridData}
                getRowId={(row) => row.uid}
                disableColumnMenu={true}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[15]}
                sx={{
                  border: 0,
                  '.MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 600,
                  },
                  '.MuiDataGrid-cell': {
                    fontWeight: 100,
                    fontSize: 12,
                    opacity: 0.8,
                  }
                }}
              />
            </Paper>
          </div>
        ) : null
      }
    </ThemeProvider>
    
  );
}

export default DataTable;