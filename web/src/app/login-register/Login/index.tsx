import { BookOpen } from "lucide-react";
import Input from "../../../Components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

type LoginProps = {
    pages: boolean,
    setPages: (pages: boolean) => void,
}

const createFormSchema = z.object({
    email: z.string().nonempty("O campo Email é obrigatório!"),
    senha: z.string().nonempty("O campo Senha é obrigatório!")
})

type CreateFormData = z.infer<typeof createFormSchema>

export default function Login({ pages, setPages }: LoginProps){
    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: zodResolver(createFormSchema)
    });

    return(
        <>
            <div className={`w-1/2 h-full flex flex-col gap-16 bg-white px-6`}>
                <div className="w-full flex flex-col items-center gap-6 py-3">
                    <header className="w-full flex flex-row items-start gap-2">
                        <BookOpen className={`w-7 h-7`} />
                        <h2>Seduc</h2>
                    </header>

                    <div className="w-full text-center after:h-[2px] after:flex after:mx-auto after:w-4/6 after:bg-[#efefef]">
                        <h1 className="text-2xl md:text-3xl">Bem Vindo de Volta</h1>
                    </div>

                    <form className="w-4/5 grid gap-4" onSubmit={handleSubmit(submit)}>
                        <div className="w-full flex flex-col gap-1">
                            <Input htmlFor="name" label="Nome*" name="name" placeholder="Digite seu Nome" type="text" key={"name-login"} register={register} />
                            <span className="text-red-600">{errors.name && errors.name.message}</span>
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <Input htmlFor="senha" label="Senha*" name="senha" placeholder="Digite seu senha" type="password" key={"password-login"} register={register} />
                            <span className="text-red-600">{errors.senha && errors.senha.message}</span>
                        </div>
                    
                        <div className="w-full flex items-center justify-between">
                            <div className="flex flex-row items-center gap-2">
                                <input type="checkbox" name="remember" id="remember" className="w-[14px] h-[14px]" />
                                <span>Lembre de mim!</span>
                            </div>

                            <div className="flex items-center cursor-pointer">
                                <span>Esqueceu sua senha?</span>
                            </div>
                        </div>

                        <div className="w-full flex">
                            <button className="w-full flex items-center justify-center mx-auto rounded-lg bg-zinc-600 text-white py-[6px] hover:bg-zinc-800 transition-colors">
                                Logar
                            </button>
                        </div>

                        <span>Não tem conta? Faça <span className="text-blue-600 cursor-pointer" onClick={() => setPages(!pages)}>Cadastro</span></span>
                    </form>
                </div>
            </div>

            <div className="w-1/2 h-full relative">
                <Image src="/login-img-background.png" alt="img-login-main" fill className="object-cover" />
            </div>
        </>
    );

    function submit(e){
        console.log(e);
    }
}