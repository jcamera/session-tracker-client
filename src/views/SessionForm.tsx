import { TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SESSION_VALUES } from '../lib/types';
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import API from '../lib/API';
import Snackbar from '@mui/material/Snackbar';
import { Session, SessionStatus } from '../lib/types';


const LICENSE_PLATE_REGEX = /^[a-zA-Z0-9 ]+$/;

interface SessionFormProps {
    selectedRow: Session | undefined;
}

interface FormData {
    plate_number: string;
    status: SessionStatus | '';
};

export default function SessionForm({ selectedRow }: SessionFormProps) {

    const [formData, setFormData] = useState<FormData>({
        plate_number: '',
        status: '',
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [snackState, setSnackState] = useState<string>('');

    useEffect(
        () => {
            if (selectedRow) {
                setFormData(selectedRow);
                setIsEditMode(Boolean(selectedRow));
            }
        }, 
        [selectedRow]
    );

    const onChangeFormValue = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [fieldName]: (e.target as HTMLInputElement).value,
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEditMode && selectedRow) {
            await API.editSession({
                id: selectedRow.id,
                created_on: selectedRow.id,
                plate_number: formData.plate_number,
                status: formData.status as SessionStatus,
            }, () => {
                setSnackState('session saved');
            });
        }
        else {
            await API.createSession({
                plate_number: formData.plate_number,
                status: formData.status as SessionStatus, 
            }, () => {
                setSnackState('new session created');
            });
        }
        handleClear();
    }

    const handleClear = () => {
        setFormData({
            plate_number: '',
            status: '',
        });
        setIsEditMode(false);
    }

    const handleCloseSnackbar = () => {
        setSnackState('');
      };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <TextField 
                    type="text"
                    id="plate_number" 
                    name="plate_number" 
                    required
                    label="license plate"
                    fullWidth
                    className="formField"
                    value={formData?.plate_number}
                    onChange={onChangeFormValue('plate_number')}
                    inputProps={{ 
                        //pattern: "[A-Za-z0-9]", //isn't working, try using keydown
                        style: { 
                            textAlign: 'center',
                            textTransform: 'uppercase',
                        },
                        maxLength: 12,
                    }}
                    onKeyDown={e => {
                        if (!LICENSE_PLATE_REGEX.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                />
                <br/>
                <FormControl fullWidth className="formField">
                    <InputLabel id="status-label">status</InputLabel>
                    <Select 
                        labelId="status-label"
                        id="status"
                        name="status"
                        value={formData?.status}
                        // @ts-ignore
                        onChange={onChangeFormValue('status')}
                    >
                        <MenuItem value={SESSION_VALUES.ACTIVE}>ACTIVE</MenuItem>
                        <MenuItem value={SESSION_VALUES.COMPLETE}>COMPLETE</MenuItem>
                        <MenuItem value={SESSION_VALUES.CANCELLED}>CANCELLED</MenuItem>
                    </Select>
                </FormControl>
            
                <Button variant="contained" type="submit" className="formButton">
                    {isEditMode ? 'save session' : 'add session'}
                </Button>
                {
                    isEditMode ? (
                        <Button variant="outlined" className="formButton" onClick={handleClear}>
                            clear
                        </Button>
                    ) : null
                }

            </form>
            <Snackbar
                open={Boolean(snackState)}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message={snackState ?? ''}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
            </div>
    )
}