import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Key, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import { RootState } from "../../../../configureStore";
import { SchoolInfos } from "../../../../slice";
import { UserInfos } from "../../../../slice/LoginSlide";
import { editUser, getUsers } from "../../../api";
import Input from "../ModalForm/Input";

type FormEditionUsersProps = {
    infos: UserInfos,
    setModal: (modal: boolean) => void,
    setUsersAll: (userAll: UserInfos[]) => void,
}

const createFormSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório!"),
    email: z.string().nonempty("O campo Email é obrigatório!"),
    rg: z.string().nonempty("O campo Rg é obrigatório!"),
    school: z.string({ invalid_type_error: "Nenhuma escola selecionado" }).nonempty("Selecione uma Escola"),
    permission: z.string().nonempty("Selecione um Campo")
})

type CreateFormData = z.infer<typeof createFormSchema>

export default function FormEditionUsers({ infos, setModal, setUsersAll }: FormEditionUsersProps){
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreateFormData>({
        resolver: zodResolver(createFormSchema)
    });
    const { allInfosSchool } = useSelector((root: RootState) => root.Slice);

    useEffect(() => {
        setValue("name", infos.name);
        setValue("email", infos.email);
        setValue("rg", infos.rg);
        setValue("school", infos.cadastroEscola);

        infos.permission ? setValue("permission", "true") : setValue("permission", "false");
    }, [])

    return(
        <div className="w-screen h-auto flex items-center justify-center bg-modal fixed inset-0">
			<div className="w-auto sm:w-9/12 max-h-[90%] sm:h-auto p-3 bg-white overflow-y-auto">
				<header className="w-full h-auto flex flex-col gap-2 p-2 after:block after:border-b after:border-[#999]">
					<div className="w-full flex flex-row items-center justify-between">
						<h2 className="text-xl md:text-3xl font-bold">Edição Usuário</h2>
						<X size={32} className="cursor-pointer" onClick={() => setModal(false)} />
					</div>
				</header>

                <form className="w-full flex flex-col gap-8 py-2 px-4" onSubmit={handleSubmit(submit)}>
                    <div className="w-full flex flex-col gap-3">
                        <div className="w-full flex flex-col gap-2">
                            <Input htmlFor="name" label="Nome do Usuário" name="name" placeholder="Alerrando Breno de Oliveira Andrade" register={register} type="text" key={"name-user-input"} />
                            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <Input htmlFor="email" label="E-mail*" name="email" placeholder="Digite seu email" type="email" key={"email-login"} register={register} />
                            <span className="text-red-600">{errors.email && errors.email.message}</span>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <Input htmlFor="rg" label="Rg*" name="rg" placeholder="Digite seu Rg" type="text" key={"rg-login"} register={register} />
                            <span className="text-red-600">{errors.senha && errors.senha.message}</span>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label htmlFor="escola" className="font-bold">Escola</label>
                            <select name="escola" id="" className="border border-[#999] rounded-lg p-2 outline-none" { ...register("school") }>
                                <option value="" defaultChecked className="text-[12px] md:text-base outline-none border-none">Selecione uma Escola</option>
                                {allInfosSchool?.map((school: SchoolInfos, index: Key) => (
                                    <option key={`escola-${school.name}`} value={school.id} className="text-[12px] md:text-base outline-none border-none">{school.name}</option>
                                ))}
                            </select>

                            {errors.school && <span className='text-red-600'>{errors.school.message}</span>}
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <label htmlFor="permissão" className="font-bold">Permissão</label>

                            <ul class="flex flex-row w-auto gap-6">
                                <li>
                                    <input type="radio" id="hosting-small" name="hosting" value={"true"} class="hidden peer" { ...register("permission") } />
                                    <label for="hosting-small" class="inline-flex items-center justify-between w-full p-2 px-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                        <div class="block">
                                            <div class="w-full text-lg font-semibold">Permitido</div>
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="hosting-big" name="hosting" value={"false"} class="hidden peer" { ...register("permission") } />
                                    <label for="hosting-big" class="inline-flex items-center justify-between w-full p-2 px-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div class="block">
                                            <div class="w-full text-lg font-semibold">Não Permitido</div>
                                        </div>
                                    </label>
                                </li>
                            </ul>

                            {errors.permission && <span className='text-red-600'>{errors.permission.message}</span>}
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-end">
                        <button type="submit" className="w-20 flex flex-row items-center justify-center gap-2 py-2 px-4 border border-[#22C55E] text-[#22C55E] cursor-pointer rounded-lg group hover:bg-[#22C55E] transition-colors">
                            <span className="text-lg group-hover:text-white">Ok</span>
                        </button>
                    </div>
                </form>
		    </div>
        </div>
  );

  async function submit(e: CreateFormData){
    const { id, level, password } = infos;
    const { ...rest } = e;

    const formData: UserInfos = {
        id,
        level,
        password,
        ...rest,
        permission: e.permission === "true",
        cadastroEscola: e.school,
    };
    console.log(formData);

    const message = await editUser(formData, infos.id);
    setUsersAll(await getUsers());
    setModal(false);
  }
}