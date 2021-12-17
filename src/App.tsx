import * as React from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { CustomLink } from "./components/styledComponent";
import Loading from "./pages/Loading";

const Home = React.lazy(() => import("./pages/Home"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Exercice1 = React.lazy(() => import("./exercice1/Page"));
const Exercice2 = React.lazy(() => import("./exercice2/Page"));

const routes = [
	{ path: "/", Component: Home },
	{ path: "/exercice1", Component: Exercice1 },
	{ path: "/exercice2", Component: Exercice2 },
	{ path: "*", Component: NotFound },
];
// since every exercice has it own component and logic and they don't really have something to share
// so I choose to consider each one as a small project on it own
function App() {
	const location = useLocation();
	return (
		<>
			{location.pathname !== "/" && (
				<CustomLink as={Link} to="/">
					Back to home
				</CustomLink>
			)}
			<React.Suspense fallback={<Loading />}>
				<Routes>
					{routes.map(({ path, Component }) => (
						<Route path={path} element={<Component />} key={path} />
					))}
				</Routes>
			</React.Suspense>
		</>
	);
}

export default App;
