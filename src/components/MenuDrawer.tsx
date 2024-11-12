"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { navLinkData } from "@/constants/navLinkData";
import logo from "@/assets/images/logo.png";
import menu from "@/assets/images/menu.png";
import cross from "@/assets/images/cross.png";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MenuDrawer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div
        onTouchStart={handleClick}
        className="size-8 flex md:hidden justify-center items-center"
      >
        <Image
          src={menu}
          alt="Menu"
          className="size-full object-cover object-center"
        />
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 ${
          isOpen ? "left-0" : "-left-full"
        } bottom-0 z-[500] w-full max-w-[22.5rem] h-full flex flex-col justify-start items-start gap-0 bg-[#032541] divide-y-1 divide-gray-300 transition-left`}
      >
        {/* Header */}
        <div className="w-full flex justify-between items-center p-4">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="Movie Database"
              height={36}
              width={112}
              className="aspect-[112/36] w-[6.125rem] h-8"
            />
          </Link>

          <div
            onTouchStart={() => handleClick()}
            className="size-8 flex md:hidden justify-center items-center"
          >
            <Image
              src={cross}
              alt="Close menu"
              className="size-full object-cover object-center"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col justify-start items-start gap-0 text-white">
          {navLinkData.map((item, i: number) => (
            <Accordion type="multiple" className="w-full" key={i}>
              <AccordionItem value="movies" className="w-full">
                <AccordionTrigger className="w-full px-4">
                  {item.title}
                </AccordionTrigger>

                <AccordionContent className="pb-0">
                  <ul className="w-full grid gap-0">
                    {item.links.map((link, ind: number) => (
                      <li className="w-full px-4 py-4" key={ind}>
                        <Link
                          href={link.link_path}
                          className="w-full whitespace-nowrap"
                        >
                          {link.link_text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>

      <div
        onTouchStart={() => setIsOpen(false)}
        className={`fixed inset-0 z-[499] ${
          isOpen ? "block" : "hidden"
        } bg-black/80`}
      ></div>
    </>
    // <Drawer>
    //   <DrawerTrigger>
    //     <div className="size-8 flex md:hidden justify-center items-center">
    //       <Image
    //         src={menu}
    //         alt="Menu"
    //         className="size-full object-cover object-center"
    //       />
    //     </div>
    //   </DrawerTrigger>
    //   <DrawerContent>
    //     <DrawerHeader>
    //       <DrawerTitle>Are you absolutely sure?</DrawerTitle>
    //       <DrawerDescription>This action cannot be undone.</DrawerDescription>
    //     </DrawerHeader>
    //     <DrawerFooter>
    //       <Button>Submit</Button>
    //       <DrawerClose>
    //         <Button variant="outline">Cancel</Button>
    //       </DrawerClose>
    //     </DrawerFooter>
    //   </DrawerContent>
    // </Drawer>
  );
};

export default MenuDrawer;
