import React from "react";
import fire from '../../fire.js';
import { useHistory, useParams } from "react-router-dom";
import { Box, Button, Header, Heading, Text } from "grommet";
import MySidebar from "../sidebar/MySidebar"
import { getProjectById } from "../../services/projectsService";
import { useSelector, useDispatch } from 'react-redux';
import { update, selectProject } from './projectSlice';
import Tasks from '../tasks/Tasks';

const Project = () => {
    let history = useHistory();
    const project = useSelector(selectProject);
    const dispatch = useDispatch();
    let projectId = useParams();
    const [showForm, setShowForm] = React.useState(false);
    const [refresh, setrefresh] = React.useState(true);
    const show = () => {
        setShowForm(!showForm);
      }

  React.useEffect(() => {
    const fecthProject = async () => {
        const fetchData = await getProjectById(projectId.projectid);
        console.log("fetch", fetchData)
        dispatch(update(fetchData));
    }


    if (refresh) {
        fecthProject();
        setrefresh(false);
    }
  }, [refresh])
        
        return(

            <Box>
              <MySidebar />
              <Box align="center">
              <Header align="center" direction="row" flex={false} justify="between" gap="medium">
              <Heading>{project.title}</Heading>
                <Text>{project.desc}</Text>
              </Header>
              <Tasks projectId={projectId} />
              </Box>
            </Box>

        )
}

export default Project;