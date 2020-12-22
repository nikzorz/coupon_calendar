import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Backdrop, CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  }
}));

export interface FormSubmitDialogsProps {
  open: boolean,
}

export const LoadingBackdrop: React.FC<FormSubmitDialogsProps> = React.memo(({ open }) => {
  const classes = useStyles()

  return (
    <Backdrop
      className={classes.backdrop}
      open={open}
    >
      <CircularProgress />
    </Backdrop>
  )
})
