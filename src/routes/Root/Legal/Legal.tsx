import styles from "./legal.module.css";

const Legal = () => (
	<>
		<div className={styles.legalContent}>
			<h2 className={styles.h2}>Nothing here!</h2>
			<p className={styles.p}>
				This isn't a real website so there isn't really anything to put here. I decided instead to write out
				this long block of text for really no apparent reason other than the fact that I am bored. If you were
				looking for an actual <span className="text-soft">Privacy Policy</span> or{" "}
				<span className="text-soft">Terms of Service</span> regarding this website, please look elsewhere,
				because this website is purely for demonstration purposes.
			</p>
		</div>
	</>
);

export default Legal;
