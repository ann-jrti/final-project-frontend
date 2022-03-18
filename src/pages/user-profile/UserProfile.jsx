import { Typography, Grid, Avatar } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { UserContext } from "../../context/user-context/user-context";
import { useContext } from "react";

export default function UserProfile() {
    const [isLogged, setIsLogged] = useContext(UserContext);
    const userEmail = localStorage.getItem('email');
    const userName = localStorage.getItem('username');
    return (
        <Grid container>
            <Typography>Hi {userName}!</Typography>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </Grid>
    )
}