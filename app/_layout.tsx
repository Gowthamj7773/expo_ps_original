import { Stack } from "expo-router";
import  './global.css';
export default function RootLayout() {
  return (
          <Stack>
          <Stack.Screen name="my_courses/MyCourses" options={{ headerShown: false }} />
          <Stack.Screen name="course_details/CourseDetails" options={{ headerShown: false }} />
          </Stack>
  )
}
