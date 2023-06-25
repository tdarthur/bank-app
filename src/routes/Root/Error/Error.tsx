import classNames from 'classnames';
import { Link, useRouteError } from 'react-router-dom';
import { Footer, Header } from '../Layout';

import layoutStyles from '../layout.module.css';
import styles from './error.module.css';

type ErrorResponse = {
    data: string;
    error: Error;
    internal: boolean;
    status: number;
    statusText: string;
};

const errorMessages: { [key: number]: React.ReactNode } = {
    404: "Oops. The page you're looking for isn't here!"
};

const Error = () => {
    const routeError = useRouteError() as ErrorResponse;

    return (
        <>
            <Header />
            <main className={layoutStyles.main}>
                <div className={classNames(layoutStyles.pageContent, styles.errorDetails)}>
                    <h2 className={styles.errorMessage}>
                        {errorMessages[routeError.status] || routeError.error.message}
                    </h2>
                    <Link to="">
                        <button className="button-primary">Back to Homepage</button>
                    </Link>
                    <p className="soft-text">
                        {routeError.status} Error: {routeError.statusText}
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Error;
