import { useEffect } from "react";
import { Link, useMatches, useNavigate } from "react-router-dom";

/**
 * Layout component for the 'Customer portal' in the application.
 */
const Layout = () => {
	const matches = useMatches();
	const navigate = useNavigate();

	useEffect(() => {
		if (matches.length === 1) {
			// TODO: check if logged in, then navigate accordingly
			navigate("customer/login");
		}
	}, [matches, navigate]);

	return (
		<>
			<Link to="/">Back</Link>
			<h1>Customer Portal</h1>
			{matches.map((match) => (
				<div key={match.id}>{match.pathname}</div>
			))}
		</>
	);
};

export default Layout;
