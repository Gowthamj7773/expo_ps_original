import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import MaterialList from './MaterialList';
import { router } from 'expo-router';

export default function CourseDetails() {
    const materials =
    [
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

    const [courseName, setCourseName] = useState('');
    const [topBox, setTopBox] = useState(null);
    const [materialsData, setMaterialsData] = useState(materials);
    
    useEffect(function() {
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

    useEffect(function() {
        if (materials) {
            if (materials[0]['topics'][0].type === 'text') {
                materials[0]['topics'][0].content = decodeHtmlContentAdvanced(materials[0]['topics'][0].content);
                setTopBox(materials[0]['topics']);
            } else  {
                setTopBox(materials[0]['topics']);
            }
        }
    }, []);

    function getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function handleTopBox(json) {
        if (json.type === 'text') {
            json.content = decodeHtmlContentAdvanced(json.content);
        }
        setTopBox([json]);
    }

    function updateMaterialCompletion(sectionIndex, topicIndex, completed) {
        const updatedMaterials = [...materialsData];
        updatedMaterials[sectionIndex].topics[topicIndex].completed = completed;
        
        // Update section completed count
        const completedCount = updatedMaterials[sectionIndex].topics.filter(topic => topic.completed).length;
        updatedMaterials[sectionIndex].completed = completedCount;
        
        setMaterialsData(updatedMaterials);
    }

    function calculateOverallProgress() {
        const totalTopics = materialsData.reduce((acc, section) => acc + section.topics.length, 0);
        const completedTopics = materialsData.reduce((acc, section) => 
            acc + section.topics.filter(topic => topic.completed).length, 0);
        return Math.round((completedTopics / totalTopics) * 100);
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
            .replace(/\\u003c/g, '<')
            .replace(/\\u003e/g, '>')
            .replace(/\\u0026/g, '&')
            .replace(/\\u0022/g, '"')
            .replace(/\\u0027/g, "'")
            .replace(/\\r\\n/g, '\n')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\n');

        if (preserveBold) {
            decoded = decoded.replace(/<b>(.*?)<\/b>/gi, '**$1**');
            decoded = decoded.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
        } else {
            decoded = decoded.replace(/<b>(.*?)<\/b>/gi, '$1');
            decoded = decoded.replace(/<strong>(.*?)<\/strong>/gi, '$1');
        }

        if (preserveItalic) {
            decoded = decoded.replace(/<i>(.*?)<\/i>/gi, '*$1*');
            decoded = decoded.replace(/<em>(.*?)<\/em>/gi, '*$1*');
        } else {
            decoded = decoded.replace(/<i>(.*?)<\/i>/gi, '$1');
            decoded = decoded.replace(/<em>(.*?)<\/em>/gi, '$1');
        }

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

        if (removeExtraSpaces) {
            decoded = decoded
                .replace(/\n\s*\n/g, '\n')
                .replace(/^\s+|\s+$/g, '')
                .replace(/\s{2,}/g, ' ');
        }

        return decoded;
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.topBox}>
                {topBox && (
                    <View>
                        {topBox[0]?.type === 'youtube' ? (
                        <YoutubePlayer height={190} videoId={getYouTubeVideoId(topBox[0]?.content)} />
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
                    </View>
                )}
            </View>

            {/* Course Details with Progress Bar */}
            <View style={styles.courseDetailsContainer}>
                <Text style={styles.courseDetailsTitle}>Course Details</Text>
                <Text style={styles.courseName}>{courseName}</Text>
                
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${calculateOverallProgress()}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{calculateOverallProgress()}%</Text>
                </View>
            </View>
            
            <View className='mt-5'>
                {materialsData.map((item, id) => (
                    <View key={id}>
                        <MaterialList
                            serialNum={id + 1}
                            details={item}
                            sectionIndex={id}
                            HandleTopBox={handleTopBox}
                            updateMaterialCompletion={updateMaterialCompletion}
                            isFirst={id === 0}
                            isLast={id === materialsData.length - 1}
                        />
                    </View>
                ))}
            </View>
            <Pressable onPress={()=>router.push("/course_details/BookSlot")} className='bg-primary my-5 p-3 py-4 rounded-lg'>
                <Text className='text-center font-medium text-[16px] text-white'>Book a Slot</Text>
            </Pressable>
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
        padding: 10,
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
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        gap: 10,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#ECE8FE',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#7D53F6',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#7D53F6',
        minWidth: 35,
    },
});