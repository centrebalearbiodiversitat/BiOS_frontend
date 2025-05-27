"use client"

import React, {useMemo} from "react";
import {Link} from "@heroui/link";
import {t} from "@/i18n/i18n";
import {Image} from "@heroui/image";
import {useLang} from "@/contexts/LangContext";
import {Card, CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";


export default function SourceCard({source}) {
	const [lang] = useLang();
	const size = "50px"

	return (
		<Card className="p-5 bg-slate-100" shadow="none">
			<CardHeader className="p-0 text-2xl block">
				<div className="flex rounded-full border border-slate-500" style={{
					width: size,
					height: size,
					maxWidth: size,
					maxHeight: size,
				}}>
					<Image className="m-auto" removeWrapper src="https://mediasvc.eurekalert.org/Api/v1/Multimedia/c10f3e69-a4a5-4e23-a88e-d11f00fcae0b/Rendition/low-res/Content/Public"/>
				</div>
				<p className="font-semibold pt-2">
					{source.name}
				</p>
			</CardHeader>
			<CardBody className="p-0">
				{source.sourceType}
			</CardBody>
		</Card>
	)
}