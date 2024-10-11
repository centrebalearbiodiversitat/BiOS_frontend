import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
	Button, cn,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Radio,
	RadioGroup,
	useDisclosure
} from "@nextui-org/react";
import {t} from "@/i18n/i18n";
import CBBButton from "@/components/common/CBBButton";
import {BsDownload} from "react-icons/bs";
import taxonomy from "@/API/taxonomy";
import occurrences from "@/API/occurrences";
import DownloadButton from "@/components/common/DownloadButton";


export const RadioItem = ({children, ...extra}) => {

	return (
		<Radio
			{...extra}
			classNames={{
				base: cn(
					"inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
					"flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 ps-2 pe-3 py-4 border-2 border-transparent",
					"data-[selected=true]:bg-gray-100",
				),
			}}>
			{children}
		</Radio>
	);
};


export default function DownloadModal({lang, taxonId}) {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const [checklistLink, setChecklistLink] = useState('');
	const [occurrencesLink, setOccurrencesLink] = useState('');
	const [selectedLink, setSelectedLink] = useState(null);

	useEffect(() => {
		taxonomy.checklist(taxonId)
			.then(r => setChecklistLink(r))
		occurrences.listDownload(taxonId)
			.then(r => setOccurrencesLink(r))
	}, [taxonId]);

	const onOpenChangeLink = useCallback(() => {
		if (isOpen) {
			setSelectedLink(null);
		}
		onOpenChange();
	}, [onOpenChange, isOpen]);

	const availableDownload = useMemo(() => {
		return [
			{
				title: t(lang, "taxon.layout.modal.checklist"),
				description: t(lang, "taxon.layout.modal.checklist.help"),
				link: checklistLink,
			},
			{
				title: t(lang, "taxon.layout.modal.occurrences"),
				description: t(lang, "taxon.layout.modal.occurrences.help"),
				link: occurrencesLink,
			},
		]
	}, [lang, checklistLink, occurrencesLink]);

	const {headerTitle, helpLabel, downloadButton} = useMemo(() => {
		return {
			headerTitle: t(lang, "taxon.layout.modal.title"),
			helpLabel: t(lang, "taxon.layout.modal.help_label"),
			downloadButton: t(lang, "taxon.layout.modal.download_button"),
		}
	}, [lang]);


	const onValueChange = useCallback((link) => {
		setSelectedLink(link);
	}, []);

	return (
		<>
			<CBBButton className="border-primary px-5" onPress={onOpen}>
				{downloadButton} <BsDownload className="text-medium"/>
			</CBBButton>
			<Modal isOpen={isOpen} onOpenChange={onOpenChangeLink} size={"2xl"}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody className="mx-5 mt-8">
								<div className="flex flex-row font-normal text-2xl">
									{headerTitle}
								</div>
								<RadioGroup onValueChange={onValueChange} label={helpLabel}>
								{
									availableDownload.map(
										item => (
											<RadioItem key={item.link} value={item.link}
											           className="text-pretty"
											           description={item.description}>
												{item.title}
											</RadioItem>
										)
									)
								}
								</RadioGroup>
							</ModalBody>
							<ModalFooter className="m-2">
								<CBBButton color="danger" variant="light" onPress={onClose}>
									Close
								</CBBButton>
								{/*<Link isDisabled={!selectedLink} href={selectedLink} download={true}>*/}
								<DownloadButton isDisabled={!selectedLink} href={selectedLink}/>
								{/*</Link>*/}
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}