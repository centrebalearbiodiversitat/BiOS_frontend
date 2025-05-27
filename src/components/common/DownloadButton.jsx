import React from 'react';
import CBBButton from "@/components/common/CBBButton";
import Link from "next/link";
import {t} from "@/i18n/i18n";

export default function DownloadButton({lang, className, href, children}) {
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
