"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { AppDispatch } from "../../../../configureStore";
import { DefaultUserInfos, UserInfos, changeLoginLogout } from "../../../../slice/LoginSlide";
import Input from "../../../Components/Modal/ModalForm/Input";
import { createToken, createUser } from "../../../api";

type RegisterProps = {
    pages: boolean,
    setPages: (pages: boolean) => void,
}

const createFormSchema = z.object({
    name: z.string().nonempty("O campo Nome é obrigatório!"),
    email: z.string().nonempty("O campo Email é obrigatório!"),
    rg: z.string().nonempty("O campo Rg é obrigatório!"),
    password: z.string().nonempty("O campo Senha é obrigatório!")
})

type CreateFormData = z.infer<typeof createFormSchema>

export default function Register({ pages, setPages }: RegisterProps){
    const [token, setToken] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: zodResolver(createFormSchema)
    });
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    return(
        <>
            <div className={`w-1/2 h-full flex flex-col gap-8 bg-white pl-6`}>
                <div className="w-full flex flex-col items-center gap-6 py-3">
                    <header className="w-full flex flex-row items-start gap-2">
                        <BookOpen className={`w-7 h-7`} />
                        <h2>Seduc</h2>
                    </header>

                    <div className="w-full text-center after:h-[2px] after:flex after:mx-auto after:w-4/6 after:bg-[#efefef]">
                        <h1 className="text-2xl md:text-3xl">Crie sua conta</h1>
                    </div>

                    <form className="w-4/5 grid gap-4" onSubmit={handleSubmit(submit)}>
                        <div className="w-full flex flex-col gap-1">
                            <Input htmlFor="name" label="Nome*" name="name" placeholder="Digite seu Nome" type="text" key={"name-login"} register={register} />
                            <span className="text-red-600">{errors.name && errors.name.message}</span>
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <Input htmlFor="email" label="E-mail*" name="email" placeholder="Digite seu email" type="email" key={"email-login"} register={register} />
                            <span className="text-red-600">{errors.email && errors.email.message}</span>
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <Input htmlFor="rg" label="Rg*" name="rg" placeholder="Digite seu Rg" type="text" key={"rg-login"} register={register} />
                            <span className="text-red-600">{errors.senha && errors.senha.message}</span>
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <Input htmlFor="password" label="Senha*" name="password" placeholder="Digite seu senha" type="password" key={"password-login"} register={register} />
                            <span className="text-red-600">{errors.password && errors.password.message}</span>
                        </div>
                    
                        <div className="w-full flex items-center">
                            <div className="flex flex-row items-center gap-2">
                                <input type="checkbox" name="remember" id="remember" className="w-[14px] h-[14px]" />
                                <span className="text-sm">Concordo com todos os Termos, Política de Privacidade e Taxas.</span>
                            </div>
                        </div>

                        <div className="w-full flex">
                            <button className="w-full flex items-center justify-center mx-auto rounded-lg bg-zinc-600 text-white py-[6px] hover:bg-zinc-800 transition-colors">
                                Registrar
                            </button>
                        </div>

                        <span>Já tem conta? Faça <span className="text-blue-600 cursor-pointer" onClick={() => setPages(!pages)}>Login</span></span>
                    </form>
                </div>
            </div>
            
            <div className="w-1/2 h-full relative">
                <Image src="/register-background-img.png" alt="img-login-main" fill className="object-cover" />
            </div>

            <ToastContainer />
        </>
    );

    async function submit(e){
        const aux:UserInfos = {
            name: e.name,
            email: e.email,
            password: e.password,
            rg: e.rg,
            cadastroEscola: "",
            level: 2,
            permission: 0,
        }

        const token = await createToken(DefaultUserInfos);
        setToken(token);

        const message = await createUser(aux, token);

        messageToast(message);
    }

    function messageToast(message: object | undefined){
        if(message !== undefined){
            toast.success("Registro feito com sucesso!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            toast.error("Não foi possivel registrar o usuário!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
}