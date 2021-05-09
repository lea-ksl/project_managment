import React from "react";
import { useParams } from "react-router-dom";
import { Box, Header, Heading, Text } from "grommet";
import MySidebar from "../sidebar/MySidebar"
import { getProjectById } from "../../services/projectsService";
import { useSelector, useDispatch } from 'react-redux';
import { update, selectProject } from './projectSlice';
import Tasks from '../tasks/Tasks';

const Project = () => {
  const project = useSelector(selectProject);
  const dispatch = useDispatch();
  let projectId = useParams();
  const [showForm, setShowForm] = React.useState(false);
  const [refresh, setrefresh] = React.useState(true);

  React.useEffect(() => {
    const fecthProject = async () => {
      const fetchData = await getProjectById(projectId.projectid);
      dispatch(update(fetchData));
    }

    if (refresh) {
      fecthProject();
      setrefresh(false);
    }
  }, [refresh])
        
  return(
    <Box>
      {project && (
        <>
          <MySidebar />
          <Box align="center">
            <Header align="center" direction="row" flex={false} justify="between" gap="medium">
              <Heading>{project.title}</Heading>
              <Text>{project.desc}</Text>
            </Header>
            <Tasks projectId={projectId} />
          </Box>
        </>
      )}
    </Box> 
  )
}

export default Project;