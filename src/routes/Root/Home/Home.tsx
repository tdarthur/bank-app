import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import layoutStyles from "../layout.module.css";
import styles from "./home.module.css";

type CarouselPanel = {
	header: string;
	text: React.ReactNode;
	image: string;
};

const carouselPanels: CarouselPanel[] = [
	{
		header: "Win. Your way.",
		text: "This is something...",
		image: "https://images.pexels.com/photos/7620920/pexels-photo-7620920.jpeg?cs=srgb&dl=pexels-ivan-samkov-7620920.jpg&fm=jpg",
	},
	{
		header: "This is a header",
		text: "Here's some text",
		image: "https://static.vecteezy.com/system/resources/previews/003/351/091/large_2x/portrait-of-smiling-pretty-young-business-woman-using-phone-free-photo.jpg",
	},
	{
		header: "This is a header",
		text: "Here's some text",
		image: "https://www.verywellmind.com/thmb/HZHiUS1k63_h8xtgNmQLTH498rU=/2121x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1126427826-976f525a9a3c4b3ea96016e418374b6b.jpg",
	},
	{
		header: "This is a header",
		text: "Here's some text",
		image: "https://www.eatthis.com/wp-content/uploads/sites/4/2022/02/My-project-2022-02-07T075924.113.jpg?quality=82&strip=1",
	},
];

const carouselTransitionTimerMs = 5000;

const Carousel = () => {
	const [carouselPanelIndex, setCarouselPanelIndex] = useState(0);
	const carouselDisplay = useRef<HTMLDivElement>(null);

	const { header, text } = carouselPanels[carouselPanelIndex];

	useEffect(() => {
		const timeout = setTimeout(() => {
			setCarouselPanelIndex((carouselPanelIndex + 1) % carouselPanels.length);
		}, carouselTransitionTimerMs);

		return () => {
			clearTimeout(timeout);
		};
	}, [carouselPanelIndex]);

	return (
		<div className={styles.carousel}>
			<div className={styles.carouselDisplay} ref={carouselDisplay}>
				{carouselPanels.map(({ image }, index) => (
					<>
						<img
							src={image}
							style={{
								transform: `translateX(${
									(carouselDisplay.current?.clientWidth || 0) * (index - carouselPanelIndex)
								}px)`,
								zIndex: index === carouselPanelIndex ? 2 : 1,
							}}
						/>
						<div
							style={{
								transform: `translateY(${
									(carouselDisplay.current?.clientHeight || 0) * (index - carouselPanelIndex)
								}px)`,
							}}
							data-active={index === carouselPanelIndex ? true : undefined}
						>
							<h1>{header}</h1>
							<p className="text-disclosure">{text}</p>
							<Link to="account-access">
								<button type="button" className="button-primary button-large">
									Sign Up
								</button>
							</Link>
						</div>
					</>
				))}
			</div>
			<div className={styles.carouselIndexIndicator}>
				{carouselPanels.map((_, index) => (
					<button
						type="button"
						onClick={() => setCarouselPanelIndex(index)}
						data-selected={carouselPanelIndex === index ? true : undefined}
					/>
				))}
			</div>
			<button
				type="button"
				className={styles.carouselButtonLeft}
				onClick={() => {
					setCarouselPanelIndex(carouselPanelIndex > 0 ? carouselPanelIndex - 1 : carouselPanels.length - 1);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
				</svg>
			</button>
			<button
				type="button"
				className={styles.carouselButtonRight}
				onClick={() => {
					setCarouselPanelIndex(carouselPanelIndex < carouselPanels.length - 1 ? carouselPanelIndex + 1 : 0);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
				</svg>
			</button>
		</div>
	);
};

interface InfoCardProps {
	header: string;
	text: string;
	image: string;
	actionText: string;
	to: string;
}
const InfoCard = ({ header, text, image, actionText, to }: InfoCardProps) => (
	<article className={styles.card}>
		<div>
			<h2 className={styles.pageHeader}>{header}</h2>
			<p>{text}</p>
			<div className="center-children">
				<Link to={to}>
					<button
						type="button"
						className="button-secondary"
						style={{ marginLeft: "auto", marginRight: "auto" }}
					>
						{actionText}{" "}
						<span>
							<b>{">"}</b>
						</span>
					</button>
				</Link>
			</div>
		</div>
		<div className={styles.cardImage}>
			<img src={image} />
			<img src={image} />
		</div>
	</article>
);

const cardImages = [
	"https://c.stocksy.com/a/oPT000/z9/113076.jpg",
	"https://media.istockphoto.com/id/500145369/photo/confident-real-estate-agent-standing-outside-new-home-for-sale.jpg?s=612x612&w=0&k=20&c=E2vcVuL-ND1PIO2E_tcKrsinVYSOnH42Ufk37dBOHRM=",
	"https://lccvermont.org/wp-content/uploads/2020/01/How-Do-I-Raise-Money-for-my-Business.jpg",
];

const Home = () => (
	<div className={styles.home}>
		<Carousel />

		<div className={styles.actionContainer}>
			<h2 className={styles.actionHeader}>Get started for free today</h2>
			<Link to="account-access">
				<button type="button" className="button-secondary button-large">
					Sign Up
				</button>
			</Link>
		</div>

		<section className={classNames(styles.cards, layoutStyles.pageContent)}>
			<InfoCard
				header="Banking. It's what we do."
				text="This is what we do."
				image={cardImages[0]}
				actionText="Get Started"
				to={"banking"}
			/>
			<InfoCard
				header="Achieve your credit goals."
				text="With our award winning credit cards, you'll never have to look elsewhere to plunge yourself into debt."
				image={cardImages[1]}
				actionText="Learn More"
				to={"credit-cards"}
			/>
			<InfoCard
				header="Win back your financial freedom."
				text="It's a bold claim. But we're confident we can make it happen."
				image={cardImages[2]}
				actionText="Learn More"
				to={"benefits"}
			/>
		</section>
	</div>
);

export default Home;
