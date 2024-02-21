import Icon from "./Icon";

/**
 * SVG chevron icon.
 */
const IconChevron = (props: React.SVGProps<SVGSVGElement>) => (
	<Icon {...props}>
		<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
	</Icon>
);

export default IconChevron;
