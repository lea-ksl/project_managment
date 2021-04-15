import React from "react";
import {useParams} from "react-router-dom"
import { Box, Button, Text, TextInput, Form, FormField } from "grommet";
import { addPole } from "../../services/polesService"
const PoleForm = () => {

    const [formData, setFormData] = React.useState({    
        title: "",
        desc: "",
      });

      let project = useParams();
      let projectId = project.projectid

      const {title, desc } = formData;

      const onSubmit = (e) => {
        e.preventDefault();
        console.log(title, desc, projectId)
        addPole(title, desc, projectId)
      };
    
      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

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
        </FormField>
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Form>
            </Box>
    )
}

export default PoleForm;