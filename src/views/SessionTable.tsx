
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'; 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { SESSION_VALUES, Session } from '../lib/types';


const columns: GridColDef[] = [
    { 
        field: 'plate_number', 
        headerName: 'License Plate',
        width: 150,
        cellClassName: () => 'table-cell-license-plate',
    },
    { 
        field: 'status', 
        headerName: 'Status',
        width: 225,
        cellClassName: (params) => `table-cell-status-${params?.value}` 
    }
];

interface SessionTableProps {
    data: Array<Session>;
    setSelectedRow: Function;
    isLoading: boolean;
}

export default function SessionTable({data=[], setSelectedRow, isLoading}: SessionTableProps) {

    const [statusFilter, setStatusFilter] = useState('');

    const handleChangeStatusFilter = (e: React.ChangeEvent<{ value: string }>): void => {
        setStatusFilter(e.target.value);
    }

    const handleRowSelectionModelChange = (ids: GridRowSelectionModel) => {
        setSelectedRow( ids?.length > 0 ? ids[0] : null);
    }

    return (
        <div>
            <Box className="table-controls-container">
                <FormControl fullWidth size="small">
                    <InputLabel id="status-filter-select-label">status filter</InputLabel>
                    <Select 
                        labelId="status-filter-select-label"
                        id="status-filter-select"
                        value={statusFilter}
                        // @ts-ignore
                        onChange={handleChangeStatusFilter}
                    >
                        <MenuItem value=''>none</MenuItem>
                        <MenuItem value={SESSION_VALUES.ACTIVE}>active</MenuItem>
                        <MenuItem value={SESSION_VALUES.COMPLETE}>complete</MenuItem>
                        <MenuItem value={SESSION_VALUES.CANCELLED}>cancelled</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <DataGrid 
                rows={data || []} 
                columns={columns} 
                filterModel={{
                    items: [{
                        field: 'status',
                        operator: 'equals',
                        value: statusFilter
                    }],
                }}
                onRowSelectionModelChange={handleRowSelectionModelChange}
                initialState={{
                    pagination: { paginationModel: { pageSize: 15 } },
                }}
                loading={isLoading}
            />
        </div>
    )
}