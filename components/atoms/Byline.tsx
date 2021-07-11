import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";
import { PersonLink } from "../../prismic/types/person";
import styles from "./Byline.module.css";

export type BylineSize = "md" | "lg";

export interface BylineProps {
	size?: BylineSize;
	prefix?: string;
	className?: string;
	people: PersonLink[] | null;
}

interface BylineLinkProps {
	person: PersonLink;
}

function BylineLink({ person }: BylineLinkProps) {
	return (
		<Link key={person.slug} href={`/people/${person.slug}`}>
			<a className={styles.link}>{person.name}</a>
		</Link>
	);
}

export default function Byline({
	size = "md",
	className,
	prefix,
	people,
}: BylineProps) {
	let children: ReactNode[] = [];

	if (!people || !people.length) {
		children.push("Teamwork Staff");
	} else if (people.length === 1) {
		const person = people[0];
		children.push(<BylineLink key={person.slug} person={person} />);
	} else if (people.length === 2) {
		const [person1, person2] = people;
		children.push(
			<BylineLink key={person1.slug} person={person1} />,
			" and ",
			<BylineLink key={person2.slug} person={person2} />
		);
	} else {
		people.forEach((person, i) => {
			const isLast = i === people.length - 1;
			const link = <BylineLink key={person.slug} person={person} />;
			if (isLast) {
				children.push("and ", link);
			} else {
				children.push(link, ", ");
			}
		});
	}

	return (
		<p className={classNames(styles.byline, className)} data-size={size}>
			{prefix ? `${prefix} ` : null}
			by {children}
		</p>
	);
}
