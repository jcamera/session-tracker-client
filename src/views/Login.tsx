import { useState } from 'react';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import API from '../lib/API';

interface LoginProps {
    setIsLoggedIn: Function;
}

interface FormData {
    username: string;
    email: string;
    password: string;
};

export default function Login({setIsLoggedIn}: LoginProps) {

    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
    });


    const onChangeFormValue = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [fieldName]: (e.target as HTMLInputElement).value,
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({formData});

        const loginData = await API.login(formData);
        console.log({loginData});
        setIsLoggedIn(Boolean(loginData?.jwt));
        window.jwt = loginData?.jwt;
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <TextField 
                    type="text"
                    id="username" 
                    name="username" 
                    required
                    label="username"
                    fullWidth
                    className="formField"
                    //value={formData?.plate_number}
                    onChange={onChangeFormValue('username')}
                />
                <br/>
                <TextField 
                    type="email"
                    id="email" 
                    name="email" 
                    required
                    label="email"
                    fullWidth
                    className="formField"
                    onChange={onChangeFormValue('email')}
                />
                <TextField 
                    type="password"
                    id="password" 
                    name="password" 
                    required
                    label="password"
                    fullWidth
                    className="formField"
                    onChange={onChangeFormValue('password')}
                />
                
                <Button variant="contained" type="submit" className="formButton">
                    log in
                </Button>

            </form>
        </div>
    )
}