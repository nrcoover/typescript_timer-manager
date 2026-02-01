import { createContext, useContext, useReducer, type ReactNode } from "react";

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

type Action = {
	type: "ADD_TIMER" | "START_TIMERS" | "STOP_TIMERS";
};

const initialState: TimersState = {
	isRunning: true,
	timers: [],
};

const timersReducer = (state: TimersState, action: Action): TimersState => {
	if (action.type === "ADD_TIMER") {
		return {
			...state,
			isRunning: true,
		};
	}

	if (action.type === "STOP_TIMERS") {
		return {
			...state,
			isRunning: false,
		};
	}

	if (action.type === "START_TIMERS") {
		return {
			...state,
			timers: [
				...state.timers,
				{
					name,
					duration,
				},
			],
		};
	}

	return state;
};

const TimersContextProvider = ({ children }: TimersContextProviderProps) => {
	const [timersState, dispatch] = useReducer(timersReducer, initialState);

	const contextValue: TimersContextValue = {
		timers: [],
		isRunning: false,
		addTimer: (timerData) => {
			dispatch({ type: "ADD_TIMER" });
		},
		startTimers: () => {
			dispatch({ type: "START_TIMERS" });
		},
		stopTimers: () => {
			dispatch({ type: "STOP_TIMERS" });
		},
	};

	return (
		<TimersContext.Provider value={contextValue}>
			{children}
		</TimersContext.Provider>
	);
};

export default TimersContextProvider;
