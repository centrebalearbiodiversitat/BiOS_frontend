import {t} from "@/i18n/i18n";
import {useCallback} from "react";
import {Select, SelectItem} from "@nextui-org/react";
import {IoClose} from "react-icons/io5";


export default function KeySelector({lang, items, label, placeHolder, onSelected, defaultValue = null}) {

	const onChange = useCallback((state) => {
		onSelected(state.target.value);
	}, [onSelected]);

	return (
		<div className="flex flex-row gap-2">
	        <Select items={items} label={label} labelPlacement="outside" onChange={onChange} defaultSelectedKeys={[defaultValue]}
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
			{/*<IoClose className="my-auto"/>*/}
		</div>
	)
}
