import React, {useCallback, useRef, useState} from "react";
import {HexColorPicker} from "react-colorful";
import CBBButton from "@/components/CBBButton";

export const PopoverColorPicker = ({color, onChange}) => {
	const popover = useRef();
	const [isOpen, toggle] = useState(false);

	return (
		<div>
			<CBBButton isIconOnly style={{backgroundColor: color}} className="me-3"
			           onClick={() => toggle(!isOpen)}/>
			{isOpen && (
				<div className="absolute z-50" ref={popover}>
					<HexColorPicker color={color} onChange={onChange}/>
				</div>
			)}
		</div>
	);
};
