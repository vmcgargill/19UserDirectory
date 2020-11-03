import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import Select from "react-dropdown-select";
import Employees from './Employees'
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState(Employees);

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const options = [
      {value: "Executive", label: "Executive"},
      {value: "Human Resources", label: "Human Resources"},
      {value: "Management", label: "Management"},
      {value: "IT", label: "IT"},
      {value: "Sales", label: "Sales"},
      {value: "Production", label: "Production"},
      {value: "All", label: "All"}
    ]
  
    const setValues = (values) => {
      const value = values[0].value
      if (value === "All") {
        setRowData(Employees)
      } else {
        const filterEmployees = Employees.filter((employee) => {
          return employee.department == value;
        });
        setRowData(filterEmployees)
      }
    }

    return (
        <div className="ag-theme-alpine" style={ { height: 525 } }>
          <Select options={options} placeholder="Select to filter employees by department" onChange={(value) => setValues(value)}/><br/>
          <AgGridReact
              onGridReady={onGridReady}
              rowData={rowData}>
              <AgGridColumn field="name"></AgGridColumn>
              <AgGridColumn field="title"></AgGridColumn>
              <AgGridColumn field="department"></AgGridColumn>
              <AgGridColumn field="salary"></AgGridColumn>
              <AgGridColumn field="phone"></AgGridColumn>
              <AgGridColumn field="email"></AgGridColumn>
          </AgGridReact>
        </div>
    );
};

export default App;