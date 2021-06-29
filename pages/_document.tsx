import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,700;1,700&family=Spectral:ital,wght@0,300;0,400;0,500;0,700;1,400;1,700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body className="font-body leading-normal">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
