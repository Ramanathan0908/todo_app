import * as React from 'react';
import Tasks from './Tasks'
import AddTask from './AddTask'
import { Tabs, Tab, Box, Button } from '@mui/material'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>{children}</Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CategoryTabs({ categories }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    {
                        categories.map((category, i) => {
                            return (
                                <Tab key={i} label={category.tag} {...a11yProps(i)} value={i} />
                            )
                        })
                    }
                </Tabs>
            </Box>
            {
                categories.map((category, i) => {
                    return (
                        <TabPanel value={value} index={i} key={i}>
                            <Tasks category={category} allCategories={categories} />
                        </TabPanel>
                    )
                })
            }
            {/* <AddTask tags={categories} /> */}
        </Box>
    );
}

export default CategoryTabs