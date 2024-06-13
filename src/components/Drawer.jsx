import React, {useState} from "react";
import CBBButton from "@/components/CBBButton";
import {Button} from "@nextui-org/react";
import {t} from "@/i18n/i18n";

export default function Drawer({lang, children}) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			<CBBButton className={`${isOpen ? 'hidden' : ''} bg-gray-200 absolute min-w-8 rounded-none p-0 rounded-e-xl border-s-0`} onClick={() => setIsOpen(!isOpen)}>
				{">"}
			</CBBButton>
			<div className={`absolute w-[420px] max-w-[420px] h-full bg-cyan-100/80 backdrop-blur-md shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
				<div className="flex flex-1 justify-end m-2">
					<span className="text-2xl cursor-pointer font-mono" onClick={() => setIsOpen(!isOpen)}>
						x
					</span>
					{/*<CBBButton isIconOnly onPress={() => setIsOpen(!isOpen)}*/}
					{/*           className="hover:text-white hover:bg-black/20 backdrop-blur-sm font-medium !opacity-100 bg-white px-8 text-black border-0">*/}
					{/*	{t(lang, 'map.drawer.close')}*/}
					{/*</CBBButton>*/}
				</div>
				{children}
				{/*<div className="flex-grow" onClick={() => setIsOpen(false)}>*/}

				{/*</div>*/}
			</div>
		</>
	);
};