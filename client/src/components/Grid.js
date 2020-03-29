import React, { Component } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import '../utils/grid.css';

export default class GridComp extends Component {
  constructor(props) {
    super(props);

    this.handleGridReady = this.handleGridReady.bind(this);
    this.handleGridSizeChanged = this.handleGridSizeChanged.bind(this);
  }

  handleGridReady(event) {
    event.api.sizeColumnsToFit();
  }

  handleGridSizeChanged(event) {
    event.api.sizeColumnsToFit();
  }

  handleRowDataChanged(event) {
    //debugger;
  }

  render() {
    console.log(this.props);

    return(
      <div className="grid-wrapper">
        <div className="ag-theme-balham" style={{height: '100%', width: '100%'}}>
          <AgGridReact 
            columnDefs={this.props.columnDefs}
            rowData={this.props.rowData}
            frameworkComponents={this.props.frameworkComponents}

            enableRtl={true}
            rowHeight={50}

            onGridReady={this.handleGridReady}
            onGridSizeChanged={this.handleGridSizeChanged}
            onRowDataChanged={this.handleRowDataChanged}
          />
        </div>
      </div>
    )
  }
};