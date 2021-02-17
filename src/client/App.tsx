import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Compose from './pages/Compose';
import Details from './pages/Details';
import EditBlog from './pages/EditBlog';
import EditProfile from './pages/EditProfile';
import FourOhFour from './pages/FourOhFour';
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
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/details/:id">
					<Details />
				</Route>
				<PrivateRoute path="/editblog/:id">
					<EditBlog />
				</PrivateRoute>
				<PrivateRoute path="/profile">
					<Profile />
				</PrivateRoute>
				<PrivateRoute path="/editprofile">
					<EditProfile />
				</PrivateRoute>
				<PrivateRoute path="/compose">
					<Compose />
				</PrivateRoute>
				<Route path="*">
					<FourOhFour/>
				</Route>
			</Switch>
		</Router>
	);
};

interface AppProps { }

export default App;
