import { createContext, useContext, type ReactNode } from "react";

type Timer = {
	name: string;
	duration: number;
};

type TimersState = {
	isRunning: boolean;
	timers: Timer[];
};

type TimersContextValue = TimersState & {
	addTimer: (timerData: Timer) => void;
	startTimers: () => void;
	stopTimers: () => void;
};

interface TimersContextProviderProps {
	children: ReactNode;
}

export const TimersContext = createContext<TimersContextValue | null>(null);

export const useTimersContext = () => {
	const timersContext = useContext(TimersContext);

	if (timersContext === null) {
		throw new Error(
			"Something terrible has occurred, as TimersContext should never be null, but was found to be so!"
		);
	}

	return timersContext;
};

const TimersContextProvider = ({ children }: TimersContextProviderProps) => {
	const contextValue: TimersContextValue = {
		timers: [],
		isRunning: false,
		addTimer: (timerData) => {},
		startTimers: () => {},
		stopTimers: () => {},
	};

	return (
		<TimersContext.Provider value={contextValue}>
			{children}
		</TimersContext.Provider>
	);
};

export default TimersContextProvider;
