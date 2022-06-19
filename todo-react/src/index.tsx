import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import { store, persister } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'

const rootNode = document.getElementById('root')
if (rootNode === null) throw new Error('Root container missing in index.html')

const root = ReactDOM.createRoot(rootNode)
root.render(
  <Provider store={store}>
    <PersistGate persistor={persister}>
      <App />
    </PersistGate>
  </Provider>
)
