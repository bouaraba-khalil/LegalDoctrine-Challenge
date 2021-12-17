import { Link } from "react-router-dom";
import { Center } from "../components/styledComponent";

export default function Home() {
	return (
		<Center>
			<Link to={"/exercice1"}>Exercice 1</Link>
			<Link to={"/exercice2"}>Exercice 2</Link>
		</Center>
	);
}
