import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 58,
        width: '100%',
        backgroundColor: '#008EFF',
    },
});

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
        color: '#008EFF',
        fontFamily: "Oxygen",
        fontSize: "13px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "normal",
    },

    '&.Mui-focusVisible': {
        backgroundColor: 'white',
    },
}));

export default function CustomizedTabs({ tabNames, setTab, active }: { tabNames: string[], active: number, setTab: React.Dispatch<React.SetStateAction<number>> }
) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setTab(newValue)
        // onSelectedValueChange(newValue)
    };

    return (
        <Box sx={{ width: '100%' }}>

            <Box sx={{}}>
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                >
                    {tabNames.map(el => <StyledTab sx={{
                        color: "#7A7A7A", fontFamily: "Oxygen",
                        fontSize: "13px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        marginLeft: "30px"
                    }} label={el} />)}

                </StyledTabs>
            </Box>
        </Box>
    );
}
