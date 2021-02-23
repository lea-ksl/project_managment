
import {Box} from 'grommet';
import styled from "styled-components";


const MiniButton = styled(Box)`
    background: rgb(222,105,7);
    background: linear-gradient(90deg, rgba(222,105,7,1) 0%, rgba(204,0,0,1) 62%);
    box-shadow:  10px 10px 15px #202020, 
        -10px -10px 15px #323232;

    :active {
        box-shadow: inset 5px 5px 10px #780000, 
        inset -5px -5px 10px #ff0000;
    }
`;

export default MiniButton;