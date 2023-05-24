import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import styles from './user-location.popup.module.css';

type UserLocationPopupProps = {
  changeIsShowPopup: (value: React.SetStateAction<boolean>) => void;
  userName: string;
  location: string;
};

const LocationStation: Record<string, [number, number]> = {
  Звёздная: [59.833233, 30.349492],
  Пионерская: [60.002483, 30.296808],
  Петроградская: [59.966378, 30.311556],
  Удельная: [60.016661, 30.315647],
  Спортивная: [59.952083, 30.290611],
};

export default function UserLocationPopup({
  changeIsShowPopup,
  userName,
  location,
}: UserLocationPopupProps): JSX.Element {
  useEffect(() => {
    document
      .querySelector('.leaflet-control-attribution.leaflet-control')
      ?.classList.add(styles.controlCorectPopup);
  }, [changeIsShowPopup]);

  const position: [number, number] = [59.95, 30.33];

  return (
    <section
      className="popup"
      style={{ position: 'fixed', top: 0, left: 0 }}
    >
      <div className="popup__wrapper popup__wrapper--map">
        <div className="popup-head popup-head--address">
          <h2 className="popup-head__header">{userName}</h2>
          <p className="popup-head__address">
            <svg
              className="popup-head__icon-location"
              width="12"
              height="14"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-location"></use>
            </svg>
            <span>м. {location}</span>
          </p>
          <button
            className="btn-icon btn-icon--outlined btn-icon--big"
            type="button"
            aria-label="close"
            onClick={() => changeIsShowPopup(() => false)}
          >
            <svg
              width="20"
              height="20"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className="popup__content-map">
          <div className="popup__map">
            <MapContainer
              center={position}
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: '622px', width: '1160px' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={LocationStation[location]}>
                <Popup>ст. м. {location}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
