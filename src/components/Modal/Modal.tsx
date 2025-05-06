"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ClassValue } from "clsx";

interface Props {
  title?: string;
  body: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: ClassValue;
}

export default function Modal({
  isOpen,
  onClose,
  body,
  title,
  className
}: Props) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={onClose}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto  bg-black/30">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className={
                "w-full max-w-xl rounded-xl bg-white border border-gray-300 p-6  duration-100 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0" +
                className
              }
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-black"
                >
                  {title}
                </DialogTitle>
              )}
              {body}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
