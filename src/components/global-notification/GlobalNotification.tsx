import { useEffect } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

interface GlobalNotificationProps {
  message: string;
  description?: string;
  type?: "success" | "warning" | "error";
  show: boolean;
  onClose: (alertTypes: boolean) => void;
  timeToClose?: number;
}

export default function GlobalNotification({
  message,
  description,
  type = "success",
  show,
  onClose,
  timeToClose = 7000,
}: GlobalNotificationProps) {
  useEffect(() => {
    show &&
      setTimeout(() => {
        onClose(false);
      }, timeToClose);
  });

  return (
    <div
      className={`${show ? "flex" : "hidden"} gap-2 ${
        type === "success"
          ? "bg-[#4BB543]"
          : type === "warning"
          ? "bg-[#FFCC00]"
          : "bg-[#CC3300]"
      } w-[85%] min-[420px]:w-[35%] text-gray-100 rounded-md px-4 py-3 absolute top-[5%] left-[50%] -translate-x-2/4`}
    >
      {type === "success" ? (
        <CheckCircleIcon className="self-start mt-1" width={20} />
      ) : type === "warning" ? (
        <ExclamationTriangleIcon className="self-start mt-1" width={20} />
      ) : (
        <ExclamationCircleIcon className="self-start mt-1" width={20} />
      )}
      <div className="flex flex-col">
        <b>{message}</b>
        <span>{description}</span>
      </div>
      <XMarkIcon
        className="absolute right-4 mt-1 ml-5 hover:opacity-60 transition-all cursor-pointer"
        width={18}
        onClick={() => onClose(false)}
      />
    </div>
  );
}
