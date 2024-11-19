import React from "react";
import CBBSearchBar from "@/components/common/CBBSearchBar";
import taxonomy from "@/API/taxonomy";
import MapLibreCard from "@/components/maplibre/MapLibreCard";


export default function MapLibreTaxa({lang, taxa, onSelectedSearch, onDeleted, taxaColors, onColorChanged, onHide}) {
	return (
		<div className="mx-3">
			<CBBSearchBar showFilters={false} lang={lang} rounded={true}
			              label="components.searchbar.label.taxonomy"
		                  placeholder="components.searchbar.placeholder.taxonomy"
		                  filters={[{
				              textKey: "components.searchbar.filter.taxonomy",
				              onSelected: e => onSelectedSearch('taxon', e),
				              onInput: e => taxonomy.search(e)
			              }]}/>
			<ul className="col-span-1 sm:col-span-2 py-4 space-y-2">
				{
					taxa.map((taxon, idx) => (
						<MapLibreCard key={idx} onHide={onHide}
						              color={taxon && taxaColors ? taxaColors[taxon.id] : undefined}
						              onColorChanged={onColorChanged} lang={lang}
						              taxon={taxon} onDelete={d => onDeleted('taxon', d)}/>
					))
				}
			</ul>
		</div>
	);
}