import { useEffect } from 'react';
import { Outlet, useMatches, useNavigate } from 'react-router-dom';

const Layout = () => {
    const matches = useMatches();
    const navigate = useNavigate();

    useEffect(() => {
        if (matches.length === 1) {
            navigate('home');
        }
    }, [matches, navigate]);

    return (
        <>
            <h1>Root</h1>
            {matches.map((match) => (
                <div key={match.id}>{match.pathname}</div>
            ))}
            <Outlet />
        </>
    );
};

export default Layout;
