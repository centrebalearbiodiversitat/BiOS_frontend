"use client"

import {useLang} from "@/contexts/LangContext";
import {t} from "@/i18n/i18n";
import {Button} from "@heroui/button";
import Link from "next/link";
import {Image} from "@heroui/image";

export default function Error(params) {
	const [lang] = useLang();

	return (
		<div className="absolute top-0 flex flex-col w-full h-screen bg-[#FEEFDA] justify-center items-center">
			<Image alt="The upupa epops says there was an error." src={"/images/pages/error/upupa_error.webp"}
			       removeWrapper={true} radius={null}
			       className="max-w-[630px] w-full max-h-screen object-contain"/>
			<Button as={Link} radius="full" href={`/${lang}`} color={"primary"}>
				{t(lang, "error.back_home")}
			</Button>
		</div>
	);
}