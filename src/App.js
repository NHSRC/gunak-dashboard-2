import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import {ThemeProvider} from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import {ProvideAuth} from "./state/useAuth";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <ProvideAuth>
          {routes}
      </ProvideAuth>
    </ThemeProvider>
  );
};

export default App;
