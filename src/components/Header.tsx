import { useTimersContext } from "../store/timersContext";
import Button from "./ui/Button";

const Header = () => {
	const { isRunning } = useTimersContext();

	return (
		<header>
			<h1>React Timer</h1>
			<Button>{isRunning ? "Stop" : "Start"}</Button>
		</header>
	);
};

export default Header;
