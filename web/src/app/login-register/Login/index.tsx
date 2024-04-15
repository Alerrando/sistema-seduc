"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { unknown, z } from "zod";
import { AppDispatch, RootState } from "../../../../configureStore";
import { emptyAllFilter } from "../../../../slice/FilterSlice";
import { changeLoginLogout } from "../../../../slice/LoginSlice";
import Input from "../../../Components/Modal/ModalForm/Input";
import { createToken, getUserByEmail } from "../../../api";

const createFormSchema = z.object({
  email: z.string().nonempty("O campo Email é obrigatório!"),
  senha: z.string().nonempty("O campo Senha é obrigatório!"),
});

type CreateFormData = z.infer<typeof createFormSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
  });
  const { usersAll } = useSelector((root: RootState) => root.SliceLogin);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <>
      <div className={"w-1/2 h-full flex flex-col gap-16 bg-white px-6"}>
        <div className="w-full flex flex-col items-center gap-6 py-3">
          <header className="w-full flex flex-row items-start gap-2">
            <BookOpen className={"w-7 h-7"} />
            <h2>Seduc</h2>
          </header>

          <div className="w-full text-center after:h-[2px] after:flex after:mx-auto after:w-4/6 after:bg-[#efefef]">
            <h1 className="text-2xl md:text-3xl">Bem Vindo de Volta</h1>
          </div>

          <form className="w-4/5 grid gap-4" onSubmit={handleSubmit(submit)}>
            <div className="w-full flex flex-col gap-1">
              <Input
                htmlFor="email"
                label="Email*"
                name="email"
                placeholder="Digite seu E-mail"
                type="email"
                key={"email-login"}
                register={register}
              />
              <span className="text-red-600">{errors.email && errors.email.message}</span>
            </div>

            <div className="w-full flex flex-col gap-1">
              <Input
                htmlFor="senha"
                label="Senha*"
                name="senha"
                placeholder="Digite seu senha"
                type="password"
                key={"password-login"}
                register={register}
              />
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
          </form>
        </div>
      </div>

      <div className="w-1/2 h-full relative">
        <Image src="/login-img-background.png" alt="img-login-main" fill className="object-cover" />
      </div>

      <ToastContainer />
    </>
  );

  async function submit(e: CreateFormData) {
    const aux = usersAll.filter((user) => user.email === e.email && user.password === e.senha)[0];

    if (aux.email.length < 0) {
      messageToast("Usuário não existe");
    } else {
      if (aux.inactive === false) {
        messageToast("Usuário logado! Você será redirecionado");

        dispatch(changeLoginLogout(aux));
        dispatch(emptyAllFilter(unknown));
        setTimeout(() => {
          router.replace("/dashboard");
        }, 3000);
      } else {
        toast.error("Seu usuário está inativo, não é possível fazer login!", {
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

  function messageToast(message: string | AxiosError) {
    if (message !== undefined) {
      toast.success("Login feito com sucesso!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Login não existente ou a Senha e Email estão errados", {
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
