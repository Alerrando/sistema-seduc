"use client";
import { format, isValid } from "date-fns";
import { Key, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../configureStore";
import { SchoolDTOInfos, TeacherDTOInfos } from "../../../../slice";
import RootLayout from "../../layout";
import Image from "next/image";
import { ptBR } from "date-fns/locale";
import { DefaultUserInfos, UserInfos } from "../../../../slice/LoginSlide";
import { getUserByIdSchool, getUserByMandatoryBulletin } from "../../../api";

export default function ImprimirBoletimSubstituicao() {
  const { filterInfosSchool, allFilterInfosSchool, filterStartEndDate } = useSelector((root: RootState) => root.SliceFilter);
  const { allInfosSchool } = useSelector((root: RootState) => root.Slice);
  const [usersMandatoryBulletin, setUsersMandatoryBulletin] = useState<UserInfos[] | null>(null);
  const [schoolBulletinUser, setSchoolBulletinUser] = useState<UserInfos>(DefaultUserInfos);
  const [dateNow, setDateNow] = useState<Date>(new Date());

  useEffect(() => {
    (async () => {
      setUsersMandatoryBulletin(await getUserByMandatoryBulletin());
      setSchoolBulletinUser(await getUserByIdSchool(filterInfosSchool.id));
    })();
  }, []);

  console.log(usersMandatoryBulletin, schoolBulletinUser, filterInfosSchool);

  return (
    <RootLayout showHeaderAside={false}>
      <main className="w-full h-screen">
        <section className="w-full-h-auto flex flex-col items-center justify-center gap-8 px-6 py-8 md:px-12 md:py-8">
          <header className="w-full md:w-3/4 h-auto flex flex-row items-center justify-between gap-8 md:gap-4 md:mr-auto">
            <div className="w-24 h-28">
              <Image
                src="/logo-prefeitura-rancharia.png"
                alt="Logo da prefeitura de Rancharia"
                className=""
                fill
              />
            </div>

            <div className="w-full md:w-auto flex flex-col gap-2 items-center">
              <h1 className="text-2xl md:text-3xl font-bold">
                SECRETARIA MUNICIPAL DE EDUCAÇÃO
              </h1>

              <h2 className="text-xl md:text-2xl font-bold">
                {filterInfosSchool.name}
              </h2>
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
              } 2023 - ${isValid(new Date(filterStartEndDate.dataInicial))
                ? format(new Date(filterStartEndDate.dataInicial), "dd/MM/yyyy", {
                    locale: ptBR,
                  })
                : ""} à ${isValid(new Date(filterStartEndDate.dataFinal))
                    ? format(new Date(filterStartEndDate.dataFinal), "dd/MM/yyyy", {
                        locale: ptBR,
                      })
                    : ""}`}
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
                {allFilterInfosSchool != undefined &&
                  allFilterInfosSchool.map(
                    (info: SchoolDTOInfos, index: number) => {
                      return (
                        <tr
                          className="border border-neutral-500"
                          key={`${info.name}-${index}`}
                        >
                          <>
                            <td className="max-w-[200px] text-start whitespace-nowrap px-4 py-1 font-medium text-gray-900 border-r border-neutral-500">
                              <span className="whitespace-normal">
                                {info.name}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900 border-r border-neutral-500">
                              {info.office}
                            </td>
                            <td className="items-center h-full px-4 font-medium text-gray-900 border-r border-neutral-500">
                              <div className="grid grid-cols-report-teacher">
                                {info.datesWork.map(
                                  (dateWork: any, index: number) => (
                                    <div
                                      className={`h-auto break-inside-avoid flex flex-row items-center justify-start px-2 gap-1 ${
                                        index !== info.datesWork.length - 1 &&
                                        (index === 0 || index % 4 !== 0)
                                          ? "border-r border-neutral-500"
                                          : ""
                                      }`}
                                    >
                                      <span>
                                        {isValid(new Date(dateWork[0]))
                                          ? format(
                                              new Date(dateWork[0]),
                                              "dd/MM"
                                            )
                                          : ""}
                                      </span>
                                      <span>-</span>
                                      <span>{dateWork[1]}h</span>
                                    </div>
                                  )
                                )}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900 border-r border-neutral-500">
                              {`${info.office.split("-")[0].trim()} = ${
                                info.amountTime
                              }h`}
                            </td>
                            <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900 border-r border-neutral-500">
                              <textarea
                                className="w-full px-4 outline-none rounded-md resize-none"
                                rows={3}
                                name="observação"
                                defaultValue="-----------------------"
                              />
                            </td>
                          </>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>

          <div className="w-full h-auto flex items-center justify-end">
            <h2 className="text-[22px]">{`Rancharia, ${format(dateNow, "dd", {
              locale: ptBR,
            })} de ${format(dateNow, "LLLL", { locale: ptBR })} de ${format(
              dateNow,
              "yyyy",
              { locale: ptBR }
            )}`}</h2>
          </div>

          <div className="w-full flex flex-col gap-8 items-start justify-start">
                <span className="text-xl">Elaborado por: </span>
                
                <section className="w-5/6 h-auto flex items-center justify-between ml-auto">
                    <div className="w-1/4 h-auto flex flex-col items-center justify-center before:block before:w-full before:border-t-[1px] before:border-t-black">
                        <span className="text-sm">{schoolBulletinUser.name}</span>
                        <span className="text-sm">{`RG: ${schoolBulletinUser.rg}`}</span>
                        <span className="text-sm">{`${schoolBulletinUser.office}`}</span>
                    </div>

                    {usersMandatoryBulletin?.map((user: UserInfos) => (
                      <>
                        {user.id !== schoolBulletinUser.id ? (
                          <div className="w-1/4 h-auto flex flex-col items-center justify-center before:block before:w-full before:border-t-[1px] before:border-t-black">
                            <span className="text-sm">{user.name}</span>
                            <span className="text-sm">{`RG: ${user.rg}`}</span>
                            <span className="text-sm">{`${user.office}`}</span>
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
