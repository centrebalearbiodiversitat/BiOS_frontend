import {t} from "@/i18n/i18n";
import {useCallback, useState} from "react";
import {Button} from "@heroui/button";
import {Select, SelectItem} from "@heroui/select";
import {IoClose} from "react-icons/io5";


export default function KeySelector({lang, items, label, placeHolder, onSelected, defaultValue = null}) {
	const [isSelected, setIsSelected] = useState(defaultValue);

	const onChange = useCallback((state) => {
		onSelected(state.target.value);
		setIsSelected(state.target.value);
	}, [onSelected]);

	return (
		<div className="flex flex-row gap-2">
	        <Select items={items} aria-label={placeHolder} onChange={onChange} defaultSelectedKeys={[defaultValue]}
	                selectedKeys={isSelected ? [isSelected] : []}
	                placeholder={placeHolder} classNames={{
						value: "first-letter:capitalize font-extralight group-data-[has-value=true]:font-normal group-data-[has-value=true]:text-gray-700",
		                label: "font-extralight",
		                trigger: "bg-white border border-slate-200",
					}}>
		        {
					(rank) => (
						<SelectItem key={rank.key} className="capitalize">
							{t(lang, rank.label)}
						</SelectItem>
					)
				}
	        </Select>
			{isSelected &&
							<Button className="bg-white border-1 border-slate-200" onPress={() => onChange({target: {value: ""}})} isIconOnly>
		                        <IoClose/>
							</Button>
						}
		</div>
	)
}
