import React from 'react'
import ReactDOM from 'react-dom'

const App = props => {
    const connection = $.hubConnection()
    connection.qs = {
        brandCode: 'GPI',
        tokenId: 'a4fc017c-2a4e-4ad2-bea0-9f9fd5e0272d',
    }
    const signal = connection.createHubProxy('apiHubProxy')

    connection.reconnected(function() {
        signal.invoke('joinGroups')
        console.log('Connection reconnected.')
    })

    connection.disconnected(function() {
        console.log('Connection disconnected. Retrying...')
        setTimeout(function() {
            connection.start().done(function() {
                signal.invoke('joinGroups')
            })
        }, 5000)
    })

    connection
        .start({
            transport: ['webSockets', 'serverSentEvents', 'longPolling'],
        })
        .done(function() {
            signal.invoke('joinGroups')
            console.log('Connection ok')
        })
        .fail(function(error) {
            console.log('Connection failed. Error: ' + error)
        })
    return (
        <div
            style={{ width: '100px', height: '300px', backgroundColor: 'red' }}
        >
            <h1>Thtis is a b</h1>
            <pre>{JSON.stringify(props.state, null, 2)}</pre>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
