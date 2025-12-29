import {
	type ComponentPropsWithoutRef,
	type ElementType,
	type ReactNode,
} from "react";

type ContainerProps<T extends ElementType> = {
	componentAs?: T;
	children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const Container = <C extends ElementType>({
	componentAs,
	children,
	...props
}: ContainerProps<C>) => {
	const Component = componentAs || "div";

	return (
		<>
			<Component {...props}>{children}</Component>
		</>
	);
};

export default Container;
