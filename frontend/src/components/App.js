import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import List from './List'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route render={() => (
                        <List/>
                    )}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
