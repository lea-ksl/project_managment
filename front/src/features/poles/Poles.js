import React from "react";
import fire from '../../fire.js';
import { useHistory, useParams } from "react-router-dom";
import { Box, Button, Text, TextInput, Form, FormField } from "grommet";
import { Refresh } from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import { getPoles } from "../../services/polesService";

import { useSelector, useDispatch } from 'react-redux';
import { update2, selectPoles } from './polesSlice';

function Poles ({}) {
  let history = useHistory()
  let projectId = useParams();

  const poles = useSelector(selectPoles);
  const dispatch = useDispatch();



  const [refresh, setrefresh] = React.useState(true);
    
  const user = fire.auth().currentUser;
 

  

  React.useEffect(() => {
    const fecthPoles = async () => {
        const fetchData = await getPoles(projectId.projectid);
        dispatch(update2(fetchData));
    }
    if (refresh) {
        fecthPoles();
        setrefresh(false);
    }
  }, [refresh])

  return(
    <Box align="center">
      
      <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
      <Card 
      round="medium" 
      padding="medium" 
      justify="center"
      align="center"
      margin="medium"
      width="medium"
      height="medium">
        {poles ? 
          poles.map(pole => (
            <CardConcave align="center"
            justify="center"
            round="medium"
            padding="medium"
            margin="small"
            width="small">
              <Text>{pole.title}</Text>
              <Text>{pole.desc}</Text>
            </CardConcave>
          ))
        : 
          <Text>Ceci sont les poles</Text>
        }
      </Card>
    </Box>
  )
}

export default Poles;