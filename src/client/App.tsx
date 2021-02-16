import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Details from './pages/Details';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

const App = (props: AppProps) => {
	const [greeting, setGreeting] = React.useState<string>('');

	React.useEffect(() => {
		(async () => {
			try {
				
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route path="/login" component={Login}></Route>
				<Route path="/register" component={Register}></Route>
				<Route path="/details/:id" component={Details}></Route>
				<PrivateRoute path="/profile/:id">
					{Profile}
				</PrivateRoute>
			</Switch>
		</Router>
	);
};

interface AppProps { }

export default App;
