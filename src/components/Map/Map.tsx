import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup as LeafletPopup } from 'react-leaflet'

import { usePythonApi, usePythonState } from '../../hooks/pythonBridge'

import styles from './Map.module.css'
import nrkIconImage from '../../assets/nrk.png';
import nrkInactiveImage from '../../assets/nrk-inactive.png';
import { dayjs } from '../../lib/dayjs'

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

const nrkInactiveIcon = new L.Icon({
    iconUrl: nrkInactiveImage,
    iconRetinaUrl: nrkInactiveImage,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(45, 64),
    className: ''
});

let initialPosition = [48.7385745, 37.58618];
let lastLocation = null;

const MapRecenter = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    // Fly to the new coordinates with animation
    map.flyTo(center, zoom);
    // Or use setView to jump instantly
    // map.setView(center, zoom);
  }, [center, zoom, map]); // Re-run when center or zoom changes

  return null; // This component does not render anything
};


export default function Header() {
  const [mapCenter, setMapCenter] = useState(initialPosition);
  const [isVisibleObstructions, showObstructions] = useState(false);
  const updatedAt = usePythonState('updatedAt')
  const location = usePythonState('location') || {}
  let status = usePythonState('status') || {}
  const error = usePythonState('error')

  if (location && location.lat) {
    if (lastLocation != location) {
      setMapCenter([location.lat, location.lon])
      lastLocation = location
    }
  }

  return (
    <main>
      <header className="w-full border-b bg-sidebar-900 text-sidebar-100">
        <div className="mx-auto flex h-12 max-w-screen-2xl items-center justify-between px-4 text-sm" onClick={() => showObstructions(!isVisibleObstructions)}>

          <div className="flex items-center gap-3">
            <span className="font-semibold">Старлінк</span>

            {(status && status.uptime) && (
              <span className="badge badge-theme-green pr-2 gap-1">
                Online, підключений
                <span className="" title={dayjs().subtract(status.uptime, 'seconds').format('DD.MM.YYYY HH:mm:ss')}>
                  {dayjs().subtract(status.uptime, 'seconds').fromNow()}
                </span>
              </span>
            )}

            {(!status || !status.uptime) && (
              <span className="badge badge-theme-pink pr-2">
                Offline
              </span>
            )}

            <div className="text-xs flex flex-row gap-3 items-center">
              {(status && status.ping_latency) && (
                <div className="text-sidebar-400">
                  Затримка: <span className="text-sidebar-100">{Math.ceil(status.ping_latency)}ms</span>
                </div>
              )}

              {(status && status.throughput) && (
                <div className="text-sidebar-400">
                  Пропускна здатність: <span className="text-sidebar-100">{Math.ceil(status.throughput / (1024 * 1024))} MBps</span>
                </div>
              )}

              {(status && status.ping_drop_rate == 0) && (
                <span className="badge badge-theme-green pr-2 gap-1">
                  Втрат сигналу мережі Starlink немає
                </span>
              )}

              {(status && status.ping_drop_rate > 0) && (
                <span className={`badge ${(status.ping_drop_rate < 0.1 ? 'badge-theme-orange' : 'badge-theme-ping')} pr-2 gap-1`}>
                  Втрати сигналу мережі Starlink: <span className="text-sidebar-100">{Math.ceil(status.ping_drop_rate * 100)}%</span>
                </span>
              )}
            </div>
          </div>

          <div className="items-center gap-4 md:flex">
            {(location && location.lat) && (
              <div className="items-center gap-4 md:flex">
                <span className="badge badge-theme-green pr-2 gap-1">
                  <span className="h-2 w-2 rounded-full bg-lime-500"></span>
                  <span>Локація отримана</span>
                </span>
                <div className="text-sidebar-400">
                  <input type="text" readOnly={true} className="border-0 bg-transparent text-xs rounded" value={`${location.lat},${location.lon}`} />
                </div>
              </div>
            )}

            {(!location || !location.lat) && (
              <span className="badge badge-theme-pink pr-2 gap-1">
                <span className="h-2 w-2 rounded-full bg-pink-500"></span>
                <span>Локація невідома</span>
              </span>
            )}
          </div>
        </div>

        {error && (
          <div className="max-w-screen-2xl mx-auto">
            <div className="alert alert-error m-2">
              {error}
            </div>
          </div>
        )}

        {isVisibleObstructions && (
          <div className="mx-auto flex h-12 max-w-screen-2xl items-center gap-4 px-4 text-sm">
            <span>Перешкоди</span>
            <div className="text-xs flex flex-row gap-3">
              {(status && status.obstruction_fraction_obstructed) && (
                <div className="text-sidebar-400">
                  {Math.ceil(status.obstruction_fraction_obstructed * 100)}% неба закрито
                </div>
              )}

              {(status && status.obstruction_valid) && (
                <div className="text-sidebar-400">
                  {Math.ceil(status.obstruction_valid / 60)} хвилин отримання даних перешкод
                </div>
              )}

              {(status && status.obstruction_duration) && (
                <div className="text-sidebar-400">
                  {Math.ceil(status.obstruction_duration / 60)} хвилин - середня тривалість перешкоди сигналу
                </div>
              )}

              {(status && status.obstruction_patches_valid) && (
                <div className="text-sidebar-400">
                  {Math.ceil(status.obstruction_patches_valid)} кількість валідних точок
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="relative">
        <section className={styles.mapContainer}>
          <MapContainer center={mapCenter} zoom={17} scrollWheelZoom={true} style={{ height: "99vh" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapRecenter center={mapCenter} zoom={17} />
            {(location && location.lat) && (
              <Marker position={[location.lat, location.lon]} icon={nrkIcon} size={[45, 64]} placement="top" />
            )}
            {((!location || !location.lat) && lastLocation && lastLocation.lat) && (
              <Marker position={[lastLocation.lat, lastLocation.lon]} icon={nrkInactiveIcon} size={[45, 64]} placement="top" />
            )}
          </MapContainer>
        </section>
      </div>
    </main>
  )
}
