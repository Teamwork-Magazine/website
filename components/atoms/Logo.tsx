import Image from "next/image";

export default function Logo() {
	return (
		<Image
			src="/logo.svg"
			alt="Teamwork Magazine"
			layout="fixed"
			height={16}
			width={260}
		/>
	);
}
