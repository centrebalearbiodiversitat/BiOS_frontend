"use client"

import React, {useEffect, useRef, useState} from "react";
import {HexColorPicker} from "react-colorful";
import CBBButton from "@/components/common/CBBButton";

export default function PopoverColorPicker({color, onChange, isDisabled}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState(color);
	const popover = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (popover.current && !popover.current.contains(event.target)) {
				if (isOpen) {
					if (selectedColor)
						onChange(selectedColor);
					setIsOpen(false);
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const toggle = (state) => setIsOpen(state);

	return (
		<>
			<CBBButton
				isIconOnly
				isDisabled={isDisabled}
				style={{backgroundColor: color}}
				className="me-3"
				onClick={() => {
					if (isOpen && selectedColor) {
						onChange(selectedColor);
					}
					toggle(!isOpen);
				}}
			/>
			{isOpen && (
				<div className="absolute z-50" ref={popover}>
					<HexColorPicker color={color} onChange={c => setSelectedColor(c)}/>
				</div>
			)}
		</>
	);
};