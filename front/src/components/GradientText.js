
import {Text} from 'grommet';
import styled from "styled-components";


const GradientText = styled(Text)`
    background: rgb(222,105,7);
    background: linear-gradient(90deg, rgba(222,105,7,1) 0%, rgba(204,0,0,1) 62%);
    -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  

`;

export default GradientText;