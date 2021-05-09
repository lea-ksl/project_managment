import React, {useCallback} from 'react';
import { Box, TextInput, Text, Button, Header, Heading } from 'grommet';
import { useHistory } from "react-router-dom";
import fire from '../../fire';
import { addUser } from '../../services/usersService';

const Signup = () => {
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [error, setError] = React.useState();

    let history = useHistory();

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
       
        const result = await fire.auth().createUserWithEmailAndPassword(email, password)
        
            .catch((error) => {
                setError('error');
            })
            console.log(result);
            addUser(name, email, password)        
            .then(response => {
                history.push('/') 
            })
     });
    
    return (
      
        <Box fill align="center" justify="center" gap="small">
            <Header align="center" direction="row" flex={false} justify="between" gap="medium">
                <Heading color="#4F5182">Sign up</Heading>
            </Header>
            <Box width="small" gap="small">
                <TextInput type="text" placeholder="name" onChange={(e)=>setName(e.target.value)} />
                <TextInput type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
                <TextInput type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            </Box>
            {error && 
                <Text margin="small" color="red">{error}</Text>
            }
            <Button label="Sign up" onClick={(e) => handleSignUp(e)} />

        </Box>
    )
}

export default Signup;