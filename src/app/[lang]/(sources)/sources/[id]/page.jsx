import React from "react";
import {t} from "@/i18n/i18n";
import {generatePageTitle} from "@/utils/utils";
import versioning from "@/API/versioning"
import CBBLink from "@/components/common/CBBLink";
import {Image} from "@heroui/image";
import {ICON_BASIS_TYPE} from "@/utils/icons";
import {MdKeyboardArrowLeft} from "react-icons/md";

const DATA_TYPE_TRANSLATE = {
	"taxon": {},
	"occurrence": {},
	"taxon_data": {},
	"image": {},
	"sequence": {},
}

export async function generateMetadata({params}) {
	const {lang, id} = await params;
	const basis = await versioning.getBasis(id);
	const title = generatePageTitle(lang, basis.name);

	return {
		title,
		openGraph: {
			title
		}
	}
}

export default async function Source({params}) {
	const {id, lang} = await params;

	const [
		basis,
		stats
	] = await Promise.all([
		versioning.getBasis(id),
		versioning.basisStats(id)
	]);

	return (
		<>
			<CBBLink href={`/${lang}/sources?type=${basis.type}`} className="flex items-center text-lg">
				<MdKeyboardArrowLeft className="text-3xl"/>
				{t(lang, "components.header.button.sources")}
			</CBBLink>
			<article className="p-4 border border-slate-200 rounded-xl">
				<div className="sm:px-16 py-6 flex flex-col gap-2 justify-center items-center">
					<header className="flex flex-col items-center px-6 sm:px-12">
						<div className="flex py-1">
							{basis.image &&
								<Image removeWrapper={true} radius="none"
								       className="h-[100px] max-h-[100px] w-auto object-contain"
								       alt={basis.description} src={basis.image}/>}
							{!basis.image &&
								<span className="text-5xl rounded-full border border-slate-200 p-4 flex justify-center items-center">
									{ICON_BASIS_TYPE[basis.type]()}
								</span>
							}
						</div>
						<p className="text-2xl font-semibold text-center">
							{basis.name}
							{basis.acronym &&
								<span className="ps-1.5 text-xl font-light">
									- {basis.acronym}
								</span>
							}
						</p>
						{basis.url &&
							<CBBLink href={basis.url} className="tracking-wide font-light">
								{basis.url}
							</CBBLink>
						}
						{(basis.authors || basis.contact) && <span className="text-sm font-light py-1">
							{basis.authors && <span>{basis.authors}</span>}
							{basis.authors && basis.contact && <span className="px-1">-</span>}
							{basis.contact && <span>{basis.contact}</span>}
						</span>}
					</header>
					<hr className="w-full my-3"/>
					<></>
					<p className="w-full font-semibold">
						{t(lang, "sources.description")}
					</p>
					<p className="font-light text-sm text-slate-700 text-pretty">
						{basis.description}
					</p>
					<div className="container flex flex-wrap justify-center py-8 divide-x ">
						{
							stats.filter(e => DATA_TYPE_TRANSLATE[e.dataType] !== undefined).map(
								e => (
									<div key={e.id} className="flex flex-col items-center px-10 grow">
										<span className="text-2xl font-medium">
											{e.count.toLocaleString()}
										</span>
										<span
											className="uppercase tracking-wide text-sm text-center font-normal text-slate-700">
											{t(lang, `partners.list.${e.dataType}`)}
										</span>
									</div>
								)
							)
						}
					</div>
					{basis.citation &&
						<span className="text-sm text-gray-500 bg-slate-100 py-2 px-2 rounded-md">
							{basis.citation}
						</span>
					}
				</div>
			</article>
		</>
	);
}
