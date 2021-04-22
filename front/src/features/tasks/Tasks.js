import React from "react";
import fire from '../../fire.js';

import { Box, Button, Text, TextInput, Form, FormField, Select } from "grommet";
import { Refresh } from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";
import { useHistory, useParams } from "react-router-dom";
import { addTask, getTasks } from "../../services/tasksService";
import { getUsers } from "../../services/usersService"
import { updateUsers, selectUsers} from '../users/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { update, selectTasks } from './tasksSlice';

const Tasks = () => {
  let history = useHistory();
  const users = useSelector(selectUsers);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  let project = useParams();
  let projectId = project.projectid;
  const [formData, setFormData] = React.useState({    
    content: "",
  });
  const {content } = formData;
  const [value, setValue] = React.useState('');
  const [valueUser, setValueUser] = React.useState('');
  const [refresh, setrefresh] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const show = () => {
    setShowForm(!showForm);
  }
  let userId = ""
let statut = ""
  const options = users.map(user => (
    { label : user.name, value: user.name}
  ));

  const statutList = [
    {label : "To do", value: "To do", color: "red"},
    {label : "Doing", value: "Doing", color: "yellow"},
    {label : "Done", value: "Done", color: "green"},
    {label : "In review", value: "In review", color: "blue"},
    {label : "Completed", value: "Completed", color: "grey"},
  ]
    
  const onSubmit = (e) => {
    e.preventDefault();
    userId = valueUser.value;
    statut = value.value;
    addTask(content, statut, projectId, userId)
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  React.useEffect(() => {
    const fecthUsers = async () => {
      const fetchData = await getUsers();
      console.log('users', fetchData)
      dispatch(updateUsers(fetchData));
  }
    const fecthTasks = async () => {
        const fetchData = await getTasks(project.projectid);
        dispatch(update(fetchData));
    }
    if (refresh) {
        fecthTasks();
        fecthUsers();
        setrefresh(false);
    }
  }, [refresh])

  return(
    <Box align="center">
      <Button onClick={show} hoverIndicator color="dark-2" active={false} plain={false} primary={false} reverse={false} secondary={false}>Create task</Button>
            {showForm && (
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
                    
                    <Select
                    placeholder="statut"
                    options={statutList}
                    labelKey="label"
                    valueKey="value"
                    value={value}
                    onChange={({ value: nextValue }) => setValue(nextValue)}
                    />
                    <Select
                    placeholder="User"
                    options={options}
                    labelKey="label"
                    valueKey="value"
                    value={valueUser}
                    onChange={({ value: nextValue }) => setValueUser(nextValue)}
                    />
                  </FormField>
                  <Button type="submit" primary label="Submit" />
                  <Button type="reset" label="Reset" />
                </Form>
            )}
      
      <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
      <Box align="stretch" justify="center" direction="row-responsive" wrap="true" width="large" background={{"dark":false}}>
        {tasks ? 
          tasks.map(task => (
            <CardConcave align="center"
            justify="center"
            round="medium"
            padding="medium"
            margin="small"
            width="medium">
              <Text>Task : {task.content}</Text>
              <Text>Attribued at : {task.userId}</Text>
              <Text>Status : {task.statut}</Text>
              <Button onClick={()=> history.push(`/tasks/${task.id}`)} hoverIndicator color="dark-2" active={false} plain={false} primary={false} reverse={false} secondary={false}>Edit</Button>         
            </CardConcave>
          ))
        : 
          <Text>Ceci sont les taches</Text>
        }
      </Box>
    </Box>
  )
}

export default Tasks;