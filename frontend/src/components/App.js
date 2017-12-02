import 'babel-polyfill'
import {blue, amber} from 'material-ui/colors'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import createPalette from 'material-ui/styles/createPalette'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import List from './List'


const muiTheme = createMuiTheme({
    palette: createPalette({
        primary: blue,
        secondary: amber
    })
})

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={muiTheme}>
                <BrowserRouter>
                    <Switch>
                        <Route render={() => (
                            <List/>
                        )}/>
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}

export default App
