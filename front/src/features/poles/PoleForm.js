import React from "react";
import {useParams} from "react-router-dom"
import { Box, Button, Select, TextInput, Form, FormField } from "grommet";
import { addPole } from "../../services/polesService"
import { getUsers } from "../../services/usersService"
import { updateUsers, selectUsers} from '../users/usersSlice';
import { useDispatch, useSelector } from "react-redux";

const PoleForm = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({    
    title: "",
    desc: ""
  });

  let userId = ""

  const options = users.map(user => (
    { label : user.name, value: user.name }
  ));

  const {title, desc } = formData;

  let project = useParams();
  let projectId = project.projectid;

  const [refresh, setRefresh] = React.useState(true)

  const onSubmit = (e) => {
    e.preventDefault();
    userId = options[0].value
    console.log(title, desc, projectId, userId)
    addPole(title, desc, projectId, userId)
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
    if (refresh) {
      fecthUsers();
      setRefresh(false);
    }
  }, [refresh])

return(
    <Box>
      <Form 
      className="" 
      onSubmit={(e) => onSubmit(e)}
      onReset={() => setFormData({})}>
        <FormField name="name" htmlFor="text-input-id">
          <TextInput
          placeholder="Title"
          value={title}
          name="title"
          className=""
          onChange={(e) => onChange(e)}
          required
          />
          <TextInput
          placeholder="Description"
          value={desc}
          name="desc"
          className=""
          onChange={(e) => onChange(e)}
          required
          />
          <Select
          placeholder="User"
          options={options}
          labelKey="label"
          valueKey="value"
          />
        </FormField>
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Form>
    </Box>
  )
}

export default PoleForm;