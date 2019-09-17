import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DataTable from './DataTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 900,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [heroes, setHeroes] = React.useState([]);

  async function getResponse(){
    const response = await fetch('/');
    const body = await response.json();
    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  React.useEffect(() => {
    getResponse()
      .then(res => {
        const someData = res.data;
        setHeroes([...heroes, someData]);
      })
  });

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DataTable heroes = {heroes}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DataTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DataTable />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DataTable />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DataTable />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <DataTable />
      </TabPanel>
    </div>
  );
}
