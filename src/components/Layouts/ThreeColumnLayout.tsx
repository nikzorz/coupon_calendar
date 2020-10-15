import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'grid',
    overflow: 'auto',
    height: '100%',
    gridTemplateColumns: '315px auto 64px',
    gridTemplateRows: 'auto',
  },
  leftAside: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 0,
    overflow: 'auto'
  },
  mainSection: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 1fr',
    overflow: 'auto'
  },
  rightAside: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 0,
  },
}));

export const ThreeColumnContainer: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

export const LeftAside: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <aside className={classes.leftAside}>
      {children}
    </aside>
  );
};

export const MainSection: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <section className={classes.mainSection}>
      {children}
    </section>
  );
};

export const RightAside: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <aside className={classes.rightAside}>
      {children}
    </aside>
  );
};