import React from 'react';
import {Router} from './components/Routes/Router'
import {ProvideAuth} from "./hooks/auth/use-auth";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {ProvideConfig} from "./hooks/config/use-config";
import {ProvideAPI} from "./hooks/api/use-api";
import {ProvideMarkets} from "./hooks/markets/use-markets";
import {ProvideOffers} from "./hooks/offers/use-offers";
import {ProvideCustomOffers} from "./hooks/offers/use-customOffers";
import {ProvideOfferLibraries} from "./hooks/offers/use-offerLibrary";

function App() {
  // TODO this is starting to get a little code-smelly with the Providers
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ProvideConfig>
        <ProvideAPI>
          <ProvideAuth>
            <ProvideMarkets>
              <ProvideOfferLibraries>
                <ProvideOffers>
                  <ProvideCustomOffers>
                    <Router />
                  </ProvideCustomOffers>
                </ProvideOffers>
              </ProvideOfferLibraries>
            </ProvideMarkets>
          </ProvideAuth>
        </ProvideAPI>
      </ProvideConfig>
    </MuiPickersUtilsProvider>
    )
}

export default App;
