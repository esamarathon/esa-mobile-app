import {useEffect} from 'react';
import {
    createNotificationListeners,
    hasPermission,
    getToken,
    storeToken,
    requestPermission,
} from '../Services/PushService';

export function useFirebase() {
    useEffect(() => {
        async function initFirebase() {
            try {
                if (!(await hasPermission())) {
                    await requestPermission();
                }

                const token = await getToken();
                await storeToken(token);

                await createNotificationListeners();
            } catch (error) {
                console.error(error);
            }
        }

        initFirebase();
    }, []);
}
