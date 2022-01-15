import React, { useState, useEffect } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider, styled, Button, Stack, Typography } from '@mui/material';
import BasicTabs from './Tabs';
import { TextField } from '@material-ui/core';
import { InputLabel, MenuItem, Select, SelectChangeEvent, FormControl } from '@mui/material';

const Home = () => {
    const [tag, setTag] = useState({ tags: [] })

    const fetchTags = async () => {
        const url = "/todos/all_tags"
        const res = await fetch(url)
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const getTodos = async () => {
            const tagsFromServer = await fetchTags()
            setTag(tagsFromServer)
        }
        getTodos()
    }, []);

    return (
        <div style={{ backgroundColor: '#D7EAE9', minHeight: '100vh', height: '100%' }}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ paddingTop: '5vh', paddingBottom: '5vh' }}
            >
                <Typography variant="h5" gutterBottom component="div">
                    Your Todos
                </Typography>
                <BasicTabs tags={tag.tags} />
            </Stack>
        </div >
    )
}

export default Home;