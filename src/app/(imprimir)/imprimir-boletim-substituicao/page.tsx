"use client";
import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../configureStore";
import { SchoolDTOInfos, TeachersOffice } from "../../../../slice";
import { DefaultUserInfos, UserInfos } from "../../../../slice/LoginSlice";
import { getUserByIdSchool, getUserByMandatoryBulletin } from "../../../api";
import RootLayout from "../../layout";
import { StateContextFilter } from "../../../../slice/FilterSlice";

export default function ImprimirBoletimSubstituicao() {
  const { filterInfosSchool, allFilterInfosSchool, filterStartEndDate } = useContext(StateContextFilter);
  const { allInfosTeachersOffice } = useSelector((root: RootState) => root.Slice);
  const [usersMandatoryBulletin, setUsersMandatoryBulletin] = useState<UserInfos[]>([]);
  const [schoolBulletinUser, setSchoolBulletinUser] = useState<UserInfos>(DefaultUserInfos);
  const [dateNow, setDateNow] = useState<Date>(new Date());

  useEffect(() => {
    (async () => {
      setUsersMandatoryBulletin(await getUserByMandatoryBulletin());

      try {
        const auxSchoolBulletinUser = await getUserByIdSchool(filterInfosSchool.id);

        if ("AxiosError" in auxSchoolBulletinUser) {
          setSchoolBulletinUser(DefaultUserInfos);
        } else {
          setSchoolBulletinUser(auxSchoolBulletinUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    })();

    setDateNow(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RootLayout showHeaderAside={false}>
      <main className="w-full h-screen">
        <section className="w-full-h-auto flex flex-col items-center justify-center gap-8 px-6 py-8 md:px-12 md:py-8">
          <header className="w-full md:w-3/4 h-auto flex flex-row items-center justify-between gap-8 md:gap-4 md:mr-auto">
            <div className="w-24 h-28">
              <Image src="/logo-prefeitura-rancharia.png" alt="Logo da prefeitura de Rancharia" className="" fill />
            </div>

            <div className="w-full md:w-auto flex flex-col gap-2 items-center">
              <h1 className="text-2xl md:text-3xl font-bold">SECRETARIA MUNICIPAL DE EDUCAÇÃO</h1>

              <h2 className="text-xl md:text-2xl font-bold">{filterInfosSchool.name}</h2>
            </div>
          </header>

          <div className="w-full h-auto flex items-center justify-center">
            <span className="text-[22px] font-bold" style={{ wordSpacing: "8px" }}>
              {`Boletim de Substituição - Professores Eventuais - Mês ${
                isValid(new Date(filterStartEndDate.dataInicial))
                  ? format(new Date(filterStartEndDate.dataInicial), "LLLL", {
                      locale: ptBR,
                    })
                  : ""
              } / ${
                isValid(new Date(filterStartEndDate.dataFinal))
                  ? format(new Date(filterStartEndDate.dataFinal), "LLLL", {
                      locale: ptBR,
                    })
                  : ""
              } 2023 - ${
                isValid(new Date(filterStartEndDate.dataInicial))
                  ? format(new Date(filterStartEndDate.dataInicial), "dd/MM/yyyy", {
                      locale: ptBR,
                    })
                  : ""
              } à ${
                isValid(new Date(filterStartEndDate.dataFinal))
                  ? format(new Date(filterStartEndDate.dataFinal), "dd/MM/yyyy", {
                      locale: ptBR,
                    })
                  : ""
              }`}
            </span>
          </div>

          <div className="w-full overflow-x-auto border border-gray-200">
            <table className="min-w-full border text-center text-sm font-light border-neutral-500">
              <thead className="border-b font-medium border-neutral-500">
                <tr>
                  <th scope="col" className="text-start border-r pl-4 pr-2 py-2 border-neutral-500">
                    NOME
                  </th>
                  <th scope="col" className="text-start border-r pl-4 pr-2 py-2 border-neutral-500">
                    FORMAÇÃO
                  </th>
                  <th scope="col" className="text-start border-r pl-4 pr-2 py-2 border-neutral-500">
                    DIAS TRABALHADOS
                  </th>
                  <th scope="col" className="text-start border-r pl-4 pr-2 py-2 border-neutral-500">
                    TOTAL A PAGAR
                  </th>
                  <th scope="col" className="text-start border-r pl-4 pr-2 py-2 border-neutral-500">
                    OBSERVAÇÕES
                  </th>
                </tr>
              </thead>

              <tbody className="">
                {allFilterInfosSchool !== undefined &&
                  allFilterInfosSchool.map((info: SchoolDTOInfos, index: number) => (
                    <tr
                      className="border border-neutral-500 divide-x-[1px] divide-neutral-500"
                      key={`${info.name}-${index}`}
                    >
                      <>
                        <td className="max-w-[200px] text-start whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                          <span className="whitespace-normal">{info.name}</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">{info.id}</td>
                        <td className="items-center h-full px-4 font-medium text-gray-900 border !border-r-[1px] border-neutral-500">
                          <div className="flex flex-row divide-x-2 divide-zinc-400">
                            {info.datesWork.map((dateWork: unknown, index: number) => (
                              <div
                                key={`date-${index}`}
                                className={`h-auto break-inside-avoid flex flex-row items-center justify-start px-2 gap-1`}
                              >
                                <span>
                                  {isValid(new Date(dateWork[0])) ? format(new Date(dateWork[0]), "dd/MM") : ""}
                                </span>
                                <span>{dateWork[1]}h</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="whitespace-nowrap flex flex-row px-4 py-1 font-medium text-gray-900 !border-l-0">
                          <span className="flex divide-x-2 divide-zinc-400">
                            {allInfosTeachersOffice
                              .filter((teachersOffice: TeachersOffice) => teachersOffice.registerTeacher.id === info.id)
                              .map((teachersOffice: TeachersOffice, index: number) => (
                                <span className="flex flex-row gap-2 items-center px-2" key={index}>
                                  {teachersOffice.registerOffice.name}
                                </span>
                              ))}
                          </span>

                          <span>= {info.amountTime}h</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                          <textarea
                            className="w-full px-4 outline-none rounded-md resize-none border border-neutral-50"
                            rows={3}
                            name="observação"
                            defaultValue="-----------------------"
                          />
                        </td>
                      </>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="w-full h-auto flex items-center justify-end">
            <h2 className="text-[22px]">{`Rancharia, ${format(dateNow, "dd", {
              locale: ptBR,
            })} de ${format(dateNow, "LLLL", { locale: ptBR })} de ${format(dateNow, "yyyy", { locale: ptBR })}`}</h2>
          </div>

          <div className="w-full flex flex-col gap-8 items-start justify-start">
            <span className="text-xl">Elaborado por: </span>

            <section className="w-5/6 h-auto flex items-center justify-between ml-auto">
              {schoolBulletinUser !== undefined &&
                schoolBulletinUser.name !== undefined &&
                schoolBulletinUser.rg !== undefined &&
                schoolBulletinUser.office.name !== undefined && (
                  <div className="w-1/4 h-auto flex flex-col items-center justify-center before:block before:w-full before:border-t-[1px] before:border-t-black">
                    <span className="text-sm">{schoolBulletinUser?.name}</span>
                    <span className="text-sm">{`RG: ${schoolBulletinUser?.rg}`}</span>
                    <span className="text-sm">{`${schoolBulletinUser?.office?.name}`}</span>
                  </div>
                )}

              {usersMandatoryBulletin?.map((user: UserInfos) => (
                <>
                  {user.id !== schoolBulletinUser.id ? (
                    <div className="w-1/4 h-auto flex flex-col items-center justify-center before:block before:w-full before:border-t-[1px] before:border-t-black">
                      <span className="text-sm">{user.name}</span>
                      <span className="text-sm">{`RG: ${user.rg}`}</span>
                      <span className="text-sm">{`${user.office?.name === undefined ? "" : user.office?.name}`}</span>
                    </div>
                  ) : null}
                </>
              ))}
            </section>
          </div>
        </section>
      </main>
    </RootLayout>
  );
}
