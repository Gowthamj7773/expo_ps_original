import { View, Text, ScrollView, Pressable, TouchableOpacity, Modal } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import SlotIcon from '../assets/svg/SlotIcon'
import VerifiedTick from  '../assets/svg/VerifiedTick'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function BookSlot() {
  const [selectDay, setSelectDay] = useState(-1); // this is for setting the day
  const [selectSlot,setSelectSlot] = useState(-1) // this is for selecting the slot
  const [showSlot,setShowSlot] = useState([])
  const [searchByDay,setSearchByDay] = useState('$')
  const [courseName,setCourseName] = useState("N/A")
  const [slotId ,setSlotId] = useState(null); // later used for slot post request. also used for error handling in booking slot (eg: select a slot..)
  const [Error,setError] = useState("");
  // New states for modal and booking success
  const [showModal, setShowModal] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookedSlotDetails, setBookedSlotDetails] = useState(null);

  const AvailableSlot = [
  {id: 47555, label: "17 Sep 2025 (11:00 am - 01:00 pm)"},
  {id: 47556, label: "17 Sep 2025 (1:20 pm - 03:20 pm)"},
  {id: 47557, label: "17 Sep 2025 (09:00 am - 11:00 am)"},
  {id: 47558, label: "17 Sep 2025 (02:00 pm - 04:00 pm)"},
  {id: 47559, label: "17 Sep 2025 (10:00 am - 12:00 pm)"},
  {id: 47560, label: "17 Sep 2025 (03:00 pm - 05:00 pm)"},
];

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

// Function to convert 24-hour format to 12-hour format
const convertTo12Hour = (time24) => {
  if (!time24) return time24;
  
  const [hours, minutes, seconds] = time24.split(':');
  const hour = parseInt(hours);
  const min = minutes;
  
  if (hour === 0) {
    return `12:${min} AM`;
  } else if (hour < 12) {
    return `${hour}:${min} AM`;
  } else if (hour === 12) {
    return `12:${min} PM`;
  } else {
    return `${hour - 12}:${min} PM`;
  }
};

// Function to get unique days from available slots
const getUniqueDays = () => {
  const uniqueDaysMap = new Map();
  
  AvailableSlot.forEach((slot, index) => {
    const parsed = parseSlotLabel(slot.label);
    if (parsed && !uniqueDaysMap.has(parsed.formattedDate)) {
      uniqueDaysMap.set(parsed.formattedDate, {
        ...slot,
        originalIndex: index,
        parsed: parsed
      });
    }
  });
  
  return Array.from(uniqueDaysMap.values());
};

function parseSlotLabel(label) {
  const regex = /(\d{1,2}) (\w{3}) (\d{4}) \(([^)]+)\)/;
  const match = label.match(regex);
  if (!match) return null;
  const [, day, monthName, year, timeRange] = match;
  
  // Month mapping
  const monthMap = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  const monthNumber = monthMap[monthName];
  const date = new Date(parseInt(year), monthNumber, parseInt(day));
  
  // Parse time range
  function parseTimeRange(timeRange) {
    const timeRegex = /(\d{1,2}):(\d{2})\s*(am|pm)\s*-\s*(\d{1,2}):(\d{2})\s*(am|pm)/i;
    const match = timeRange.match(timeRegex);
    
    if (!match) return { timeRange12: timeRange, timeRange24: timeRange };
    const [, startHour, startMin, startPeriod, endHour, endMin, endPeriod] = match;
    // Convert to 24-hour format
    function convertTo24Hour(hour, min, period) {
      let hour24 = parseInt(hour);
      if (period.toLowerCase() === 'pm' && hour24 !== 12) {
        hour24 += 12;
      } else if (period.toLowerCase() === 'am' && hour24 === 12) {
        hour24 = 0;
      }
      return `${hour24.toString().padStart(2, '0')}:${min}`;
    }
    
    const startTime12 = `${startHour}:${startMin} ${startPeriod.toUpperCase()}`;
    const endTime12 = `${endHour}:${endMin} ${endPeriod.toUpperCase()}`;
    const startTime24 = convertTo24Hour(startHour, startMin, startPeriod);
    const endTime24 = convertTo24Hour(endHour, endMin, endPeriod);
    
    return {
      timeRange12: `${startTime12} - ${endTime12}`,
      timeRange24: `${startTime24} - ${endTime24}`
    };
  }
  
  const timeInfo = parseTimeRange(timeRange);
  
  return {
    dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }), // "Wed"
    dayOfWeekFull: date.toLocaleDateString('en-US', { weekday: 'long' }), // "Wednesday"
    fullDate: `${day} ${monthName} ${year}`, // "17 Sep 2025"
    formattedDate: `${monthName}'${day}`, // "Sep'17"
    timeRange12: timeInfo.timeRange12, // "11:00 AM - 01:00 PM"
    timeRange24: timeInfo.timeRange24, // "11:00 - 13:00"
  };
}

