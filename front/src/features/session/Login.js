import React from "react";
import { Link } from 'react-router-dom';
import { Box, Text, TextInput, Button, Heading, Header } from "grommet";
import { useHistory } from "react-router-dom";
import fire from "../../fire"

const Login = () => {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [alert, setalert] =React.useState();
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password)
          .catch((error) => {
           setalert('Incorrect username or password');
          })
          .then(response => {
            history.push('/') 
        })
        }

    return(
        <Box fill align="center" justify="center" gap="medium">
            <Header align="center" direction="row" flex={false} justify="between" gap="medium">
                <Heading color="#4F5182">Login</Heading>
            </Header>
            <Box width="small" gap="small">
                <TextInput type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <TextInput type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            </Box>
            {alert && (
                <Text color="red">{alert}</Text>
            )}
            <Button label="Login" onClick={(e)=> handleSubmit(e)} />
            <Box align="center" justify="between" direction="row-responsive" wrap="true" width="medium" pad="large" alignContent="center">
                <Text align="center">No account yet ? </Text><Link color='#ffffff' to="/signup"><Button label="Signup" /></Link>
            </Box>
        </Box>
    )
}

export default Login