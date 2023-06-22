import { useEffect } from 'react';
import { Link, Outlet, useMatches, useNavigate } from 'react-router-dom';

import styles from './layout.module.css';

const HeaderNavigation = () => (
    <nav className={styles.navigation}>
        <ul>
            <Link to="banking">
                <li>Banking</li>
            </Link>
            <Link to="credit-cards">
                <li>Credit Cards</li>
            </Link>
            <Link to="benefits">
                <li>Benefits</li>
            </Link>
            <Link to="faq">
                <li>FAQ</li>
            </Link>
        </ul>

        <div>
            <Link to="/customer/sign-up">
                <button className="button-secondary">Sign Up</button>
            </Link>
            <Link to="/customer/login">
                <button className="button-primary">Log In</button>
            </Link>
        </div>
    </nav>
);

const Header = () => (
    <header className={styles.header}>
        <div className={styles.headerContent}>
            <Link to="">
                <span className={styles.logo}>H</span>
            </Link>
            <HeaderNavigation />
        </div>
    </header>
);

/**
 * Layout component for the 'Root' application.
 */
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
            <Header />
            <Outlet />
        </>
    );
};

export default Layout;
