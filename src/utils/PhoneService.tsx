import { PermissionsAndroid, Platform } from "react-native";





export const checkPermissions = async (CallScreeningModule: any) => {
    if (Platform.OS === 'android') {
        try {
            await CallScreeningModule.requestDefaultDialerRole();
            await CallScreeningModule.requestCallScreeningRole();
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
                {
                    title: 'RN Call Logs',
                    message: 'Access your call logs',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            console.log('Permissions granted');

        } catch (error) {
            console.error('Permission request failed', error);
        }
    }
}

