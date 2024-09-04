import React, {useMemo} from "react";
import {Chip} from "@nextui-org/react";
import Link from "next/link";
import {HiOutlineExternalLink} from "react-icons/hi";
import {RxExternalLink} from "react-icons/rx";

function ChipExternalLink({originSource}) {
	const url = useMemo(() => {
		try {
			return originSource.source.url.replace("{id}", originSource.originId);
		} catch (e) {
			return null;
		}
	}, [originSource]);

	if (url) {
		return (
			<Link href={url} target="_blank">
				<Chip as={"div"} className="bg-transparent border-1 border-black/20 text-blue-700">
					<p className="flex flex-row space-x-2">
						<span>{originSource.source.name}{originSource.source.origin === 6 ? '' : `:${originSource.originId}`}</span>
						<RxExternalLink className="text-md my-auto align-baseline "/>
					</p>
				</Chip>
			</Link>
		)
	} else {
		return (
			<Chip as={"div"} className="bg-transparent border-1 border-black/20">
				<p className="flex flex-row space-x-2">
					<span className="">{originSource.source.name}{originSource.source.origin === 6 ? '' : `:${originSource.originId}`}</span>
				</p>
			</Chip>
		)
	}
}


export default function Sources({sources, className}) {
	return (
		<ul className={`flex flex-row flex-wrap gap-1 gap-y-2 ${className}`}>
		{
			sources.map(
				s => (
					<li key={s.id} className="">
						<ChipExternalLink originSource={s}/>
					</li>
				)
			)
		}
		</ul>

	)
}