import React from "react";
import { Box, Button, Text, TextInput, Form, FormField, Select, Header, Heading, Avatar } from "grommet";
import { Refresh, Edit } from "grommet-icons";
import Card from "../../components/Card";
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
  const [filterByStatus, setFilterStatus] = React.useState({value: ""})
  const [filterByName, setFilterName] = React.useState({value: ""})
  const [filterByTag, setFilterTag] = React.useState({option: ""})

  const statutList = [
    {label : "To do", value: "To do"},
    {label : "Doing", value: "Doing"},
    {label : "Done", value: "Done"},
    {label : "In review", value: "In review"},
    {label : "Completed", value: "Completed"},
  ]
    
  const onSubmit = (e) => {
    e.preventDefault();
    userId = valueUser.value;
    tag = valueTag;
    statut = value.value;
    addTask(content, statut, projectId, userId, tag).then(()=>setrefresh(true))
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    const fecthUsers = async () => {
      const fetchData = await getUsers();
      dispatch(updateUsers(fetchData));
    }
    const fecthProject = async () => {
      const fetchData = await getProjectById(project.projectid);
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
      <Header>
      <Heading style={{color: "#814F82", fontSize: "36px"}}>Tasks</Heading>
      <Button onClick={show} style={{background: "#814F82", color:"#ffffff", border:"none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "10px", margin: "0.5em 0"}} hoverIndicator color="dark-2" active={false} plain={false} primary={false} reverse={false} secondary={false}>{!showForm ? 'New task' : 'Cancel'}</Button>
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
      </Header>
      <Box align="stretch" justify="between" direction="row-responsive" wrap="true" width="xlarge" margin="small" pad="small" style={{backgroundColor:"lightgrey"}}>
        <Select
          style={{backgroundColor:"white"}}
          placeholder="Statut"
          options={statutList}
          labelKey="label"
          valueKey="value"
          value={filterByStatus}
          onChange={({ value: nextValue }) => setFilterStatus(nextValue)}
        /> 
        <Select
          style={{backgroundColor:"white"}}
          placeholder="Name"
          options={options}
          labelKey="label"
          valueKey="value"
          value={filterByName}
          onChange={({ value: nextValue }) => setFilterName(nextValue)}
        />
        {optionsTags?.length > 0 && (
          <Select
            style={{backgroundColor:"white"}}
            placeholder="Pole"
            options={optionsTags}
            value={filterByTag}
            onChange={({ option: nextValue }) => setFilterTag(nextValue)}
          />
        )}  
      </Box>
      <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
      <Box align="stretch" justify="center" direction="row-responsive" wrap="true" width="xlarge" background={{"dark":false}}>
        {tasks ? 
          tasks
            .filter(t => t.statut.includes(filterByStatus.value))
            .filter(t => t.userId.includes(filterByName.value))
            .filter(t => t.tag.includes(filterByTag.option))
            .map(task => (
            <Card 
            direction="row-responsive" 
            wrap="true"
            align="center"
            justify="between"
            round="medium"
            gap="medium"
            pad="medium"
            margin="small"
            width="xlarge"
            alignContent="center">
              <Text><strong>Task : </strong>{task.content}</Text>
              <Text><strong>Pole : </strong>{task.tag}</Text>
              <Box direction="row-responsive" 
              wrap="true"
              align="center"
              justify="center">
                <Text><strong>Attribued at : </strong></Text>
                <Avatar background="#4F5182" margin="small">{task.userId.substr(0,2).toUpperCase()}</Avatar>
              </Box>
              <Text><strong>Statut : </strong>{task.statut}</Text>
              <Button icon={<Edit />} color='brand' style={{margin: "0.5em 0"}} onClick={()=> history.push(`/tasks/edit/${task.id}`)} />         
            </Card>
          ))
        : 
          <Text>Ceci sont les taches</Text>
        }
      </Box>
    </Box>
  )
}

export default Tasks;