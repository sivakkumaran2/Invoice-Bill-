import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
    const handleLogout = () => {
        
        console.log("User logged out");
        
        window.location.href = "/login";
    };

    return (
        <AppBar position="static" sx={{ bgcolor: 'black' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                    INVOICE
                </Typography>
              
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
