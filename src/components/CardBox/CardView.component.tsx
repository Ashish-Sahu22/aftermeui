import React from 'react';
import { createStyles, Theme, makeStyles } from '@mui/material/styles';
import {List, ListItem, ListItemText, Divider} from '@mui/material';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export function CardView() {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem  button dense>
                <ListItemText primary="Photos" secondary="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi aperiam, necessitatibus dolores repudiandae quasi." />
            </ListItem>
            <Divider />
            <ListItem  button dense>
                <ListItemText primary="Work" secondary="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi aperiam, necessitatibus dolores repudiandae quasi." />
            </ListItem>
            <Divider />
            <ListItem  button dense>
                <ListItemText primary="Work" secondary="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi aperiam, necessitatibus dolores repudiandae quasi." />
            </ListItem>
            <Divider />
            <ListItem  button dense>
                <ListItemText primary="Vacation" secondary="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi aperiam, necessitatibus dolores repudiandae quasi." />
            </ListItem>
        </List>
    );
}