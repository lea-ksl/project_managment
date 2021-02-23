import {Box} from "grommet";
import styled from "styled-components";


const ConcaveButton = styled(Box)`
    background: #292929;
    box-shadow:  5px 5px 10px #1b1b1b, 
             -5px -5px 10px #373737;
    :active {
        box-shadow: inset 5px 5px 10px #1b1b1b, 
            inset -5px -5px 10px #373737;
    }
`;

export default ConcaveButton;