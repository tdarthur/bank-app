import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Button from "../../../components/Button";

import layoutStyles from "../layout.module.css";
import styles from "./home.module.css";
import moneyPhoneImage from "../../../assets/money-phone.png";
import cashbackCardImage from "../../../assets/cashback-card.png";

type CarouselPanel = {
	header: string;
	text: string;
	image: string;
	key: string;
};

const carouselPanels: CarouselPanel[] = [
	{
		image: "https://images.pexels.com/photos/7620920/pexels-photo-7620920.jpeg?cs=srgb&dl=pexels-ivan-samkov-7620920.jpg&fm=jpg",
		header: "Free yourself",
		text: "Discover what it means to have full control of your finances. We'll help you get there.",
		key: "0",
	},
	{
		image: "https://www.cgi-textures.com/media/cache/full_thumb/th/5d/7b/98/5d7b986028012559517421.jpg",
		header: "Bank your way",
		text: "With our easy to use mobile app and intuitive account system, you'll never struggle to find and get what you need.",
		key: "1",
	},
	{
		image: "https://static.vecteezy.com/system/resources/previews/002/054/077/original/asian-family-portrait-with-balloons-free-photo.jpg",
		header: "Prioritize",
		text: "We take the worry out of your hands so you can focus on what matters most.",
		key: "2",
	},
	{
		image: "https://www.verywellmind.com/thmb/HZHiUS1k63_h8xtgNmQLTH498rU=/2121x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1126427826-976f525a9a3c4b3ea96016e418374b6b.jpg",
		header: "Overcome",
		text: "We've all been there. Let us help you recover financially.",
		key: "3",
	},
	{
		image: "https://www.eatthis.com/wp-content/uploads/sites/4/2022/02/My-project-2022-02-07T075924.113.jpg?quality=82&strip=1",
		header: "Retire",
		text: "Preparing for the next chapter? Explore our high-interest savings options to see how we can help.",
		key: "4",
	},
];

const carouselTransitionTimerMs = 8000;

const Carousel = () => {
	const [carouselPanelIndex, setCarouselPanelIndex] = useState<number>(NaN);
	const carouselElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setCarouselPanelIndex((carouselPanelIndex + 1) % carouselPanels.length);
		}, carouselTransitionTimerMs);

		return () => {
			clearTimeout(timeout);
		};
	}, [carouselPanelIndex]);

	useEffect(() => {
		setCarouselPanelIndex(0);
	}, [carouselElement]);

	return (
		<div className={styles.carousel} ref={carouselElement}>
			{carouselElement.current && (
				<>
					<div
						className={styles.carouselImages}
						style={{
							transform: `translateX(-${
								(carouselElement.current?.clientWidth || 0) * carouselPanelIndex
							}px)`,
						}}
					>
						{carouselPanels.map(({ image, key }, index) => (
							<img
								src={image}
								style={{
									position: "absolute",
									top: 0,
									left: carouselElement.current ? index * carouselElement.current?.clientWidth : 0,
								}}
								key={key}
							/>
						))}
					</div>

					<div
						className={styles.carouselOverlays}
						style={{
							transform: `translateY(-${
								(carouselElement.current?.clientHeight || 0) * carouselPanelIndex
							}px)`,
						}}
					>
						{carouselPanels.map(({ header, text, key }, index) => (
							<div
								style={{
									position: "absolute",
									left: 0,
									top: carouselElement.current ? index * carouselElement.current?.clientHeight : 0,
								}}
								data-active={index === carouselPanelIndex ? true : undefined}
								key={key}
							>
								<h2 className="primary-gradient-text">{header}</h2>
								<p>{text}</p>
								<Button
									text="Sign Up"
									linkTo="/account-access?sign-up=true"
									tabIndex={index === carouselPanelIndex ? 0 : -1}
								/>
							</div>
						))}
					</div>

					<div className={styles.carouselIndexIndicator}>
						{carouselPanels.map(({ key }, index) => (
							<button
								type="button"
								onClick={() => setCarouselPanelIndex(index)}
								data-selected={carouselPanelIndex === index ? true : undefined}
								key={key}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

type InfoCardProps = {
	header: string;
	text: string;
	image: string;
	actionText: string;
	to: string;
};
const InfoCard = ({ header, text, image, actionText, to }: InfoCardProps) => (
	<article className={styles.card}>
		<div>
			<h2 className={styles.pageHeader}>{header}</h2>
			<p>{text}</p>
			<div className="center-children">
				<Button text={`${actionText} >`} variant="secondary" linkTo={to} />
			</div>
		</div>
		<div className={styles.cardImage}>
			<img src={image} />
		</div>
	</article>
);

const cardImages = [moneyPhoneImage, cashbackCardImage, moneyPhoneImage];

const Home = () => (
	<div className={styles.home}>
		<Carousel />

		<div className={styles.actionContainer}>
			<div>
				<span className="logo-text">Learn what makes us </span>
				<span className="logo">H</span>
				<span className="logo-text">uman</span>
			</div>
			<h2 className={styles.actionHeader}>Get started for free today</h2>
			<Button text="Sign Up" variant="secondary" linkTo="/account-access?sign-up=true" />
		</div>

		<section className={classNames(styles.cards, layoutStyles.pageContent)}>
			<InfoCard
				header="Banking. It's what we do."
				text="This is what we do."
				image={cardImages[0]}
				actionText="Get Started"
				to={"/banking"}
			/>
			<InfoCard
				header="Achieve your credit goals."
				text="With our award winning credit cards, you'll never have to look elsewhere to plunge yourself into debt."
				image={cardImages[1]}
				actionText="Learn More"
				to={"/credit-cards"}
			/>
			<InfoCard
				header="Win back your financial freedom."
				text="It's a bold claim. But we're confident we can make it happen."
				image={cardImages[2]}
				actionText="Learn More"
				to={"/benefits"}
			/>
		</section>
	</div>
);

export default Home;
