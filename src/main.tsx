import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import UI from './UI.tsx'

 

  
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary
    FallbackComponent={ () => <UI />}
    onReset={() => {
      // Reset the state of your application here if needed
      window.location.reload();
    }}
  >
    <App />
  </ErrorBoundary>
)
