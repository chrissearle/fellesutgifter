import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route render={() => (
                        <span>Hi</span>
                    )}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