useEffect(()=>{
  const filtered = AvailableSlot.filter(slot => slot.label.includes(searchByDay));
  console.log(filtered)
  setShowSlot(filtered)
},[selectDay])

// Get unique days for the horizontal scroll
const uniqueDays = getUniqueDays();

// Function to handle booking confirmation
const handleBookSlot = () => {
  if (slotId) {
    setShowModal(true);
    setError(null);
  } else {
    setError("Select a slot.");
  }
};

// Function to simulate booking API call and success
const confirmBooking = () => {
  // Simulate API response
  const mockSlotDetails = {
    "slot_details": {
      "date": "2024-11-03",
      "start_time": "00:00:00", 
      "end_time": "20:00:00",
      "venue": "Vedanayagam Auditorium"
    }
  };
  
  setBookedSlotDetails(mockSlotDetails.slot_details);
  setIsBooked(true);
  setShowModal(false);
  console.log('Booking confirmed for slot ID:', slotId);
};

  return (
    <ScrollView className='px-[20px] mt-10 bg-background'>
      {/* Only show "Choose a slot" when slots are available and not booked */}
      {!isBooked && AvailableSlot?.length > 0 && <Text className='text-[18px] font-bold'>Choose a slot</Text>}
      
      {/* Hide date selector if booked */}
      {!isBooked && (
        <ScrollView className='my-5' horizontal={true} showsHorizontalScrollIndicator={false}>
          {uniqueDays?.map((item, id) => (
            <Pressable
              onPress={() => {setSelectDay(id) ; setSearchByDay(item.parsed?.fullDate)}}
              key={id}
              className={`${selectDay === id ? "bg-primary" : "border-gray-200 border-[1px] bg-white"} rounded-xl p-5 mx-2 items-center`}
              style={{ borderRadius: 16 }} // Ensures rounded corners
            >
              <Text className={`font-medium text-[15px] my-1 ${selectDay === id ? "text-white" : "text-black"}`}>
                {item.parsed?.dayOfWeek}
              </Text>
              <Text className={`font-medium text-[16px] ${selectDay === id ? "text-white" : "text-black"}`}>
                {item.parsed?.formattedDate}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      <View>
        {showSlot?.length > 0  ? (
          <View>
              {/* Hide slot selection if booked */}
              {!isBooked && (
                <View className='flex-row flex-wrap justify-around'>
                  {showSlot.map((item, id) => (
                    <View key={id} className='my-3' style={{ borderRadius: 16, overflow: 'hidden' }}>
                      <Pressable onPress={() => {setSelectSlot(id); setSlotId(item.id)}} style={{ borderRadius: 16, overflow: 'hidden' }}>
                        <View className={`${selectSlot === id ? "bg-white" : "bg-secondary"} flex-row justify-center items-center`}>
                            <Text className={` text-center text-[14px] font-medium  text-primary p-2`} style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                              {selectSlot === id ? "Selected" : "Available"}
                            </Text>
                            {selectSlot  === id && <VerifiedTick/>}
                        </View>
                        <Text className={`${selectSlot === id ? "bg-primary text-white" : "bg-white"} text-center text-[15px] font-medium p-3 py-5`} style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                          {parseSlotLabel(item?.label)?.timeRange12}
                        </Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}
                              {/* Show booking details if booked, otherwise show button */}
                {isBooked && bookedSlotDetails ? (
                  <View>
                      <View className='bg-white p-5 rounded-lg my-3'>
                        <Text className='text-gray-500 text-[16px] font-medium mb-2'>Course details</Text>
                        <Text className='text-[16px]  font-medium mb-5'>{courseName}</Text>
                      </View>
                      <View className='p-5 bg-white rounded-lg'>
                            <Text className='text-gray-500 text-[16px] font-medium mb-5'>Assessment Venue Details</Text>
                                <View className='flex-row items-center mb-3'>
                                  <VerifiedTick size={20} />
                                  <Text className='text-primary text-[16px] font-medium ml-2'>Slot Booked Successfully!</Text>
                                </View>
                                
                                <Text className='text-gray-500 text-[16px] font-medium mb-1'>Assessment Date</Text>
                                <Text className='text-[15px] font-medium mb-3'>{bookedSlotDetails.date}</Text>
                                
                                <Text className='text-gray-500 text-[16px] font-medium mb-1'>Assessment Timings</Text>
                                <Text className='text-[15px] font-medium mb-3'>
                                  {convertTo12Hour(bookedSlotDetails.start_time)} TO {convertTo12Hour(bookedSlotDetails.end_time)}
                                </Text>
                                
                                <Text className='text-gray-500 text-[16px] font-medium mb-1'>Assessment Venue</Text>
                                <Text className='text-[15px] font-medium'>{bookedSlotDetails.venue}</Text>
                      </View>
                </View>
                ) : 
              <View className='bg-white p-5 rounded-lg mt-3 mb-20'>
                <Text className='text-gray-500 text-[16px] font-medium my-2'>Course details</Text>
                <Text className='text-[16px]  font-medium mb-5'>{courseName}</Text>
                {Error && <Text className='text-red text-[15px] text-red-500 text-center font-medium mb-2'>{Error}</Text>}
                  <Pressable onPress={handleBookSlot} className='bg-primary p-4  rounded-lg '>
                    <Text className='text-white font-medium text-[16px] text-center'>Book a slot</Text>
                  </Pressable>
              </View>
            }
          </View>
        ) : (
          <View className='relative mx-2 my-8 z-50'>

            {/* Main container */}
            <View className='bg-white border-3 border-primary rounded-3xl p-8 items-center relative z-10'>
            <View className='z-0  absolute  -left-5 -top-7 w-16 h-16 bg-secondary rounded-full'></View>
            <View className='z-0 absolute -bottom-5 -right-5 w-12 h-12 bg-primary rounded-full'></View>
              {/* Icon */}
              <View className='bg-primary rounded-full p-4 mb-4 shadow-lg'>
                <SlotIcon size={40}/>
              </View>
              
              {/* Short message */}
              <Text className='text-primary font-black text-xl mb-2'>No Slots Available</Text>
              <Text className='text-primaryLight text-center text-[15px] mb-6'>Try a different date</Text>
            </View>
          </View>
        )}
      </View>

      {/* Booking Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable 
          className='flex-1 justify-center items-center bg-black/50'
          onPress={() => setShowModal(false)}
        >
          <Pressable 
            className='bg-white rounded-2xl p-6 mx-7  shadow-lg'
            onPress={() => {}}
          >
            {/* Header */}
            <View className='items-center mb-4'>
              <View className='bg-primary rounded-full p-3 mb-3'>
                <SlotIcon size={32} />
              </View>
              <Text className='text-xl font-bold text-gray-800 mb-2'>Confirm Booking</Text>
              <Text className='text-gray-600 text-center text-[15px]'>
                Are you sure you want to book this slot?
              </Text>
            </View>

            {/* Slot Details */}
            <View className='bg-gray-50 rounded-lg p-4 mb-5'>
              <Text className='text-gray-500 text-[14px] font-medium mb-1'>Course</Text>
              <Text className='text-[16px] font-medium mb-3'>{courseName}</Text>
              
              {selectSlot >= 0 && showSlot[selectSlot] && (
                <>
                  <Text className='text-gray-500 text-[14px] font-medium mb-1'>Selected Slot</Text>
                  <Text className='text-[16px] font-medium'>
                    {parseSlotLabel(showSlot[selectSlot]?.label)?.timeRange12}
                  </Text>
                </>
              )}
            </View>

            {/* Action Button */}
            <Pressable 
              onPress={confirmBooking}
              className='bg-primary p-4 rounded-lg'
            >
              <Text className='text-white font-medium text-[16px] text-center'>Confirm</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  )
}