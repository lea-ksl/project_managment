import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Button, TextInput, Form, FormField, Heading, Header } from "grommet";
import {
  getProjectByIdForEdit,
  editProject
} from "../../services/projectsService";
import { TagsInput } from "react-tag-input-component";

const EditProject = () => {
  let history = useHistory();
  let projectId = useParams();

  const [projectToUpdate, setProjectToUpdate] = React.useState([null]);

  const handleChange = event => {
    const project = { ...projectToUpdate };
    project[event.target.name] = event.target.value;
    setProjectToUpdate(project);
  };

  const [test, setTags] = React.useState([projectToUpdate.tags]);

  const handleSubmit = event => {
    event.preventDefault();
    const tags = test;
    const title = event.target.title.value;
    const desc = event.target.desc.value;
    editProject(title, desc, tags, projectId.projectid);
    history.push("/");
  };

  React.useEffect(() => {
    const fecthProject = async () => {
      const fetchData = await getProjectByIdForEdit(projectId.projectid);
      setProjectToUpdate(fetchData);
    };
    fecthProject();
  }, []);

  return (
    <Box align="center">
      <Header align="center" direction="row" flex={false} justify="between" gap="medium">
        <Heading color="#4F5182">Edit Project</Heading>
      </Header>
      <Form className="" onSubmit={handleSubmit}>
        <FormField name="name" htmlFor="text-input-id">
          <TextInput
            placeholder="Title"
            name="title"
            className=""
            value={projectToUpdate.title}
            onChange={handleChange}
            required
          />
          <TextInput
            placeholder="Description"
            name="desc"
            className=""
            value={projectToUpdate.desc}
            onChange={handleChange}
            required
          />
          {projectToUpdate.tags && (
            <TagsInput
              value={projectToUpdate.tags}
              onChange={setTags}
              name="tags"
              placeHolder="Enter poles"
            />
          )}
        </FormField>
        <Button type="submit" primary label="Submit" />
      </Form>
    </Box>
  );
};

export default EditProject;
