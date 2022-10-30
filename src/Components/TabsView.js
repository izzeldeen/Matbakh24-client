import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GRProviders from "../Pages/reports/GRProviders";
import GRDrivers from "../Pages/reports/GRDrivers";
import GRUsers from "../Pages/reports/GRUsers";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function TabsView() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div dir="rtl" className="provider-details row">
      <div className="col-md-12">
        <Box sx={{ bgcolor: "background.paper" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            bgcolor="primary"
            fontSize="25"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label=" تقارير الطباخين" {...a11yProps(0)} />
            <Tab label="تقارير المناديب" {...a11yProps(1)} />
            <Tab label="تقارير المستخدمين" {...a11yProps(2)} />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <GRProviders />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <GRDrivers />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <GRUsers />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </div>
  );
}
