import React, {useMemo} from "react";
import {Chip} from "@heroui/chip";
import Link from "next/link";
import {RxExternalLink} from "react-icons/rx";
import clsx from "clsx";
import {generateSourceUrl} from "@/utils/utils";

function ChipExternalLink({originSource}) {
	const url = useMemo(() => {
		try {
			return generateSourceUrl(originSource);
		} catch (e) {
			return null;
		}
	}, [originSource]);

	if (url) {
		return (
			<Link href={url} target="_blank">
				<Chip as={"div"} className="bg-transparent border border-black/20 text-blue-700 transition duration-600 ease-in-out hover:border-primary hover:bg-primary hover:text-white">
					<p className="flex flex-row space-x-2">
						<span>{originSource.source?.basis.acronym ?? originSource.source?.basis.name}</span>
						<RxExternalLink className="text-md my-auto align-baseline "/>
					</p>
				</Chip>
			</Link>
		)
	} else {
		return (
			<Chip as={"div"} className="bg-transparent border border-black/20">
				<p className="flex flex-row space-x-2">
					<span>{originSource.source?.basis.acronym ?? originSource.source?.basis.name}:{originSource.externalId}</span>
				</p>
			</Chip>
		)
	}
}


export default function Sources({sources, className}) {
	return (
		<ul className={clsx("flex flex-row flex-wrap gap-1 gap-y-2", className)}>
		{
			sources?.map(
				s => (
					<li key={s.externalId}>
						<ChipExternalLink originSource={s}/>
					</li>
				)
			)
		}
		</ul>

	)
}