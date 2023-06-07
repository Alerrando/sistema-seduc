'use client';
import Table from '@/Components/Table';
import { readAllSchool } from '@/api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshInfosSchool } from '../../../slice';
import { RootState } from '../../../system';

export default function CadastroEscola(){
    const allInfosSchool = useSelector(({ Slice }: RootState) => Slice.allInfosSchool);
    const [search, setSearch] = useState("");
    const thead = ["Id", "Nome da Escola", "Diretor", "Ações"];
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosSchool(await readAllSchool()));
        })()
    }, [])


    return(
        <main className='w-5/6 ml-auto px-6'>
            <h1 className="text-[42px]">Cadastro de Escolas</h1>

            <Table tableHead={thead} infosAll={allInfosSchool} search={search} key={"Table-Escola"} />
        </main>
    )
}