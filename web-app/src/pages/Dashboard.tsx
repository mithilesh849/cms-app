import React, { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BatteryCharging } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/utils/api"; // Assuming this is where your API config is located
import { io } from 'socket.io-client'; // Import Socket.IO client
import evanImage from './../assets/ev-van.png'
import stationIcon from './../assets/station-icon.png'
import powerBtnIcon from './../assets/power-btn.png'

const Dashboard = () => {
  const [chargingHistory, setChargingHistory] = useState(null);

  useEffect(() => {
    // Fetch initial charging history data
    const fetchChargingHistory = async () => {
      try {
        const response = await api.get("/charging-history/getChargingHistoryByCriteria", {
          params: {
            vehicle: "67b33e2f5bb3196339388e54", // Fixed vehicle ID for now
          },
        });

        if (response.data.length > 0) {
          console.log(response.data[0]);
          setChargingHistory(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching charging history:", error);
      }
    };

    fetchChargingHistory();

    // Establish Socket.IO connection for real-time updates
    const socket = io("http://localhost:5004"); // Adjust the URL if different

    // Listen for updates
    socket.on("chargingStatusUpdate", (newData) => {
      console.log("Received update:", newData);
      // Only update if the update pertains to our vehicle
      if (newData.vehicle._id === "67b33e2f5bb3196339388e54") {
        console.log("Updating state with new data");
        setChargingHistory(newData);
      }
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("chargingStatusUpdate");
      socket.disconnect();
    };
  }, []);

  // Function to calculate time connected
  const calculateTimeConnected = () => {
    if (!chargingHistory) return "N/A";
    const now = new Date();
    const startTime = new Date(chargingHistory.startTime);
    const diffMs = now - startTime;
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    return `${diffHrs} Hours`;
  };

  return (
    <AppLayout>
      <div className="max-w-screen-xl mx-auto px-2">

       {/* Charging Stations  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((station, index) => (
            <Card
              key={station}
              className={`bg-zinc-900 shadow-lg rounded-lg ${
                index === 0 ? 'border-2 border-green-700' : 'border-none'
              }`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                {/* Left: Charging Icon */}
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                <img src={stationIcon} className=" bg-zinc-800 h-6" />
                </div>
                {/* Right: Station ID and Slots */}
                <div className="flex flex-col flex-grow">
                  <p className="text-sm text-gray-400 p-1">Station ID</p>
                  <p className="text-md text-gray-100 p-1">{`STN-${station}`}</p>

                  {/* Slots */}
                  <div className="mt-3 grid grid-cols-2 gap-2 ">
                    <Button
                      variant="outline"
                      className="border-none w-full text-gray-500 bg-zinc-800 hover:text-green-400 hover:bg-green-900"
                    >
                      Slot-1
                    </Button>
                    <Button
                      variant="outline"
                      className="border-none w-full text-gray-500 bg-zinc-800 hover:text-green-400 hover:bg-green-900"
                    >
                      Slot-2
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* end charging stations */}


        {/* Charging Station Info */}
        <h2 className="text-xl font-normal mb-4 text-gray-500 mt-4">Charging Station 1 Info</h2>

        {/* Two Column Layout */}
        <div className="w-full max-w-screen-xl mx-auto  justify-center px-4 grid grid-cols-[30%_70%] gap-6">
          
          {/* Left Section (30%) - Static */}
          <div className="h-[350px] flex flex-col gap-4">
            {/* Card 1 */}
            <Card className="bg-zinc-900 p-4 rounded-lg shadow-md flex-1 border-none">
              <h3 className="text-lg font-normal text-gray-200 mb-1">System Health</h3>
              <p className="text-xs text-gray-500 mb-2">Real-time system status and connectivity information</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-800 p-2 rounded-lg shadow-md">
                  <div className="flex flex-col mb-2">
                    <div className="text-sm text-gray-100 mb-2 mt-2 w-full block">13/12/2024</div>
                    <div className="text-sm text-gray-500 w-full block">Maintenance Date</div>
                  </div>
                </div>
                <div className="bg-zinc-800 p-2 rounded-lg shadow-md">
                  <div className="flex flex-col mb-2">
                    <div className="text-sm text-green-400 mb-2 mt-2 w-full block">Running</div>
                    <div className="text-sm text-gray-500 w-full block">Current Health</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 2 */}
            <Card className="bg-zinc-900 p-4 rounded-lg shadow-md flex-1 border-none">
              <h3 className="text-lg font-normal text-gray-200 mb-1">Charging Station Specifications</h3>
              <p className="text-xs text-gray-500 mb-2">Live power usage stats</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-800 p-2 rounded-lg shadow-md">
                  <div className="text-sm text-gray-100 mb-2 mt-2 w-full block">450 kWh</div>
                  <div className="text-sm text-gray-500 w-full block">Total Consumption</div>
                </div>
                <div className="bg-zinc-800 p-2 rounded-lg shadow-md">
                  <div className="text-sm text-yellow-400 mb-2 mt-2 w-full block">75 kWh</div>
                  <div className="text-sm text-gray-500 w-full block">Current Load</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Section (70%) - Dynamic */}
          <div className="h-[350px] bg-zinc-900 p-4 rounded-lg shadow-md Vehicle-Details-Card">

          <div className="grid grid-cols-[60%_30%_10%] gap-2 align-middle justify-center items-center">
            <div className="w-50">
              <h3 className="text-lg font-normal text-gray-200 mb-1">Vehicle Details</h3>
              <p className="text-sm text-gray-500 mb-2">Charging Station - Slot 1</p>
            </div>
            <div className="gap-3"> 
                <Button variant="outline" className=" mx-3 border-none bg-green-800 text-green-400 ">
                  Slot-1
                </Button>
                <Button variant="outline" className="border-none text-gray-500 bg-zinc-800 hover:text-green-400 hover:bg-green-900">
                  Slot-2
                </Button>
            </div>
            <div> 
            <img src={powerBtnIcon} alt="Power Button" />
            </div>

          </div>
            <div className="grid grid-cols-[45%_10%_20%_20%] gap-2 mt-4 mb-3">
              {/* col-1 */}
              <div className="flex items-center justify-center">
                {/* vehile image here */}
                <img src={evanImage} alt="Evan's Van" />
              </div>

              {/* col-2 dottet gra border */}
              <div className= "flex justify-center  ">
                <div className= "border-dotted border-l-2 border-gray-500"></div>
              </div>

              {/* col-3 */}
              <div className=" justify-center p-4 shadow-md">
              {/* circle here */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* outer circle */}
                <div className="absolute inset-0 border-4 border-black rounded-full"></div>
               {/* inner circle */}
                <div className=" rounded-full flex items-center justify-center">
                  <div className="text-center text-gray-900 text-sm leading-tight">
                  {chargingHistory ? (
                    <div className="text-green-400"> {chargingHistory.chargedPercentage}%</div>
                  ) : (
                    <div className="text-gray-500">N/A</div>
                  )}
                    <div className="text-gray-500 pt-2">Charged</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* col-4 */}
              <div className=" justify-center p-2 rounded-lg shadow-md">

                <div className="bg-zinc-950 p-4 rounded-lg shadow-md  flex flex-col mb-2">
                  <div className="text-sm text-gray-100 mb-2 mt-2 w-full block">10:00 AM</div>
                  <div className="text-sm text-gray-500 w-full block">Est End Time</div>

                  <div className="text-sm text-gray-100 mb-2 mt-2 w-full block">12:00 PM</div>
                  <div className="text-sm text-gray-500 w-full block">Est End Time</div>
                </div>
              </div>

            </div>

            {/* 3rd row */}
            <div className="grid  grid-cols-5 content-end gap-2 pb-4 mt-6">
              {chargingHistory ? (
                <>
                  <div className=" ">
                    <p className="text-xs text-gray-500 pb-2">Vehicle ID</p>
                    <p className="text-xs text-gray-300">{chargingHistory.vehicle.vehicleId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 pb-2">{chargingHistory.energyDelivered} kWh</p>
                    <p className="text-xs text-gray-300">Energy Delivered</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 pb-2">{chargingHistory.vehicle.batteryHealth}</p>
                    <p className="text-xs text-gray-300">Battery Health</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 pb-2">{chargingHistory.status}</p>
                    <p className="text-xs text-gray-300">Status</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 pb-2">{calculateTimeConnected()}</p>
                    <p className="text-xs text-gray-300">Connected</p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500">Loading...</p>
              )}
            </div>
          </div>
        </div>

         {/* Charging Station Info end */}

        {/* Additional Info - Static */}
        <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
          <Card className="bg-zinc-900 text-white p-4 border-none">
            <CardTitle>Charger Specifications</CardTitle>
            <p className="text-sm text-gray-500 mt-3">Charger Communication</p>
          </Card>
          <Card className="bg-zinc-900 text-white p-4 border-none">
            <CardTitle>OCPP Status Station 1</CardTitle>
            <p className="text-sm text-gray-500 mt-3">Station-wide OCPP metrics and transaction data</p>
          </Card>
        </div>

      </div>
    </AppLayout>
  );
};

export default Dashboard;
