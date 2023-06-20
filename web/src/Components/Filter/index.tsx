import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../system";

export default function Filter(){
    const { allInfosTeacher } = useSelector((root: RootState) => root.Slice);

    return(
        <div className="w-screen h-full fixed flex items-center justify-end bg-modal top-0 left-0">
            <div className="w-[35%] h-full bg-white p-3">
                <header className="w-full h-auto grid grid-cols-2 items-center justify-between gap-1 after:block after:w-full after:h-1 after:border-b after:border-[#E0E0E0] after:col-span-2">
                    <h2 className="text-3xl font-bold">Filtro</h2>

                    <X size={36} className="cursor-pointer ml-auto" />
                </header>


            </div>
        </div>
    )
}