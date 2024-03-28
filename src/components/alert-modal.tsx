"use client";

import { pusherClient } from "@/lib/pusher";
import { useLayoutEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { alertlogs } from "@prisma/client";

export const SocketIndicator = () => {
  const [incomingMessages, setIncomingMessages] = useState<alertlogs>();

  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    pusherClient.subscribe("audit-logs");
    pusherClient.bind("incoming-message", (alertLog: alertlogs) => {
      setIncomingMessages(alertLog);
      setShow(true);
    });
    return () => {
      pusherClient.unsubscribe("incoming-message");
    };
  }, []);
  return (
    <>
      <AlertDialog open={show}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert Log</AlertDialogTitle>
            <AlertDialogDescription>
              Incident Type : {incomingMessages?.incidentType}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <p>Latitude : {incomingMessages?.lat}</p>
          <p>Longitude : {incomingMessages?.lng}</p>
          <p>
            Incident Time :{" "}
            {new Date(incomingMessages?.incidentTime ?? "").toLocaleString()}
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShow(false)}>
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
