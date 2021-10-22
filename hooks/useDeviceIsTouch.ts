import { useEffect, useState } from 'react';
import { useMounted } from './useMounted';

export function useDeviceIsTouch() {
	const mounted = useMounted();
	const [deviceIsTouch, setDeviceIsTouch] = useState(false);
	useEffect(() => {
		if (mounted && !deviceIsTouch) {
			const touchDeviceHandler = () => setDeviceIsTouch(true);
			window.addEventListener('touchstart', touchDeviceHandler);
			return () => window.removeEventListener('touchstart', touchDeviceHandler);
		}
	}, [mounted]);
	return deviceIsTouch;
}
