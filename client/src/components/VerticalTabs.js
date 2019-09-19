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
  const [heroes2, setHeroes2] = React.useState([]);
  const [heroes3, setHeroes3] = React.useState([]);
  const [heroes4, setHeroes4] = React.useState([]);
  const [heroes5, setHeroes5] = React.useState([]);
  const [heroes6, setHeroes6] = React.useState([]);
  const [heroes7, setHeroes7] = React.useState([]);

  async function getResponse(){
    const response = await axios.get('/allHeroes', { crossdomain: true });
    const body = response.data;
    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  async function getResponse2(){
    const response = await axios.get('/above60str', { crossdomain: true });
    const body = response.data;
    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  async function getResponse3(){
    const response = await axios.get('/top10power', { crossdomain: true });
    const body = response.data;
    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  async function getResponse4(){
    const response = await axios.get('/above60speedBelow60int', { crossdomain: true });
    const body = response.data;
    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  async function getResponse5(){
    const response = await axios.get('/top10intHuman', { crossdomain: true });
    const body = response.data;
    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  async function getResponse6(){
    const response = await axios.get('/top10speedNonHuman', { crossdomain: true });
    const body = response.data;
    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  async function getResponse7(){
    const response = await axios.get('/above80strNonHumanWomen', { crossdomain: true });
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
    getResponse2()
    .then(res => {
      const someData = res;
      setHeroes2([...heroes2, ...someData]);
    })
    getResponse3()
    .then(res => {
      const someData = res;
      setHeroes3([...heroes3, ...someData]);
    })
    getResponse4()
    .then(res => {
      const someData = res;
      setHeroes4([...heroes4, ...someData]);
    })
    getResponse5()
    .then(res => {
      const someData = res;
      setHeroes5([...heroes5, ...someData]);
    })
    getResponse6()
    .then(res => {
      const someData = res;
      setHeroes6([...heroes6, ...someData]);
    })
    getResponse7()
    .then(res => {
      const someData = res;
      setHeroes7([...heroes7, ...someData]);
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
        <DataTable heroes={heroes}/>
      </TabPanel>
      <TabPanel value={value} index={1} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes2}/>
      </TabPanel>
      <TabPanel value={value} index={2} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes3}/>
      </TabPanel>
      <TabPanel value={value} index={3} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes4}/>
      </TabPanel>
      <TabPanel value={value} index={4} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes5}/>
      </TabPanel>
      <TabPanel value={value} index={5} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes6}/>
      </TabPanel>
      <TabPanel value={value} index={6} style={ {maxWidth: 800, maxHeight: 1200} }>
        <DataTable heroes={heroes7}/>
      </TabPanel>
    </div>
  );
}