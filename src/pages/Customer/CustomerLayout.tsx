import { useEffect } from 'react';
import { useMatches, useNavigate } from 'react-router-dom';

const Layout = () => {
    const matches = useMatches();
    const navigate = useNavigate();

    useEffect(() => {
        if (matches.length === 1) {
            // TODO: check if logged in, then navigate accordingly
            navigate('customer/login');
        }
    }, [matches, navigate]);

    return (
        <>
            <h1>Customer Portal</h1>
            {matches.map((match) => (
                <div key={match.id}>{match.pathname}</div>
            ))}
        </>
    );
};

export default Layout;
