import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = (props: AppProps) => {
	const [greeting, setGreeting] = React.useState<string>('');

	React.useEffect(() => {
		(async () => {
			try {
				const res = await fetch('/api/hello');
				const greeting = await res.json();
				setGreeting(greeting);
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
			</Switch>
		</Router>
	);
};

interface AppProps { }

export default App;
