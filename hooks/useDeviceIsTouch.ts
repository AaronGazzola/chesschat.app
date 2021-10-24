import React, { useEffect, useState } from 'react';
import { useMounted } from './useMounted';

export const useDeviceIsTouch = () => {
	const [deviceIsTouch, setDeviceIsTouch] = useState<boolean>(false);
	const mounted = useMounted();
	useEffect(() => {
		const touchHandler = () => {};
		if (mounted) {
			window.addEventListener('touchstart', touchHandler);
		}
		return () => window.removeEventListener('touchstart', touchHandler);
	}, [mounted]);
	return deviceIsTouch;
};
