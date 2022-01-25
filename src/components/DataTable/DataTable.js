import React, { useState } from 'react';
import { DataTable,
     TableContainer,
     Table, TableSelectRow,
     TableHead,TableToolbarSearch,
     TableRow,TableToolbarContent,
     TableHeader,TableBatchAction,
     TableBody,TableBatchActions, TableSelectAll, Button,
     TableCell,TableToolbar, Pagination } from 'carbon-components-react';
import {
      Delete16 as Delete,
      Save16 as Save,
      Download16 as Download,
    } from '@carbon/icons-react';
import './DataTable.scss';
const MyDataTable = (props) => {
  const totalItems = props.rows.length
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(5);
    let rowData ;
       rowData = props.rows.map(item =>{
        return{
          "id": item.ID.toString(),
          ...item
        }
      })

   return (
    <DataTable rows= {rowData.slice(
      firstRowIndex,
      firstRowIndex + currentPageSize
     )}
    headers={props.headerData}
    isSortable
    >
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getToolbarProps,
      getBatchActionProps,
      onInputChange,
      selectedRows,
      getTableProps,
      getTableContainerProps,
    }) => {
      const batchActionProps = getBatchActionProps();

      return (
        <TableContainer
          {...getTableContainerProps()}>
          <TableToolbar {...getToolbarProps()}>
            <TableBatchActions {...batchActionProps}>
              {selectedRows.length === 1 && <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={Delete}
                onClick={()=>props.deleteSelectedRows(selectedRows)}>
                Delete
              </TableBatchAction>}
              {selectedRows.length === 1 && <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={Save}
                onClick={()=>props.updateSelectedRow(selectedRows)}>
                Update
              </TableBatchAction>}
              <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={Download}
                onClick={() =>console.log("batchActionClick(selectedRows)")}>
                Download
              </TableBatchAction>
            </TableBatchActions>
            <TableToolbarContent
              aria-hidden={batchActionProps.shouldShowBatchActions}>
              {!props.noFilter && <TableToolbarSearch
                persistent="true"
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                onChange={onInputChange}
              />}
             {!props.noAddButton && <Button
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                onClick={()=>props.addNew(true)}
                size="small"
                kind="primary">
                Add New
              </Button>}
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {!props.noSelection && <TableSelectAll {...getSelectionProps()} />}
                {headers.map((header, i) => (
                  <TableHeader key={i} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i} {...getRowProps({ row })}>
                  {!props.noSelection && <TableSelectRow {...getSelectionProps({ row })} />}
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!props.noPaging &&<Pagination
          totalItems={totalItems}
          backwardText="Previous page"
          forwardText="Next page"
          pageSize={currentPageSize}
          pageSizes={[5,10,25,50,100]}
          itemsPerPageText="Items per page"
           onChange={({ page, pageSize }) => {
            if (pageSize !== currentPageSize) {
             setCurrentPageSize(pageSize);
              }
            setFirstRowIndex(pageSize * (page - 1));
             }}
          />}
        </TableContainer>
      );
    }}
  </DataTable>
   )
}

export default MyDataTable;