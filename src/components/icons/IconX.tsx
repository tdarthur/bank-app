import Icon from "./Icon";

/**
 * SVG "x" icon.
 */
const IconX = (props: React.SVGProps<SVGSVGElement>) => (
	<Icon {...props}>
		<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
	</Icon>
);

export default IconX;
