import { NativeModules } from 'react-native';


const { CallScreeningModule } = NativeModules;

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  
  // 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  // AM/PM logic
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert 0 to 12

  return `${hours}:${minutes} ${ampm}`;
};


export default {
  getRecentLogs() {
    return new Promise((resolve, reject) => {
      CallScreeningModule.getRecentLogs()
        .then((logs: any) => {

          const formattedData = logs?.map((item: any, index: any) => {
            const cleanedNumber = item.number.replace(/[^\d]/g, '');
            const last10Digits = cleanedNumber.slice(-10);
            return ({
              ...item,
              id: index,
              phoneNumber: last10Digits,
              formattedDate: formatDate(item.date)
            })
          });
          resolve(formattedData)
        })
        .catch(reject);
    });
  },
};
