import { View, Text, Pressable, ScrollView, Linking, StyleSheet } from 'react-native';
import MaterialList from './MaterialList';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpArrow from '../assets/svg/UpArrow';
import DownArrow from '../assets/svg/DownArrow';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function CourseDetails() {
    const materials = [
        {
            "section": "Data Acquisition and Data Preprocessing",
            "completed": 1,
            "topics": [
                {
                    "id": 6087,
                    "title": "Data Acquisition and Data Preprocessing",
                    "content": "https://www.youtube.com/embed/sVBayDOXFuc?si=3lngLkn2Fm_zjwvS",
                    "type": "youtube",
                    "completed": true,
                    "pre_request": false,
                    "code": ""
                }
            ]
        },
        {
            "section": "Exploratory Data Analysis",
            "completed": 0,
            "topics": [
                {
                    "id": 6088,
                    "title": "Exploratory Data Analysis - 1",
                    "content": "https://www.youtube.com/embed/t4LOv9h-FJM?si=t6LIJ1t6hiLJE21A",
                    "type": "youtube",
                    "completed": false,
                    "pre_request": false,
                    "code": ""
                },
                {
                    "id": 6089,
                    "title": "Exploratory Data Analysis - 2",
                    "content": "https://www.youtube.com/embed/yCDevFTNbC0?si=32MaoN-9yx4wFJFE",
                    "type": "youtube",
                    "completed": false,
                    "pre_request": false,
                    "code": ""
                },
                {
                    "id": 6090,
                    "title": "Exploratory Data Analysis - 3",
                    "content": "https://www.youtube.com/embed/okhrFgaUwio?si=PLLXBx6FYupMSxjq",
                    "type": "youtube",
                    "completed": false,
                    "pre_request": false,
                    "code": ""
                }
            ]
        },
        {
            "section": "Correlation analysis",
            "completed": 0,
            "topics": [
                {
                    "id": 6091,
                    "title": "Correlation analysis - 1",
                    "content": "https://www.youtube.com/embed/PEfQCv9nvSo?si=kj_TmoTrQPCrnQOn",
                    "type": "youtube",
                    "completed": false,
                    "pre_request": false,
                    "code": ""
                },
                {
                    "id": 6092,
                    "title": "Correlation analysis - 2",
                    "content": "https://www.youtube.com/embed/G5FkaxWBtkM?si=TZdgg9bdVdILqMAo",
                    "type": "youtube",
                    "completed": false,
                    "pre_request": false,
                    "code": ""
                }
            ]
        },
        {
            "section": "EDA using Tableau",
            "completed": 0,
            "topics": [
                {
                    "id": 6093,
                    "title": "EDA using Tableau",
                    "content": "https://www.youtube.com/embed/Se5j__mdyaI?si=Z1oBEaELoc-hP73I",
                    "type": "youtube",
                    "completed": false,
                    "pre_request": false,
                    "code": ""
                }
            ]
        },
        {
            "section": "SQL for Data Science",
            "completed": 0,
            "topics": [
                {
                    "id": 6094,
                    "title": "SQL for Data Science - 1",
                    "content": "https://www.youtube.com/embed/sTiWTx0ifaM?si=wcT36A6J3lkLMir4",
                    "type": "youtube",
                    "completed": false,
                    "pre_request": false,
                    "code": ""
                },
                {
                    "id": 6095,
                    "title": "SQL for Data Science - 2",
                    "content": "https://www.youtube.com/embed/TAHFF0hbAkE?si=6gNxG6ZT6-othaIk",
                    "type": "youtube",
                    "completed": false,
                    "pre_request": false,
                    "code": ""
                },
                {
                    "id": 6096,
                    "title": "SQL for Data Science - 3",
                    "content": "https://www.youtube.com/embed/oEiMslSs0dE?si=0epsczQhtGdbRiVc",
                    "type": "youtube",
                    "completed": false,
                    "pre_request": false,
                    "code": ""
                }
            ]
        },
        {
            "section": "End to End Data Analytics Project",
            "completed": 1,
            "topics": [
                {
                    "id": 6097,
                    "title": "End to End Data Analytics Project",
                    "content": "https://www.youtube.com/embed/tT4V7zguCnc?si=UC96U6hYc60kSk73",
                    "type": "youtube",
                    "completed": true,
                    "pre_request": false,
                    "code": ""
                }
            ]
        }
    ];

    const slotTiming = [
        {id: 47555, label: "17 Sep 2025 (11:00 am - 01:00 pm)"} ,
        {id: 47556, label: "18 Sep 2025 (02:00 pm - 04:00 pm)"},
        {id: 47557, label: "19 Sep 2025 (11:00 am - 01:00 pm)"},
        {id: 47558, label: "20 Sep 2025 (03:00 pm - 05:00 pm)"},
        {id: 47559, label: "21 Sep 2025 (10:00 am - 12:00 pm)"}
    ];

    const slotVenue = {
        "date": "2024-11-03",
        "start_time": "00:00:00",
        "end_time": "20:00:00",
        "venue": "Vedanayagam Auditorium"
    }

    const [courseName, setCourseName] = useState('');
    const [topBox, setTopBox] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false); // showing slots > 3
    const [filterSlotTiming, setFilterSlotTiming] = useState([]);
    const [selectSlot, setSelectSlot] = useState(-1); // for selecting slot option
    const [bookingTime , setBookingTime] = useState(""); // for storing selected slot time

    const [SlotBookedRes,setSlotBookedRes] = useState(""); // assuming response would be Maximum count reached or slot venue
    
    useEffect(() => {
        async function getCourseNme() {
            try {
                const res = await AsyncStorage.getItem('course_name');
                setCourseName(res);
            } catch (err) {
                console.log('error: ', err);
            }
        }
        getCourseNme();
    }, []);

    useEffect(() => {
        function SeeVisibleSlots() {
            if (slotTiming.length > 3) {
                if (isExpanded) {
                    setFilterSlotTiming(slotTiming);
                } else {
                    setFilterSlotTiming(slotTiming.slice(0, 3));
                }
            } else {
                setFilterSlotTiming(slotTiming);
            }
        }
        
        if (materials) {
            if (materials[0]['topics'][0].type === 'text') {
                materials[0]['topics'][0].content = decodeHtmlContentAdvanced(materials[0]['topics'][0].content);
                setTopBox(materials[0]['topics']);
            } else  {
                setTopBox(materials[0]['topics']);
            }
        }
        SeeVisibleSlots();
    }, [isExpanded]);


    const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
    };

    function handleTopBox(json) {
        if (json.type === 'text') {
            json.content = decodeHtmlContentAdvanced(json.content);
        }
        setTopBox([json]);
    }

    function decodeHtmlContentAdvanced(htmlContent, options = {}) {
        const {
            preserveBold = false,
            preserveItalic = false,
            customBulletPoint = '●',
            removeExtraSpaces = true
        } = options;

        if (!htmlContent || typeof htmlContent !== 'string') {
            return '';
        }

        let decoded = htmlContent
            // Decode unicode escapes
            .replace(/\\u003c/g, '<')
            .replace(/\\u003e/g, '>')
            .replace(/\\u0026/g, '&')
            .replace(/\\u0022/g, '"')
            .replace(/\\u0027/g, "'")
            .replace(/\\r\\n/g, '\n')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\n');

        // Handle bold tags based on preference
        if (preserveBold) {
            decoded = decoded.replace(/<b>(.*?)<\/b>/gi, '**$1**');
            decoded = decoded.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
        } else {
            decoded = decoded.replace(/<b>(.*?)<\/b>/gi, '$1');
            decoded = decoded.replace(/<strong>(.*?)<\/strong>/gi, '$1');
        }

        // Handle italic tags
        if (preserveItalic) {
            decoded = decoded.replace(/<i>(.*?)<\/i>/gi, '*$1*');
            decoded = decoded.replace(/<em>(.*?)<\/em>/gi, '*$1*');
        } else {
            decoded = decoded.replace(/<i>(.*?)<\/i>/gi, '$1');
            decoded = decoded.replace(/<em>(.*?)<\/em>/gi, '$1');
        }

        // Continue with other replacements
        decoded = decoded
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<p>/gi, '\n')
            .replace(/<\/p>/gi, '')
            .replace(/<div[^>]*>/gi, '')
            .replace(/<\/div>/gi, '')
            .replace(/<span[^>]*>/gi, '')
            .replace(/<\/span>/gi, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&apos;/g, "'");

        // Clean up formatting
        if (removeExtraSpaces) {
            decoded = decoded
                .replace(/\n\s*\n/g, '\n')
                .replace(/^\s+|\s+$/g, '')
                .replace(/\s{2,}/g, ' ');
        }

        return decoded;
    }

    // Check if SlotBookedRes is an object (venue details) or string (error/empty)
    const isSlotBooked = SlotBookedRes && typeof SlotBookedRes === 'object' && SlotBookedRes.venue;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topBox}>
                {topBox && (
                    <View>
                        <Text style={styles.topBoxTitle}>{topBox[0]?.title}</Text>
                        {topBox[0]?.type === 'youtube' ? (
                        <YoutubePlayer height={200} videoId={getYouTubeVideoId(topBox[0]?.content)} />
                        ) : topBox[0]?.type === 'link' ? (
                            <Pressable
                                onPress={() => Linking.openURL(`${topBox[0]?.content}`)}
                                style={styles.actionButton}
                            >
                                <Text style={styles.actionButtonText}>Open Link</Text>
                            </Pressable>
                        ) : (
                            <Text>{topBox[0]?.content}</Text>
                        )}
                        {topBox[0]?.completed === false && (
                            <Pressable
                                onPress={() => {
                                    if (topBox && topBox[0]) {
                                        const updated = [{ ...topBox[0], completed: true }];
                                        setTopBox(updated);
                                    }
                                }}
                                style={styles.actionButton}
                            >
                                <Text style={styles.actionButtonText}>Mark as Complete</Text>
                            </Pressable>
                        )}
                    </View>
                )}
            </View>

            {/* showing course details */}
            <View style={styles.courseDetailsContainer}>
                <Text style={styles.courseDetailsTitle}>Course Details</Text>
                <Text style={styles.courseName}>{courseName}</Text>
            </View>
            
            <View style={styles.materialsContainer}>
                <Text style={styles.sectionTitle}>Course Materials</Text>
                {materials.map((item, id) => (
                    <View key={id}>
                        <MaterialList
                            serialNum={id + 1}
                            details={item}
                            HandleTopBox={handleTopBox}
                        />
                        {id < materials?.length-1 && <View style={styles.separator} />}
                    </View>
                ))}
            </View>

            {!isSlotBooked ?
            <View style={styles.courseDetailsContainer}>
                <Text style={styles.courseDetailsTitle}>Available Slots</Text>
                    {typeof SlotBookedRes === 'string' && SlotBookedRes && <Text className='text-center text-red-500'>{SlotBookedRes}</Text>}
                    {slotTiming.length>0 ?
                    <View>
                        
                        {
                        filterSlotTiming.map((item, id) => (
                            <Pressable onPress={() => {setSelectSlot(id) ; setBookingTime(item.label)}} key={id} className={` ${selectSlot === id ? 'border-primary bg-secondary border-[2px] p-[17px] ': 'border-gray-200 bg-background border p-[18px]'} my-2   rounded-lg`}>
                                <Text>{item.label}</Text>
                            </Pressable>
                        ))}
                        
                        {slotTiming.length > 3 && (
                            <Pressable className='flex-row items-center justify-center' onPress={() => setIsExpanded(!isExpanded)}>
                                <Text className=' my-3 font-medium text-gray-500 text-lg'>
                                    {isExpanded ? 'Show Less' : `Show More (${slotTiming.length - 3})`}
                                </Text>
                                {isExpanded?<UpArrow color='gray'/>:<DownArrow color='gray'/>}
                            </Pressable>
                        )
                        }
                    </View>
                    :
                    <View className={'border-gray-200 bg-background border p-[15px] my-2 rounded-lg '}>
                        <Text className='text-center text-[16px] text-gray-500'>No slots available</Text>
                    </View>
                    } 
                
                <Pressable onPress={()=>bookingTime ? setSlotBookedRes(slotVenue) : setSlotBookedRes("select a slot")} style={styles.bookSlotButton}>
                    <Text style={styles.bookSlotButtonText}>Book a Slot</Text>
                </Pressable>
            </View>
            :
            <View className='mb-[10%]'>
                <View style={styles.courseDetailsContainer}>
                    <Text className='text-primary text-[16px] font-medium'>Slot Booked Successfully</Text>
                    <Text className='text-gray-500 text-[16px] font-medium my-2'>Assessment Date</Text>
                    <Text className='mb-2 font-medium text-[16px]'>{slotVenue?.date}</Text>
                    <Text className='text-gray-500 text-[16px] font-medium my-2'>Assessment Timings</Text>
                    <Text className='mb-2 font-medium text-[16px]'>{slotVenue?.start_time}  TO  {slotVenue?.end_time}</Text>
                    <Text className='text-gray-500 text-[16px] font-medium my-2'>Assessment Venue</Text>
                    <Text className='mb-2 font-medium text-[16px]'>{slotVenue?.venue}</Text>
                </View>
            </View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 0,
        marginBottom: 50,
        backgroundColor: '#f6f5fc',
    },
    topBox: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 60,
        marginBottom: 8,
        padding: 20,
    },
    topBoxTitle: {
        marginVertical: 10,
        fontWeight: '500',
        fontSize: 16,
    },
    actionButton: {
        marginVertical: 10,
        paddingVertical: 10,
        marginHorizontal: 40,
        backgroundColor: '#7D53F6',
        borderRadius: 8,
    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    materialsContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 12,
    },
    sectionTitle: {
        margin: 20,
        marginBottom:0,
        fontSize:15,
        fontWeight: '500',
    },
    separator: {
        backgroundColor: '#ddd7fc',
        height: 1,
        marginHorizontal: 10,
    },
    courseDetailsContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        marginTop:5
    },
    courseDetailsTitle: {
        fontWeight: '500',
        color: '#6b7280',
        fontSize: 16,
        marginBottom:10
    },
    courseName: {
        marginVertical: 8,
        fontWeight: '500',
        fontSize: 16,
    },
    bookSlotButton: {
        backgroundColor: '#7D53F6',
        paddingVertical: 14,
        borderRadius: 8,
        marginVertical: 8,
        marginTop:18
    },
    bookSlotButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});