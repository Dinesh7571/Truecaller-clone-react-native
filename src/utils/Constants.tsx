import { screenWidth } from "./Scaling";

export enum Colors {
    primary = '#0087FF',
    lightGreen = '#E6FFF3',
    darkGreen = '#1AC96F',
    background = '#EAF4FB',
    spam = '#FC4236',
    white = '#fff',
    text = "#000",
    lightText = '#C5C5C7',
    border = '#F5F6F8'
}

export const formatPhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber?.length === 10) {
        return `${phoneNumber?.slice(0, 5)} ${phoneNumber?.slice(5)}`;
    }
    return phoneNumber;
};