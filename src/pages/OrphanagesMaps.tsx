import React, {useEffect, useState} from 'react';

import mapMarkerImg from '../images/map-marker.svg';

import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet' 
import '../styles/pages/orphanages-map.css'
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;

}
function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    },[]);
    return(
        <div id="page-map" className="">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas Crianças estão esperando a sua visita :)</p>

                </header>
                <footer>
                    <strong>São Luís</strong>
                    <span> Maranhão</span>
                </footer>
            </aside>

            <Map
                center={[-2.5329664,-44.2095099]}
                zoom={15}
                style={{ width: '100%', height: '100%'}}
            >
                {/* Se tiver executando pelo git usar o tile abaixo */}
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
               {orphanages.map(orphanage => {
                   return (
                    <Marker
                    icon={mapIcon}
                    position={[orphanage.latitude,orphanage.longitude]}

                >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                   {orphanage.name}
                    <Link to={`/orphanages/${orphanage.id}`}>
                        <FiArrowRight size={20} color="#FFF" />
                    </Link>
                </Popup>
                </Marker>
                   )
               })}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="FFF"/>
            </Link>
        </div>
    )
}

export default OrphanagesMap;