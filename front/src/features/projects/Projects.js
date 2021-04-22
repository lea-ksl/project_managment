import React from "react";
import fire from '../../fire.js';
import { useHistory } from "react-router-dom";
import { Box, Button, Text, TextInput, Form, FormField, Header, Heading } from "grommet";
import { Refresh } from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import { addProject, getProjects } from "../../services/projectsService";

import { useSelector, useDispatch } from 'react-redux';
import { update, selectProjects } from './projectsSlice';

const Projects = () => {
  let history = useHistory();
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({    
    title: "",
    desc: "",
  });
  const {title, desc} = formData;

  const [refresh, setrefresh] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const show = () => {
    setShowForm(!showForm);
  }
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
      <Header align="center" direction="row" flex={false} justify="between" gap="medium">
        <Heading>Projects</Heading>
      </Header>
      <Button onClick={show} hoverIndicator color="dark-2" active={false} plain={false} primary={false} reverse={false} secondary={false}>Create project</Button>
      {showForm && (
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
      )}
      
      <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
      <Box align="stretch" justify="center" direction="row-responsive" wrap="true" width="xlarge" background={{"dark":false}}>
        {projects ? 
          projects.map(project => (
            <Card fil="horizontal"
            round="medium" 
            padding="medium" 
            justify="center"
            align="center"
            margin="small"
            width="medium"
            height="small">
              <Text>Title : {project.title}</Text>
              <Text>Descirption : {project.desc}</Text>
              <Text>Lead : {project.chiefId}</Text>
              <Button onClick={()=> history.push(`/projects/${project.id}`)} hoverIndicator color="dark-2" active={false} plain={false} primary={false} reverse={false} secondary={false}>Enter</Button>
            </Card>
          ))
        : 
          <Text>Ceci sont les projets</Text>
        }
      </Box>
      <Button label="sign out" onClick={()=> fire.auth().signOut()} />
    </Box>
  )
}

export default Projects;