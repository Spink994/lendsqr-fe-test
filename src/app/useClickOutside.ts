import React, { RefObject } from 'react';

function useClickOutside<T extends HTMLElement>(callback: () => void): React.RefObject<T> {
	const ref = React.useRef<T>(null);

	/**
    |--------------------------------------------------
    | Fires the callback
    |--------------------------------------------------
    */
	React.useEffect(() => {
		/**
        |--------------------------------------------------
        | The handle click outside function
        |--------------------------------------------------
        */
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		/**
        |--------------------------------------------------
        | Mouse down
        |--------------------------------------------------
        */
		document.addEventListener('mousedown', handleClickOutside);

		/**
        |--------------------------------------------------
        | Clean up
        |--------------------------------------------------
        */
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [callback]);

	return ref as RefObject<T>;
}

export default useClickOutside;
