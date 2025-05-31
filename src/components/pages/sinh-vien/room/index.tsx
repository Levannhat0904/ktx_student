"use client";
import React, { useEffect, useState } from "react";
import RoomDetailView from "./RoomDetailView";
import { useQuery } from "@tanstack/react-query";
import roomApi from "@/api/room";
import LoadingRoom from "@/components/molecules/LoadingRoom";
import { Student } from "@/types/student";
import { useAuth } from "@/contexts/AuthContext";
import studentApi from "@/api/student";
import { useStudent } from "@/contexts/StudentContext";

const RoomDetailPage = () => {
  const { studentData } = useStudent();
  // const { roomId } = useParams();
  const [allTimelineData, setAllTimelineData] = useState<any[]>([]);
  const { data: roomData, isLoading: isRoomLoading } = useQuery({
    queryKey: ["roomDetail"],
    queryFn: () => roomApi.getRoomDetail(studentData?.dormitory?.roomId!), // Replace with actual room ID from context/state
  });

  useEffect(() => {
    const fetchTimeline = async () => {
      if (roomData) {
        // Fetch activity logs for all contracts
        const timelineResponse = await studentApi.getActivityLogs(
          "room",
          roomData.room.id
        );

        const sortedTimeline = timelineResponse.data.data.logs.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAllTimelineData(sortedTimeline || []);
      }
    };
    fetchTimeline();
  }, [roomData]);
  if (isRoomLoading || !roomData) {
    return <LoadingRoom />;
  }

  return (
    <RoomDetailView
      roomData={roomData}
      timelineData={allTimelineData}
      timelineLoading={isRoomLoading}
    />
  );
};

export default RoomDetailPage;
