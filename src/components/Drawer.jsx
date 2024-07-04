import React, {useState} from "react";
import CBBButton from "@/components/CBBButton";
import {IoIosArrowBack, IoIosArrowForward, IoMdClose} from "react-icons/io";

export default function Drawer({children}) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			<CBBButton className={`${isOpen ? 'hidden' : ''} absolute bg-white min-w-8 rounded-none p-0 rounded-e-xl border-s-0`} onClick={() => setIsOpen(!isOpen)}>
				<IoIosArrowForward/>
			</CBBButton>
			<div className={`flex flex-row w-[450px] max-w-[450px] h-full ${isOpen ? 'translate-x-0' : '-translate-x-full'} ease-in-out transition-transform duration-350`}>
				<div className={`w-[450px] max-w-[450px] h-full bg-[#D0F8F9]/60 backdrop-brightness-125 backdrop-blur-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
					{children}
				</div>
				<CBBButton className={`${isOpen ? '' : 'hidden'} bg-white min-w-8 rounded-none p-0 rounded-e-xl border-s-0`} onPress={() => setIsOpen(!isOpen)}>
					<IoIosArrowBack/>
				</CBBButton>
			</div>
		</>
	);
};