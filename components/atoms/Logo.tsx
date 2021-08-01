import Image from "next/image";

export interface LogoProps {
	className?: string;
}

export default function Logo({ className }: LogoProps) {
	return (
		<Image
			className={className}
			src="/logo.svg"
			alt="Teamwork Magazine"
			height={16}
			width={260}
		/>
	);
}
