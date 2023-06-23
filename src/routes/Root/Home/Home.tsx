import { useState } from 'react';

import styles from './home.module.css';
import { Link } from 'react-router-dom';

const carouselImages = [
    'https://images.pexels.com/photos/7620920/pexels-photo-7620920.jpeg?cs=srgb&dl=pexels-ivan-samkov-7620920.jpg&fm=jpg',
    'https://static.vecteezy.com/system/resources/previews/003/351/091/large_2x/portrait-of-smiling-pretty-young-business-woman-using-phone-free-photo.jpg',
    'https://www.verywellmind.com/thmb/HZHiUS1k63_h8xtgNmQLTH498rU=/2121x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1126427826-976f525a9a3c4b3ea96016e418374b6b.jpg',
    'https://static.vecteezy.com/system/resources/previews/003/351/091/large_2x/portrait-of-smiling-pretty-young-business-woman-using-phone-free-photo.jpg',
    'https://www.eatthis.com/wp-content/uploads/sites/4/2022/02/My-project-2022-02-07T075924.113.jpg?quality=82&strip=1'
];

const cardImages = [
    'https://c.stocksy.com/a/oPT000/z9/113076.jpg',
    'https://lccvermont.org/wp-content/uploads/2020/01/How-Do-I-Raise-Money-for-my-Business.jpg',
    'https://media.istockphoto.com/id/500145369/photo/confident-real-estate-agent-standing-outside-new-home-for-sale.jpg?s=612x612&w=0&k=20&c=E2vcVuL-ND1PIO2E_tcKrsinVYSOnH42Ufk37dBOHRM='
];

const Carousel = () => {
    const [carouselImage, setCarouselImage] = useState<string>(carouselImages[0]);

    return (
        <div className={styles.carousel}>
            <div className={styles.carouselDisplay}>
                <img src={carouselImage} />
                <img />
            </div>
            <div className={styles.carouselOverlay}>
                <h1>Win. Your way.</h1>
            </div>
            <button className={styles.carouselButtonLeft}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
            <button className={styles.carouselButtonRight}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
        </div>
    );
};

interface InfoCardProps {
    header: string;
    text: string;
    image: string;
}
const InfoCard = ({ header, text, image }: InfoCardProps) => (
    <article className={styles.card}>
        <div>
            <h2 className={styles.pageHeader}>{header}</h2>
            <p>{text}</p>
        </div>
        <img src={image} />
    </article>
);

const Home = () => {
    return (
        <div className={styles.home}>
            <Carousel />

            <div className={styles.actionContainer}>
                <h2 className={styles.actionHeader}>Get started for free today</h2>
                <Link to="customer/sign-up">
                    <button className="button-secondary button-long">Sign Up</button>
                </Link>
            </div>

            <section className={styles.cards}>
                <InfoCard header="Banking. It's what we do." text="This is what we do." image={cardImages[0]} />
                <InfoCard
                    header="Win back your financial freedom."
                    text="It's a bold claim. But we're confident we can make it happen."
                    image={cardImages[1]}
                />
                <InfoCard
                    header="Achieve your credit goals."
                    text="With our award winning credit cards, you'll never have to look elsewhere to plunge yourself into debt."
                    image={cardImages[2]}
                />
            </section>
        </div>
    );
};

export default Home;
