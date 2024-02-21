import styles from "./icons.module.css";

/**
 * Base SVG icon component.
 */
const Icon = (props: React.PropsWithChildren<React.SVGProps<SVGSVGElement>>) => (
	<span className={styles.iconImage}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			role="presentation"
			width={24}
			height={24}
			{...props}
		/>
	</span>
);

export default Icon;
