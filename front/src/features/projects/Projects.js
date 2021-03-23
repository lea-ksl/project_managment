import React from "react";
import fire from '../../fire.js';

import { Box, Button, Text, TextInput, Form, FormField } from "grommet";
import { Refresh } from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import { addProject, getProjects } from "../../services/projectsService";

import { useSelector, useDispatch } from 'react-redux';
import { update, selectProjects } from './projectsSlice';

const Projects = () => {

  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({    
    title: "",
    desc: "",
  });
  const {title, desc } = formData;

  const [refresh, setrefresh] = React.useState(true);
    
  const user = fire.auth().currentUser;
  const chiefId = user.email;
    
  const onSubmit = (e) => {
    e.preventDefault();
    addProject(title, desc, chiefId).then(()=>setrefresh(true) )
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  React.useEffect(() => {
    const fecthProjects = async () => {
        const fetchData = await getProjects();
        dispatch(update(fetchData));
    }
    if (refresh) {
        fecthProjects();
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
        {projects ? 
          projects.map(project => (
            <CardConcave align="center"
            justify="center"
            round="medium"
            padding="medium"
            margin="small"
            width="small">
              <Text>{project.title}</Text>
              <Text>{project.desc}</Text>
              <Text>{project.chiefId}</Text>
            </CardConcave>
          ))
        : 
          <Text>Ceci sont les posts</Text>
        }
      </Card>
    </Box>
  )
}

export default Projects;