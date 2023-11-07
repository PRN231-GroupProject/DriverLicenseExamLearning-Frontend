"use client";
import adminAxios from "@/api/AxiosAdmin";
import React, { useEffect, useState } from "react";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import img from "../../../public/booking.jpg";
import Image from "next/image";
import { Box, Button, Modal, Typography } from "@mui/material";

type bookingList = {
  bookingId: number;
  car: [
    {
      carId: number;
      carName: string;
      status: string;
      image: string;
      carType: string;
    }
  ];
  member: [
    {
      username: string;
      roleId: number;
      name: string;
      phoneNumber: string;
      email: string;
      address: string;
      status: string;
    }
  ];
  mentor: [
    {
      username: string;
      roleId: number;
      name: string;
      phoneNumber: string;
      email: string;
      address: string;
      status: string;
    }
  ];
  bookingPackage: [
    {
      packageId: number;
      packageTypeId: number;
      packageName: string;
      price: number;
      numberOfKmOrDays: number;
      description: string;
      licenseType: [
        {
          licenseName: string;
        }
      ];
      packageTypes: [
        {
          packageTypeName: string;
        }
      ];
    }
  ];
};
export default function BookingCard(props) {
  console.log(props.bookingPackage);
  const [mentorId, setMentorId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await localStorage.getItem("userData");
        const jsondata = JSON.parse(data);
        const userId = jsondata.userId;
        setMentorId(userId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const id = props.bookingId;
  const status = props.status;
  const dataMe = props;
  const data = dataMe.bookingPackage;
  console.log(dataMe);
  return (
    <div>
      {data && data != null ? (
        <>
          <div>
            {data?.map((r, index) => (
              <div>
                <Button onClick={handleOpen}>
                  <div className="flex flex-col shadow-2xl p-5">
                    <Image src={img} alt="booking img" />
                    <div>{id}</div>
                    <div>{r.packageName}</div>
                    <div>{r.price} VND</div>
                    <div>{r.numberOfKmOrDays}{" "}{r.packageTypeId === 1 ? 'Km' : r.packageTypeId === 2 ? 'Days' : ''}</div>
                    <div>{r.description}</div>
                    <div>{status}</div>
                  </div>
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-400 p-6 bg-gray-200 border-2 shadow-md">
                    <Typography>
                      <h1 className="font-bold text-3xl">Create tracking</h1>
                    </Typography>
                    <Typography>
                      <form></form>
                    </Typography>
                  </Box>
                </Modal>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}
