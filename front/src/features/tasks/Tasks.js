import React from "react";
import fire from '../../fire.js';

import { Box, Button, Text, TextInput, Form, FormField } from "grommet";
import { Refresh } from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import { addTask, getTasks } from "../../services/tasksService";

import { useSelector, useDispatch } from 'react-redux';
import { update, selectTasks } from './tasksSlice';

const Tasks = () => {

  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({    
    content: "",
    statut: "",
  });
  const {content, statut } = formData;

  const [refresh, setrefresh] = React.useState(true);
    
  const user = fire.auth().currentUser;
    
  const onSubmit = (e) => {
    e.preventDefault();
    addTask(content, statut).then(()=>setrefresh(true) )
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  React.useEffect(() => {
    const fecthTasks = async () => {
        const fetchData = await getTasks();
        dispatch(update(fetchData));
    }
    if (refresh) {
        fecthTasks();
        setrefresh(false);
    }
  }, [refresh])

  return(
    <Box align="center">
      <Form 
      className="" 
      onSubmit={(e) => onSubmit(e)}
      onReset={() => setFormData({})}>
        <FormField name="name" htmlFor="text-input-id">
          <TextInput
          placeholder="Content"
          value={content}
          name="content"
          className=""
          onChange={(e) => onChange(e)}
          required
          />
          <TextInput
          placeholder="Statut"
          value={statut}
          name="statut"
          className=""
          onChange={(e) => onChange(e)}
          required
          />
        </FormField>
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Form>
      <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
      <Card 
      round="medium" 
      padding="medium" 
      justify="center"
      align="center"
      margin="medium"
      width="medium"
      height="medium">
        {tasks ? 
          tasks.map(task => (
            <CardConcave align="center"
            justify="center"
            round="medium"
            padding="medium"
            margin="small"
            width="small">
              <Text>{task.content}</Text>
              <Text>{task.statut}</Text>
            </CardConcave>
          ))
        : 
          <Text>Ceci sont les taches</Text>
        }
      </Card>
    </Box>
  )
}

export default Tasks;