import { useState } from 'react'
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup as LeafletPopup } from 'react-leaflet'

import { usePythonApi, usePythonState } from '../../hooks/pythonBridge'

import styles from './Map.module.css'
import nrkIconImage from '../../assets/nrk.png';

const nrkIcon = new L.Icon({
    iconUrl: nrkIconImage,
    iconRetinaUrl: nrkIconImage,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(45, 64),
    className: ''
});

const emptyPosition = [48.7385745, 37.58618, -0.09]

export default function Header() {
  const position = usePythonState('position') || emptyPosition
  // const [content, saveContent] = useState()

  return (
    <main>
      <header className="hidden">
        <div className="px-7 bg-white shadow-lg rounded-2xl mb-5">
            <div className="flex">
                <div className="flex-1 group">
                    <a href="#" className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                        <span className="block px-1 pt-1 pb-2">
                            <i className="far fa-home text-2xl pt-1 mb-1 block"></i>
                            <span className="block text-xs pb-1">Home</span>
                        </span>
                    </a>
                </div>
                <div className="flex-1 group">
                    <a href="#" className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                        <span className="block px-1 pt-1 pb-2">
                            <i className="far fa-compass text-2xl pt-1 mb-1 block"></i>
                            <span className="block text-xs pb-1">Explore</span>
                        </span>
                    </a>
                </div>
                <div className="flex-1 group">
                    <a href="#" className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                        <span className="block px-1 pt-1 pb-2">
                            <i className="far fa-search text-2xl pt-1 mb-1 block"></i>
                            <span className="block text-xs pb-1">Search</span>
                        </span>
                    </a>
                </div>
                <div className="flex-1 group">
                    <a href="#" className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                        <span className="block px-1 pt-1 pb-2">
                            <i className="far fa-cog text-2xl pt-1 mb-1 block"></i>
                            <span className="block text-xs pb-1">Settings</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
      </header>
      <section className={styles.mapContainer}>
        <MapContainer center={position} zoom={17} scrollWheelZoom={true} style={{ height: "99vh" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={nrkIcon} size={[45, 64]} placement="top">

          </Marker>
        </MapContainer>
      </section>
    </main>
  )
}
