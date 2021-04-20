import React from "react";
import fire from '../../fire.js';
import { useHistory, useParams } from "react-router-dom";
import { Box, Button, Text, TextInput, Form, FormField } from "grommet";
import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import { getProjectById } from "../../services/projectsService";
import {getPoles} from "../../services/polesService"
import { useSelector, useDispatch } from 'react-redux';
import { update, selectProject } from './projectSlice';
import Tasks from '../tasks/Tasks';
import { update2, selectPoles } from '../poles/polesSlice';
import PoleForm from '../poles/PoleForm';

const Project = () => {
    let history = useHistory();
    const project = useSelector(selectProject);
    const poles = useSelector(selectPoles)
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
    const fetchPoles = async () => {
      const fetchData2 = await getPoles(projectId.projectid);
      console.log("fetch2", fetchData2)
      dispatch(update2(fetchData2));
    }

    if (refresh) {
        fecthProject();
        fetchPoles();
        setrefresh(false);
    }
  }, [refresh])
        
        return(

            <Box align="center">
                title : {project.title}<br/>
                desc : {project.desc}<br/>
                {poles ? 
          poles.map(pole => (
            <CardConcave align="center"
            justify="center"
            round="medium"
            padding="medium"
            margin="small"
            width="small">
              <Text>{pole.title}</Text>
              <Text>{pole.desc}</Text>
              <Text>{pole.userId}</Text>
              <Button onClick={()=> history.push(`/projects/${project.id}/poles/${pole.id}`) }>Enter</Button>
            </CardConcave>
          ))
        : 
          <Text>Ceci sont les poles</Text>
        }
            {/*<Button onClick={()=> //history.push(`/projects/${project.id}/poles`) }>Creer un pole</Button>*/}
            <Button onClick={show}>Créer un pole</Button>
            {showForm && (
                <PoleForm projectId={projectId} />
            )}

            <Tasks projectId={projectId} />
            </Box>

        )
}

export default Project;