import * as React from 'react'
import { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import CategoryTabs from './Tabs';

const Home = () => {
    const [allCategories, setAllCategories] = useState({ categories: [] })

    const fetchCategories = async () => {
        const url = "/todos/all_tags"
        const res = await fetch(url)
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const getTodos = async () => {
            const tagsFromServer = await fetchCategories()
            setAllCategories(tagsFromServer)
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
                <CategoryTabs categories={allCategories.categories} />
            </Stack>
        </div >
    )
}

export default Home;