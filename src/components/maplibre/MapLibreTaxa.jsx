import CBBSearchBar from "@/components/common/CBBSearchBar";
import taxonomy from "@/API/taxonomy";
import MapLibreCard from "@/components/maplibre/MapLibreCard";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";

function ReorderMapLibre({lang, taxon, onDeleted, taxaColors, onColorChanged, onHide}) {
	const y = useMotionValue(0);
	const dragControls = useDragControls();

	return (
		<Reorder.Item value={taxon} id={taxon.id} style={{y}}
		              dragListener={false} dragControls={dragControls}>
			<MapLibreCard onHide={onHide} dragControls={dragControls}
			              color={taxon && taxaColors ? taxaColors[taxon.id] : undefined}
			              onColorChanged={onColorChanged} lang={lang}
			              taxon={taxon} onDelete={d => onDeleted('taxon', d)}/>
		</Reorder.Item>
	)
}

export default function MapLibreTaxa({lang, taxa, onSelectedSearch, onReorder, onDeleted, taxaColors, onColorChanged, onHide}) {
	return (
		<div className="mx-2">
			<CBBSearchBar showFilters={false} lang={lang} rounded={true} loadOnSubmit={false}
			              label="components.searchbar.label.taxonomy"
		                  placeholder="components.searchbar.placeholder.taxonomy"
		                  filters={[{
				              textKey: "components.searchbar.filter.taxonomy",
				              onSelected: e => onSelectedSearch('taxon', e),
				              onInput: e => taxonomy.search(e)
			              }]}/>
			<Reorder.Group values={taxa} onReorder={onReorder} axis="y"
			               className="col-span-1 sm:col-span-2 py-4 space-y-2">
				{
					taxa.map((taxon) => (
						<ReorderMapLibre key={taxon.id} taxon={taxon} lang={lang}
						                 onDeleted={onDeleted} taxaColors={taxaColors}
						                 onColorChanged={onColorChanged} onHide={onHide}/>
					))
				}
			</Reorder.Group>
		</div>
	);
}