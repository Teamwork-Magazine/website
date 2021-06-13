import classNames, { Argument } from "classnames";
import Link from "next/link";
import { ReactNode } from "react";

//! TODO: Extract this elsewhere
interface Person {
	kind: "person";
	uid: string;
	name: string;
}

export type BylineSize = "md" | "lg";

export interface BylineProps {
	size?: BylineSize;
	className?: Argument;
	people: Person[] | null;
}

interface PersonLinkProps {
	person: Person;
}

function PersonLink({ person }: PersonLinkProps) {
	return (
		<Link key={person.uid} href={`/people/${person.uid}`}>
			<a>{person.name}</a>
		</Link>
	);
}

export default function Byline({
	size = "md",
	className,
	people,
}: BylineProps) {
	let children: ReactNode[] = [];

	if (!people || !people.length) {
		children.push("Teamwork Staff");
	} else if (people.length === 1) {
		const person = people[0];
		children.push(<PersonLink key={person.uid} person={person} />);
	} else if (people.length === 2) {
		const [person1, person2] = people;
		children.push(
			<PersonLink key={person1.uid} person={person1} />,
			" and ",
			<PersonLink key={person2.uid} person={person2} />
		);
	} else {
		people.forEach((person, i) => {
			const isLast = i === people.length - 1;
			const link = <PersonLink key={person.uid} person={person} />;
			if (isLast) {
				children.push("and ", link);
			} else {
				children.push(link, ", ");
			}
		});
	}

	return (
		<p
			className={classNames(
				"font-accent",
				"font-bold",
				"text-gray-500",
				{
					"lg:text-xl": size === "lg",
				},
				className
			)}
		>
			by {children}
		</p>
	);
}
