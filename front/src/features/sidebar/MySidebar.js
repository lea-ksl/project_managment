import React from "react";
import fire from '../../fire.js';
import { useHistory } from "react-router-dom";
import { Menu } from "grommet";

const MySidebar = () => {
    let history = useHistory();
    return (
        <Menu
            label="Settings"
            items={[
                { label: 'Projects', onClick: () => {history.push(`/`)} },
                { label: 'Sign Out', onClick: () => {fire.auth().signOut(); history.push('/')} }
            ]}
        />
    )

}

export default MySidebar;