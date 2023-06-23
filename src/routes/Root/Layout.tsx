import { useEffect } from 'react';
import { Link, Outlet, useMatches, useNavigate } from 'react-router-dom';

import styles from './layout.module.css';

/**
 * Navigation bar for the header.
 */
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
                <button className="button-tertiary button-short">Sign Up</button>
            </Link>
            <Link to="/customer/login">
                <button className="button-primary button-long">Log In</button>
            </Link>
        </div>
    </nav>
);

/**
 * Header to use in the layout.
 */
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
 * Footer to use in the layout.
 */
const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.footerLinks}>
                <Link to="legal">
                    <b>Privacy</b>
                </Link>
                &nbsp;|&nbsp;
                <Link to="legal">
                    <b>Terms</b>
                </Link>
            </div>
            <p>&#169;{new Date(Date.now()).getFullYear()} Human Bank</p>
        </div>
    </footer>
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
            <div className={styles.layout}>
                <Header />
                <div className={styles.pageContent}>
                    <main className={styles.mainContent}>
                        <Outlet />
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
