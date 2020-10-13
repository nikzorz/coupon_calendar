import React from 'react';
import {Router} from './components/Routes/Router'
import {ProvideAuth} from "./hooks/use-auth";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ProvideAuth>
        <Router />
      </ProvideAuth>
    </MuiPickersUtilsProvider>
    )
}

export default App;
