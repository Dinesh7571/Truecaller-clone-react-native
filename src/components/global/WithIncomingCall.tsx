import { FC, useEffect, useRef, useState } from "react";
import { Animated, Image, NativeAppEventEmitter, NativeEventEmitter, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { findUser } from "../../service/authService";
import { getAbbrName } from "../../utils/miscUtils";
import UserAvatar from "../ui/UserAvatar";
import { Colors, formatPhoneNumber } from "../../utils/Constants";
import { UserCircleIcon, XMarkIcon } from "react-native-heroicons/solid";
import { navigate } from "../../utils/NavigationUtils";
import { ChatBubbleOvalLeftEllipsisIcon, NoSymbolIcon, PhoneIcon } from "react-native-heroicons/outline";

const callScreeningEvents = new NativeEventEmitter()
const withIncomingCall = <P extends object>(WrappedComponent: React.ComponentType<P>): FC<P> => {

    const WithIncomingCallComponent: FC<P> = (props) => {
        const [incomingNumber, setIncomingNumber] = useState<string | undefined>();
        const [userInfo, setUserInfo] = useState<any>()


        const slideAnim = useRef(new Animated.Value(300)).current
        const backdropAnim = useRef(new Animated.Value(0)).current


        useEffect(() => {
            const subscription = callScreeningEvents.addListener("CallScreeningEvent", (phoneNumber) => {

                const cleanedNumber = phoneNumber.replace(/[^\d]/g, '')
                const last10Digits = cleanedNumber.slice(-10)
                setIncomingNumber(last10Digits)
                slideUp(last10Digits)
            })

            return () => {
                subscription.remove()
            }

        }, [incomingNumber])



        const slideUp = async (phoneNumber: string) => {

            try {
                const data = await findUser(phoneNumber)
                setUserInfo(data)
            } catch (error) {
                setUserInfo({
                    phoneNumber:phoneNumber,
                    name:"Unknown",
                    isSpam:false,


                })
                console.log(error)
            }
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 1200,
                    useNativeDriver: true
                }),
                Animated.timing(backdropAnim, {
                    toValue: 0.9,
                    duration: 1200,
                    useNativeDriver: true
                }),
            ]).start()

        }

        const slideDown = async () => {

            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 300,
                    duration: 1200,
                    useNativeDriver: true
                }),
                Animated.timing(backdropAnim, {
                    toValue: 0,
                    duration: 1200,
                    useNativeDriver: true
                }),
            ]).start(() => {
                setIncomingNumber(undefined)
                setUserInfo(undefined)
            })

        }

        let abbrName = userInfo?.name ? getAbbrName(userInfo?.name) : 'UN'


        return (
            <View style={styles.container}>
                <WrappedComponent {...props} />
                {incomingNumber && <Animated.View style={[styles.backDrop, { opacity: backdropAnim }]} />}

                {incomingNumber && (
                    <Animated.View style={[styles.subContainer, { transform: [{ translateY: slideAnim }] }]}>
                        <Image source={require('../../assets/logo_text.png')} className="w-20 my-2 h-4" tintColor={'white'} />
                        <View className="bg-[#202124] rounded-lg overflow-hidden">
                            <View className={`${userInfo?.isSpam ? 'bg-error' : 'bg-primary'}`}>
                                <View className="justify-between flex-row p-4">
                                    <View className="flex-row items-center space-x-2">
                                        <UserAvatar isSpam={userInfo?.isSpam} text={abbrName} onPress={() => { }} />

                                        <View>
                                            <Text className="text-md font-semibold text-white" >Incoming Call...</Text>
                                            <Text className="text-lg font-semibold text-white" >{userInfo?.name || 'Unknown'}</Text>
                                            <Text className="text-md font-semibold text-white" >{formatPhoneNumber(incomingNumber?.slice(-10)) || ""}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={slideDown} className="p-1 items-center justify-center self-start rounded-full bg-white">
                                        <XMarkIcon color={Colors.primary} size={16} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                                    className="rounded-md flex-row items-center space-x-2 justify-center p-2 m-2"
                                    onPress={() => {
                                        navigate('CallerScreen', { item: userInfo })
                                        slideDown()
                                    }}>
                                    <UserCircleIcon color={'#fff'} size={22} />
                                    <Text className="font-semibold text-white text-lg">View Profile </Text>
                                </TouchableOpacity>

                            </View>

                            <View className="flex-row items-center w-full  ">
                                <TouchableOpacity className="items-center justify-center w-1/3">
                                    <PhoneIcon color='#eee' size={22} />
                                    <Text className="text-gray-300 text-md font-bold text-center">CALL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="items-center justify-center w-1/3">
                                    <ChatBubbleOvalLeftEllipsisIcon color='#eee' size={22} />
                                    <Text className="text-gray-300 text-md font-bold text-center">MESSAGE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="items-center justify-center w-1/3">
                                    <NoSymbolIcon color='#eee' size={22} />
                                    <Text className="text-gray-300 text-md font-bold text-center">SPAM</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <Text className=" font-extrabold text-md text-center my-2 mt-8 text-teal-200">ADVERTISEMENt</Text>
                       <View className="h-40">
                       <Image source={require('../../assets/images/banner.jpg')} style={{resizeMode:'contain',height:'100%', width:'100%', borderRadius:10 }} />
                        </View>
                    </Animated.View>
                )}
            </View>
        )
    }
    return WithIncomingCallComponent
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backDrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 1
    },
    subContainer: {
        position: 'absolute',
        bottom: '10%',
        width: '100%',
        padding: 10,
        zIndex: 2

    }
})

export default withIncomingCall