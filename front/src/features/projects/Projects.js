import React from "react";
import fire from '../../fire.js';
import { useHistory } from "react-router-dom";
import { Box, Button, Text, TextInput, Form, FormField, Header, Heading } from "grommet";
import { Refresh } from "grommet-icons";
import { TagsInput } from "react-tag-input-component";
import Card from "../../components/Card";
import MySidebar from "../sidebar/MySidebar"
import { addProject, getProjects, getProjectByIdForEdit } from "../../services/projectsService";

import { useSelector, useDispatch } from 'react-redux';
import { update, selectProjects } from './projectsSlice';
import { update as updateOne, selectProject} from './projectSlice';

const Projects = () => {
  let history = useHistory();
  let project = ""
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
  const [tags, setTags] = React.useState(["Communication"]);
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
    addProject(title, desc, chiefId, tags).then(()=>setrefresh(true) )
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    const fecthProjects = async () => {
      const fetchData = await getProjects();
      dispatch(update(fetchData));
    }
    const fecthProject = async () => {
      const fetchData = await getProjectByIdForEdit(project.id);
      dispatch(updateOne(fetchData));
    }
    if (refresh) {
      fecthProjects();
      fecthProject()
      setrefresh(false);
    }
  }, [refresh])

  return(
    <Box>
      <MySidebar />
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
              <TagsInput
                value={tags}
                onChange={setTags}
                name="tags"
                placeHolder="Enter poles"
              />
            </FormField>
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Form>          
        )}
        <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
        <Box align="stretch" justify="center" direction="row-responsive" wrap="true" width="xlarge" background={{"dark":false}}>
          {projects && projects.length > 0 ? 
            projects.map(project => (
              <Card fil="horizontal"
              round="medium" 
              padding="medium" 
              justify="center"
              align="center"
              margin="medium"
              width="small"
              height="small">
                <Heading level="3" textAlign="center">{project.title}</Heading>
                <Button  style={{background: "#4F5182", color:"#ffffff", border:"none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "10px"}} onClick={()=> history.push(`/projects/${project.id}`)} hoverIndicator active={false} plain={false} primary={false} reverse={false} secondary={false}>Enter</Button>
                <Button onClick={()=> history.push(`/projects/edit/${project.id}`)} hoverIndicator color="dark-2" active={false} plain={false} primary={false} reverse={false} secondary={false}>Edit</Button>
              </Card>
            ))
          : 
            <Text>Ceci sont les projets</Text>
          }
        </Box>
      </Box>
    </Box>
  )
}

export default Projects;