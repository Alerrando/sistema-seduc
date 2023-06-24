"use client";
import React, { useState } from "react"
import Input from "../../Components/Input";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createFormSchema = z.object({
    name: z.string().nonempty("O campo Nome é obrigatório!"),
    email: z.string().nonempty("O campo Email é obrigatório!"),
    rg: z.string().nonempty("O campo Rg é obrigatório!")
})

type CreateFormData = z.infer<typeof createFormSchema>

export default function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: zodResolver(createFormSchema)
    });

    return(
        <main className="w-full h-screen flex flex-col md:flex-row px-4 md:py-9">
            <div className="w-1/2 h-full flex flex-col gap-16 bg-white px-6">
                <header className="w-full flex flex-row items-start gap-2">
                    <BookOpen className={`w-7 h-7`} />
                    <h2>Seduc</h2>
                </header>

                <div className="w-full flex flex-col items-center gap-8 py-3">
                    <div className="w-full text-center after:h-[2px] after:flex after:mx-auto after:w-4/6 after:bg-[#efefef]">
                        <h1 className="text-2xl md:text-3xl">Bem Vindo de Volta</h1>
                    </div>

                    <form className="w-4/5 grid gap-6" onSubmit={handleSubmit(submit)}>
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
                            <span className="text-red-600">{errors.rg && errors.rg.message}</span>
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
                    </form>
                </div>
            </div>
            <div className="w-1/2 h-full relative">
                <Image src="/login-img-background.png" alt="img-login-main" fill className="object-cover" />
            </div>
        </main>
    );

    function submit(e){
        console.log(e);
    }
}