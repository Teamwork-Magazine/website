export interface LogoProps {
	className?: string;
}

export default function Logo({ className }: LogoProps) {
	return (
		<img
			className={className}
			src="/logo.svg"
			alt="Teamwork Magazine"
			height={16}
			width={260}
		/>
	);
}
