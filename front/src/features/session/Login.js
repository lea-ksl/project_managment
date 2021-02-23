import React from "react";

import { Box, Text, TextInput, Button } from "grommet";

import fire from "../../fire"

const Login = () => {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [alert, setalert] =React.useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password)
          .catch((error) => {
           setalert('Incorrect username or password');
          });
        }

    return(
        <Box fill align="center" justify="center" background="back" gap="medium">
            Login
            <Box width="small" gap="small">
                <TextInput type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <TextInput type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            </Box>
            

            {alert && (
                <Text color="red">{alert}</Text>
            )}

            <Button margin="small" label="ok" onClick={(e)=> handleSubmit(e)} />
        </Box>
    )
}

export default Login