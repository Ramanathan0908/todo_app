import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Dispatcher from './Tasks'
import AddTask from './AddTask'

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

export default function BasicTabs({ tags }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    {
                        tags.map((tag, i) => {
                            return (
                                <Tab key={i} label={tag.tag} {...a11yProps(i)} value={i} />
                            )
                        })
                    }
                </Tabs>
            </Box>
            {
                tags.map((tag, i) => {
                    return (
                        <TabPanel value={value} index={i} key={i}>
                            <Dispatcher tag={tag.tag} allTags={tags} />
                        </TabPanel>
                    )
                })
            }
            <AddTask tags={tags} />
        </Box>
    );
}
