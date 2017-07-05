import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {App} from './containers/App';

const renderWrapper = (Component) => {
    render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    );
};

renderWrapper(App);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        renderWrapper(App);
    });
}
