import React, {useState} from "react";
import CBBButton from "@/components/CBBButton";
import {IoIosArrowForward} from "react-icons/io";
import {IoClose} from "react-icons/io5";

export default function Drawer({children}) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			<CBBButton className={`${isOpen ? 'hidden' : ''} absolute bg-white min-w-8 rounded-none p-0 rounded-e-xl border-s-0`} onClick={() => setIsOpen(!isOpen)}>
				<IoIosArrowForward/>
			</CBBButton>
			<div className={`relative z-40 flex flex-row w-full max-w-[450px] h-full ${isOpen ? 'translate-x-0' : '-translate-x-full'} ease-in-out transition-transform duration-350`}>
				<div className={`w-[450px] max-w-[450px] h-full bg-[#D0F8F9]/60 backdrop-brightness-125 backdrop-blur-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
					<div className="container flex flex-row justify-end">
						<CBBButton className={`min-w-8 p-4 border-none text-2xl`} onPress={() => setIsOpen(!isOpen)}>
							<IoClose/>
						</CBBButton>
					</div>
					{children}
				</div>
			</div>
		</>
	);
};