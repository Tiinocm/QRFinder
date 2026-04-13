import { array } from "astro:schema";
import { useState } from "react";
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

    const handleClick = ( e ) => {
        
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;

        setMarkers([...markers, {top: y, left: x}]);
        

    }


    return(

        <div className="w-full flex justify-center m-4">
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
        </div>

    )

}

export default BlueprintSelector;