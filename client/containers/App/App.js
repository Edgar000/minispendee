import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Categories} from '../Categories/Categories';
import {Spendings} from '../Spendings/Spendings';
import {Chart} from '../Chart/Chart';

export class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Categories}/>
                        <Route exact path="/:name" component={Spendings}/>
                        <Route path="/:name/chart" component={Chart}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
