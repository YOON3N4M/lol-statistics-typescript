import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home'
import Summoners from './routes/Summoners'
import { GlobalStyles } from './styles/Globalstyles'

const router = createBrowserRouter([
	{
		path: `${process.env.PUBLIC_URL + '/'}`,
		element: <Home />,
	},
	{
		path: `${process.env.PUBLIC_URL + '/summoners/kr/:summonersName'}`,
		element: <Summoners />,
	},
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<>
		<GlobalStyles />
		<RouterProvider router={router} />
	</>,
)
