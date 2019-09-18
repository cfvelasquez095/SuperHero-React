import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DataTable from './DataTable';
import axios from 'axios';

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
    height: 380,
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
    const response = await axios.get('/heroInfo', { crossdomain: true });
    const body = response.data;
    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  React.useEffect(() => {
    getResponse()
      .then(res => {
        const someData = res;
        setHeroes([...heroes, ...someData]);
      })
  }, []);

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
        <Tab label="All Heroes" {...a11yProps(0)}/>
        <Tab label="Str above 60" {...a11yProps(1)} />
        <Tab label="Top 10 Power" {...a11yProps(2)} />
        <Tab label="Speed above 60 and Int below 60" {...a11yProps(3)} />
        <Tab label="Top 10 Int - Humans" {...a11yProps(4)} />
        <Tab label="Top 10 Speed - Non-Human" {...a11yProps(5)} />
        <Tab label="Non-Human Women with Str above 80" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes} type={1}/>
      </TabPanel>
      <TabPanel value={value} index={1} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes} type={2}/>
      </TabPanel>
      <TabPanel value={value} index={2} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes} type={3}/>
      </TabPanel>
      <TabPanel value={value} index={3} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes} type={4}/>
      </TabPanel>
      <TabPanel value={value} index={4} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes} type={5}/>
      </TabPanel>
      <TabPanel value={value} index={5} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes} type={6}/>
      </TabPanel>
      <TabPanel value={value} index={6} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes} type={7}/>
      </TabPanel>
    </div>
  );
}