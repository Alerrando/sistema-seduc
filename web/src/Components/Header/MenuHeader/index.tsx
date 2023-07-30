"use client";
import { Menu, Transition } from "@headlessui/react";
import { LogOut, ShieldAlert, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../configureStore";
import { changeLoginLogout } from "../../../../slice/LoginSlice";

export default function MenuHeader() {
	const { userInfos } = useSelector((root: RootState) => root.SliceLogin);
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className="">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex w-10 h-10 justify-center rounded-full bg-white bg-opacity-20 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
						<User size={22} />
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
						<div className="px-1 py-1 ">
							<Menu.Item as="div">
								<>
									<>
										<button
											className={"hover:bg-violet-500 hover:text-white text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm"}
											onClick={() => router.replace("/admin")}
										>
											<ShieldAlert className="mr-2 h-5 w-5 text-[#A78BFA] group-hover:text-[##C4B5FD]"/>
                              Administrador
										</button>
									</>
								</>
							</Menu.Item>
						</div>
						<div className="px-1 py-1">
							<Menu.Item as="div">
								{({ active }) => (
									<button
										className={`${
											active ? "bg-violet-500 text-white" : "text-gray-900"
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
										onClick={() => logOut()} 
									>
										<LogOut className="mr-2 h-5 w-5 text-[#A78BFA]"/>
										Sair
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);

	function logOut(){
		if(window.confirm("Quer realmente sair?")){
			dispatch(changeLoginLogout({}));
		}
	}
}
