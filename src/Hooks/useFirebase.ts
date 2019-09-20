import {useEffect, useState} from 'react';
import {
    createNotificationListeners,
    hasMessagingPermission,
    getFirebaseToken,
    storeFirebaseToken,
    requestMessagingPermission,
} from '../Services/PushService';

export function useFirebase() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function initFirebase() {
            try {
                if (!(await hasMessagingPermission())) {
                    await requestMessagingPermission();
                }

                const token = await getFirebaseToken();
                await storeFirebaseToken(token);
                setToken(token);

                await createNotificationListeners();
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        initFirebase();
    }, []);

    return {loading, error, token};
}
