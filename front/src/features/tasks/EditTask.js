import React from "react";
import fire from "../../fire.js";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, TextInput, Form, FormField, Select, Header, Heading } from "grommet";
import { getUsers } from "../../services/usersService";
import { updateUsers, selectUsers} from '../users/usersSlice';
import {update, selectProject} from '../projects/projectSlice';
import {
  getTaskByIdForEdit,
  editTask
} from "../../services/tasksService";

const EditTask = () => {
  let history = useHistory();
  let taskId = useParams();
  
  const users = useSelector(selectUsers);
  const projectTags = useSelector(selectProject);
  const optionsTags = projectTags.tags;
  const dispatch = useDispatch();
  const [taskToUpdate, setTaskToUpdate] = React.useState([null]);
  const options = users.map(user => (
    { label : user.name, value: user.name}
  ));
  const [value, setValue] = React.useState('');
  const [valueUser, setValueUser] = React.useState('');
  const [valueTag, setValueTag] = React.useState('');
  const handleChange = event => {
    const task = { ...taskToUpdate };
    task[event.target.name] = event.target.value;
    setTaskToUpdate(task);
  };

  const statutList = [
    {label : "To do", value: "To do", color: "red"},
    {label : "Doing", value: "Doing", color: "yellow"},
    {label : "Done", value: "Done", color: "green"},
    {label : "In review", value: "In review", color: "blue"},
    {label : "Completed", value: "Completed", color: "grey"},
  ]

   const handleSubmit = event => {
     event.preventDefault();
     const content = event.target.content.value
     const userId = valueUser.value;
     const tag = valueTag.value;
     const statut = value.value;
     const task = taskId.taskid
     editTask(content, userId, tag, statut, task);
     history.push("/")
  };

  React.useEffect(() => {
    const fecthUsers = async () => {
        const fetchData = await getUsers();
        dispatch(updateUsers(fetchData));
    }
    const fecthTasks = async () => {
        const fetchData = await getTaskByIdForEdit(taskId.taskid);
        setTaskToUpdate(fetchData);
    };

    fecthUsers()
    fecthTasks();
  }, []);

  return (
    <Box align="center">
      <Header align="center" direction="row" flex={false} justify="between" gap="medium">
        <Heading color="#4F5182">Edit Task</Heading>
      </Header>
      <Form className="" onSubmit={handleSubmit}>
        <FormField name="name" htmlFor="text-input-id">
        <TextInput
              placeholder="Content"
              value={taskToUpdate.content}
              name="content"
              className=""
              onChange={handleChange}
              required
            />
            <Select
              placeholder={taskToUpdate.statut}
              options={statutList}
              labelKey="label"
              valueKey="value"
              value={value}
              onChange={({ value: nextValue }) => setValue(nextValue)}
            />
            <Select
              placeholder={taskToUpdate.userId}
              options={options}
              labelKey="label"
              valueKey="value"
              value={valueUser}
              onChange={({ value: nextValue }) => setValueUser(nextValue)}
            />
            <Select
              placeholder={taskToUpdate.tag}
              options={optionsTags}
              value={valueTag}
              onChange={({ value: nextValue }) => setValueTag(nextValue)}
            />
          </FormField>
          <Button type="submit" primary label="Submit" />
      </Form>
    </Box>
  );
};

export default EditTask;
