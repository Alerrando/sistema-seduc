"use client";
import { Tab } from "@headlessui/react";
import { BookIcon, CalendarClock, Users } from "lucide-react";
import Image from "next/image";
import React, { Fragment } from "react";

export default function Admin(){
    return(
        <>
            <aside className="w-[4%] h-screen absolute top-0 left-0 shadow-2xl">
                <div className="h-full flex flex-col items-center">
                    <div className="w-full h-4/6 flex flex-col gap-8">
                        <div className="h-10 w-full flex-col items-center justify-center border-b">
                            <div className="h-10 w-4/5 flex flex-row items-center justify-start pl-1">
                                <BookIcon size={26} className="text-principal cursor-pointer" />
                            </div>
                        </div>
                        <Tab.Group>
                            <Tab.List className="grid gap-8 items-center">
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <>
                                            <div className="h-10 flex items-center justify-center group">
                                                <button className="w-full h-full flex flex-row items-center justify-start pl-1 gap-[10px] group-hover:bg-principal group-hover:text-white transition-all">
                                                    <CalendarClock size={26} />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                    <>
                                        <div className="h-10 flex items-center justify-center group">
                                            <button className="w-full h-full flex flex-row items-center justify-start pl-1 gap-[10px] group-hover:bg-principal group-hover:text-white transition-all whitespace-nowrap">
                                                <Users size={26} />
                                            </button>
                                        </div>
                                    </>
                                    )}
                                </Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <span></span>

                                </Tab.Panel>
                                <Tab.Panel></Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </aside>
        </>
    )
}