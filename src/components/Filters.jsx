import {useEffect} from "react";
import {Slider} from "@heroui/slider";


function filterDataMinMax(occurences, feature, min, max) {
    const filteredOccurrences = {}

    Object.entries(occurences)
        .forEach(([key, value]) => {
            // console.log(value)
            const features = value.features.filter(
                v => v.properties[feature] === null || min <= v.properties[feature] && v.properties[feature] <= max
            )
            // console.log(features.length)
            filteredOccurrences[key] = {...value, features};
        })

    return {...filteredOccurrences};
}


export default function Filters({data, onFiltered}) {
    useEffect(() => {
        onFiltered(filterDataMinMax(data, 'coordinateUncertaintyInMeters', 0, 30000))
    }, [onFiltered, data]);

    return (
        <Slider label="Uncertainty"
                size="sm"
                step={500}
                maxValue={30000}
                minValue={0}
                defaultValue={[0, 30000]}
                formatOptions={{style: "unit", unit: "meter"}}
                color="primary"
                onChangeEnd={v => onFiltered(filterDataMinMax(data, 'coordinateUncertaintyInMeters', v[0], v[1]))}
                classNames={{
                    base: " w-full p-3",
                    label: "text-medium",
                }}>

        </Slider>
    )
};