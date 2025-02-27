import React, {useCallback, useRef, useState} from 'react';
import CBBButton from "@/components/common/CBBButton";
import Link from "next/link";
import {t} from "@/i18n/i18n";
import {useLang} from "@/contexts/LangContext";

export default function DownloadButton({className, href, children}) {
	const [lang] = useLang();

	if (href) {
		return (
			<Link href={href}>
				<CBBButton isDisabled={!href} color="primary" className={className}>
					{children || t(lang, "taxon.layout.modal.download_button")}
				</CBBButton>
			</Link>
		)
	} else {
		return (
			<CBBButton isDisabled={!href} color="primary" className={className}>
				{children || t(lang, "taxon.layout.modal.download_button")}
			</CBBButton>
		);
	}
}
