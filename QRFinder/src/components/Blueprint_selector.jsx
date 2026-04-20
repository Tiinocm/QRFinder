import { useEffect, useState } from "react";
import pkg from "react-image-marker";
import ImageMarker from "react-image-marker";
const { Marker } = pkg;

// https://www.npmjs.com/package/react-image-marker

const BlueprintSelector = () => {

    const [ bluePrint, setBluePrint ] = useState('');
    const [ markers, setMarkers ] = useState([]);


    const handleBluePrint = ( e ) => {

        const file = e.target.files[0];

        if( file ) {
            const imageUrl = URL.createObjectURL( file );
            setBluePrint( imageUrl );
        }
        
    }

    const handleDeleteMarker = (e, i) => {
        
        let result = confirm("Do you want to delete this marker?");

        if(result) {
            let markersArray = [...markers];
            
            markersArray.splice(i, 1);

            setMarkers(markersArray);
        }

    }


    return(

        <div className="flex flex-col justify-center items-center m-4">
            <div className="w-64">
                <form action="" method="post">

                    <label className="block mb-2.5 text-sm font-medium text-heading" htmlFor="file_input">Upload file</label>
                    <input className="cursor-pointer bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body" 
                    type="file" name="blueprint" id="blueprint" accept="image/*"
                    onChange={e => handleBluePrint(e)} />

                </form>

            </div>

            {
                bluePrint && (
                    <ImageMarker
                        src={bluePrint}
                        markers={markers}
                        onAddMarker={(marker) => setMarkers([...markers, marker])}
                    />
                )
            }

            {
                markers && (
                    <div>
                        <ul>
                            {markers.map( function(marker, i) {

                                return(
                                        <li key={i}>
                                            Marker {i + 1} | pos: {parseInt(marker.top)} {parseInt(marker.left)} | <span className="text-red-500 font-bold" onClick={e => handleDeleteMarker(e, i)} >Delete</span>
                                        </li>
                                );

                            })}
                        </ul>
                    </div>
                )
            }
        </div>

    )

}

export default BlueprintSelector;