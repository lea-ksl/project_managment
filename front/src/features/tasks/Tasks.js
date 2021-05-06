import React from "react";
import { Box, Button, Text, TextInput, Form, FormField, Select } from "grommet";
import { Refresh } from "grommet-icons";
import CardConcave from "../../components/CardConcave";
import { useHistory, useParams } from "react-router-dom";
import { addTask, getTasks } from "../../services/tasksService";
import { getUsers } from "../../services/usersService";
import { getProjectById} from '../../services/projectsService';
import { updateUsers, selectUsers} from '../users/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateTasks, selectTasks } from './tasksSlice';
import {update, selectProject} from '../projects/projectSlice';

const Tasks = () => {
  let history = useHistory();
  const users = useSelector(selectUsers);
  const tasks = useSelector(selectTasks);
  const projectTags = useSelector(selectProject);
  const dispatch = useDispatch();
  let project = useParams();
  let projectId = project.projectid;
  const [formData, setFormData] = React.useState({    
    content: "",
  });
  const {content } = formData;
  const [value, setValue] = React.useState('');
  const [valueUser, setValueUser] = React.useState('');
  const [valueTag, setValueTag] = React.useState('');
  const [refresh, setrefresh] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const show = () => {
    setShowForm(!showForm);
  }
  let userId = ""
  let statut = ""
  let tag = ""
  const options = users.map(user => (
    { label : user.name, value: user.name}
  ));

  const optionsTags = projectTags.tags;
  console.log(optionsTags)
  console.log(projectTags)
  const [filterByStatus, setFilterStatus] = React.useState({value: ""})
  const [filterByName, setFilterName] = React.useState({value: ""})
  const [filterByTag, setFilterTag] = React.useState({option: ""})

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
    tag = valueTag;
    statut = value.value;
    addTask(content, statut, projectId, userId, tag)
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
    const fecthProject = async () => {
      const fetchData = await getProjectById(project.projectid);
      console.log("fetch5", fetchData)
      dispatch(update(fetchData));
    }
    const fecthTasks = async () => {
      const fetchData = await getTasks(project.projectid);
      dispatch(updateTasks(fetchData));
    }
    if (refresh) {
      fecthTasks();
      fecthUsers();
      fecthProject();
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
            <Select
              placeholder="Pole"
              options={optionsTags}
              value={valueTag}
              onChange={({ option: nextValue }) => setValueTag(nextValue)}
            />
          </FormField>
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Form>
      )}
      <Select
        placeholder="statut"
        options={statutList}
        labelKey="label"
        valueKey="value"
        value={filterByStatus}
        onChange={({ value: nextValue }) => setFilterStatus(nextValue)}
      /> 
      <Select
        placeholder="Name"
        options={options}
        labelKey="label"
        valueKey="value"
        value={filterByName}
        onChange={({ value: nextValue }) => setFilterName(nextValue)}
      />
      {optionsTags?.length > 0 && (
        <Select
          placeholder="Tag"
          options={optionsTags}
          value={filterByTag}
          onChange={({ option: nextValue }) => setFilterTag(nextValue)}
        />
      )}  
      <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
      <Box align="stretch" justify="center" direction="row-responsive" wrap="true" width="large" background={{"dark":false}}>
        {tasks ? 
          tasks
            .filter(t => t.statut.includes(filterByStatus.value))
            .filter(t => t.userId.includes(filterByName.value))
            .filter(t => t.tag.includes(filterByTag.option))
            .map(task => (
            <CardConcave align="center"
            justify="center"
            round="medium"
            padding="medium"
            margin="small"
            width="medium">
              <Text>Task : {task.content}</Text>
              <Text>Attribued at : {task.userId}</Text>
              <Text>Status : {task.statut}</Text>
              <Text>Pole : {task.tag}</Text>
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