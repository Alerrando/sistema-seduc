"use client";
import { Tab } from "@headlessui/react";
import { ArrowLeftToLine, BookIcon, Briefcase, CalendarClock, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import DefinitionPeriods from "./DefinitionPeriods";
import RegisterOffice from "./RegisterOffice";
import UsersList from "./UsersList";

export function AsideAdmin() {
	const router = useRouter();

	return (
		<aside className="w-[4%] h-screen absolute top-0 left-0 shadow-2xl">
			<div className="h-full flex flex-col items-center">
				<div className="w-full h-full flex flex-col gap-8">
					<div className="h-10 w-full flex-col items-center justify-center border-b">
						<div className="h-10 w-4/5 flex flex-row items-center justify-start pl-1">
							<BookIcon size={26} className="text-principal cursor-pointer" />
						</div>
					</div>
					<Tab.Group defaultIndex={0}>
						<Tab.List className="grid gap-8 items-center">
							<Tab as={Fragment}>
								{({ selected }) => (
									<button className="h-10 flex items-center justify-center group">
										<div className={`w-full h-full flex flex-row items-center justify-start pl-1 gap[10px] ${selected ? "bg-principal text-white" : "group-hover:bg-principal group-hover:text-white"} transition-all`}>
											<CalendarClock size={26} />
										</div>
									</button>
								)}
							</Tab>

							<Tab as={Fragment}>
								{({ selected }) => (
									<button className="h-10 flex items-center justify-center group">
										<div className={`w-full h-full flex flex-row items-center justify-start pl-1 gap[10px] ${selected ? "bg-principal text-white" : "group-hover:bg-principal group-hover:text-white"} transition-all`}>
											<Users size={26} />
										</div>
									</button>
								)}
							</Tab>

							<Tab as={Fragment}>
								{({ selected }) => (
									<button className="h-10 flex items-center justify-center group">
										<div className={`w-full h-full flex flex-row items-center justify-start pl-1 gap[10px] ${selected ? "bg-principal text-white" : "group-hover:bg-principal group-hover:text-white"} transition-all`}>
											<Briefcase size={26} />
										</div>
									</button>
								)}
							</Tab>
						</Tab.List>

						<Tab.Panels className="h-screen w-[calc(100vw_-_100%)] top-0 left-full absolute">
							<Tab.Panel className="w-full h-full flex flex-col" id="definition-dates">
								<DefinitionPeriods />
							</Tab.Panel>

							<Tab.Panel className="w-full h-full flex flex-col" id="list-users">
								<UsersList />
							</Tab.Panel>

							<Tab.Panel className="w-full h-full flex flex-col" id="list-users">
								<RegisterOffice />
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>

					<div className="h-10 w-full flex-col items-center justify-center border-b mt-auto">
						<div className="h-10 w-4/5 flex flex-row items-center justify-start pl-1">
							<ArrowLeftToLine size={26} className="text-principal cursor-pointer" onClick={() => router.replace("/dashboard")} />
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}
