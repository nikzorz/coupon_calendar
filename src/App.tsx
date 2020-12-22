import React from 'react';
import {Router} from './components/Routes/Router'
import {ProvideAuth} from "./hooks/auth/use-auth";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {ProvideConfig} from "./hooks/config/use-config";
import {ProvideAPI} from "./hooks/api/use-api";
import {ProvideMarkets} from "./hooks/markets/use-markets";
import {ProvideCalendar} from "./hooks/calendar/use-calendar";
import locale from 'date-fns/locale/en-US';
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

// Required for MaterialUI DatePickers to start on Monday
if (locale && locale.options) {
  locale.options.weekStartsOn = 1;
}

console.log('top-locale', locale)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFBC0D',
    },
    secondary: {
      main: '#101010'
    }
  }
}, locale)

function App() {
  // TODO this is starting to get a little code-smelly with the Providers
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={locale}
    >
      <ThemeProvider theme={theme}>
        <ProvideConfig>
          <ProvideAPI>
            <ProvideAuth>
              <ProvideMarkets>
                <ProvideCalendar>
                  <Router />
                </ProvideCalendar>
              </ProvideMarkets>
            </ProvideAuth>
          </ProvideAPI>
        </ProvideConfig>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  )
}

export default App;
