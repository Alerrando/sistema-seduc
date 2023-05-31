import React from 'react';
import { HorasInfos } from '../../../slice';

type TableProps = {
    tableHead: string[],
    edit: (info: HorasInfos) => void,
    delete: (info: HorasInfos) => void,
    infosAll: HorasInfos[],
    search: string,
}

export default function Table(props: TableProps){
    const { tableHead, edit, delete, infosAll, search } = props;
    return(

    )
}