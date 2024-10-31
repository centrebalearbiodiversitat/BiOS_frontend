import React, {useContext, useState} from "react";
import CBBButton from "@/components/common/CBBButton";
import {IoIosArrowForward} from "react-icons/io";
import {IoClose} from "react-icons/io5";
import Scrollbars from "react-custom-scrollbars-2";

const DrawerStatusContext = React.createContext(null);

function DrawerFooter({children}) {
	return children;
}

function DrawerBody({children}) {
	const [isOpen, setIsOpen] = useContext(DrawerStatusContext);

	return (
		<>
			<div className="container flex flex-row justify-end">
				<CBBButton className={`min-w-8 p-4 border-none text-2xl`} onPress={() => setIsOpen(!isOpen)}>
					<IoClose/>
				</CBBButton>
			</div>
			<Scrollbars universal className="flex-1">
				{children}
			</Scrollbars>
		</>
	);
}

const Drawer = ({children}) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<DrawerStatusContext.Provider value={[isOpen, setIsOpen]}>
			<CBBButton
				className={`${isOpen ? 'hidden' : ''} absolute bg-white min-w-8 rounded-none p-0 rounded-e-xl border-s-0`}
				onClick={() => setIsOpen(!isOpen)}>
				<IoIosArrowForward/>
			</CBBButton>
			<div className={`z-50 flex flex-col w-full max-w-[450px] min-h-[inherit] bg-[#D0F8F9]/60 backdrop-brightness-125 backdrop-blur-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'} ease-in-out transition-transform duration-350`}>
				{children}
			</div>
		</DrawerStatusContext.Provider>
	)
};

Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;

export default Drawer;