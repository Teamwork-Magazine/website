import Button from "../atoms/Button";
import ArrowLeftIcon from "../atoms/icons/ArrowLeft";
import Stack from "../atoms/Stack";
import Section from "../molecules/Section";
import styles from "./Error.module.css";

export interface ErrorTemplateProps {
	status: number;
	statusText: string;
	message: string;
}

export default function ErrorTemplate({
	status,
	statusText,
	message,
}: ErrorTemplateProps) {
	return (
		<main className={styles.error}>
			<Section lead>
				<Stack gap="var(--space-l)">
					<Stack gap="var(--space-2xs)">
						<h1>
							{status} - {statusText}
						</h1>
						<p>{message}</p>
					</Stack>
					<div>
						<Button href="/">
							<Button.Icon icon={ArrowLeftIcon} /> Go to homepage
						</Button>
					</div>
				</Stack>
			</Section>
		</main>
	);
}
