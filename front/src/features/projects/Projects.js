import React from "react";


import {Box, Button, Text, TextInput, Form, FormField} from "grommet";
import {Refresh} from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import {addProject, getProjects} from "../../services/projectsService";

import { useSelector, useDispatch } from 'react-redux';
import {
    update, selectProjects
  } from './projectsSlice';

const Projects = () => {

    const projects = useSelector(selectProjects);
    const dispatch = useDispatch();

    //const [content, setcontent] =React.useState();
    const [title, setname] = React.useState();
    const [desc, setdesc] = React.useState();
    //const [chiefId, setchiefId] = React.useState();
    const [value, setValue] = React.useState({});
    const [refresh, setrefresh] = React.useState(true);

    const publish = (e) => {
        e.preventDefault();
        
        if (value){
            addProject(value.title, value.desc).then(()=>setrefresh(true) )
            
        }
    }

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
                value={value.title, value.desc}
                onReset={() => setValue({})}
                onSubmit={({ value }) => {publish()}}
                >
            <Box direction="row" gap="small">
                <FormField name="title" htmlFor="title" label="Title">
                    <TextInput placeholder="title" onChange={(e)=> setname(e.target.value)} />
                </FormField>
                <FormField name="desc" htmlFor="desc" label="Desc">
                    <TextInput placeholder="desc" onChange={(e)=> setdesc(e.target.value)} />
                </FormField>
                <Button label="publier" type="submit"/>
            </Box>
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
                        <Text>{project.name}</Text>
                        <Text>{project.desc}</Text>
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