import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/sass/styles.scss';
import * as serviceWorker from './serviceWorker';
import {
  FirebaseProvider,
  SelectedEntryProvider,
  EntriesProvider,
  PreviewerProvider,
  AuthProvider,
  ThemeProvider,
} from './context';

ReactDOM.render(
  <FirebaseProvider>
    <AuthProvider>
      <ThemeProvider>
        <EntriesProvider>
          <SelectedEntryProvider>
            <PreviewerProvider>
              <App />
            </PreviewerProvider>
          </SelectedEntryProvider>
        </EntriesProvider>
      </ThemeProvider>
    </AuthProvider>
  </FirebaseProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
