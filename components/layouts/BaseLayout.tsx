import Header from "components/organisms/Header";

export default function BaseLayout({ children }) {
	return (
		<>
			<Header />
			<div>{children}</div>
		</>
	);
}
