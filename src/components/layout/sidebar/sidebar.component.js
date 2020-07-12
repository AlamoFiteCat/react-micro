import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import PeopleIcon from '@material-ui/icons/People';
import PaymentIcon from '@material-ui/icons/Payment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ListItemLink from '../../../util/ListItemLink';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function SidebarComponent() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItemLink
              to="/application"
              primary="Application"
              icon={<TouchAppIcon />}
            />
            <ListItemLink to="/loan" primary="Loan" icon={<ArtTrackIcon />} />
            <ListItem button key="Registers" onClick={handleClick}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Registers" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" className={classes.nested}>
                <ListItemLink
                  to="/contact"
                  primary="Contact"
                  icon={<AccountCircleIcon />}
                />

                <ListItemLink
                  to="/office"
                  primary="Office"
                  icon={<BusinessIcon />}
                />

                <ListItemLink
                  to="/city"
                  primary="City"
                  icon={<LocationCityIcon />}
                />
              </List>
            </Collapse>

            <ListItemLink
              to="/payment"
              primary="Payment"
              icon={<PaymentIcon />}
            />

            <ListItemLink
              to="/maturity"
              primary="Maturity"
              icon={<ReceiptIcon />}
            />
          </List>
        </div>
      </Drawer>
    </div>
  );
}
