import { format, isValid } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../../configureStore";
import { SchoolDTOInfos, TeacherDTOInfos } from "../../../slice";

type InfosTableReportsData = SchoolDTOInfos | TeacherDTOInfos;

type TableReportsProps = {
    allFilterInfos: SchoolDTOInfos[] | TeacherDTOInfos[],
    tableHead: string[],
}

export default function TableReports(props: TableReportsProps) {
	const { tableHead, allFilterInfos } = props;
	const { reportsTypes } = useSelector((root: RootState) => root.Slice);

	return (
		<div className="max-h-[77%] overflow-x-auto rounded-lg border border-gray-200">
			<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
				<thead className="ltr:text-left rtl:text-right">
					<tr>
						{tableHead.map(head => <th key={head} scope="col" className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">{head}</th>)}
					</tr>
				</thead>


				<tbody className="divide-y divide-gray-200">
					{allFilterInfos != undefined && allFilterInfos.map((info: InfosTableReportsData, index: number) => {

						return (
							<tr key={`${info.name}-${index}`}>
								{reportsTypes == "School" && "amountTime" in info ? (
									<>
										<td className="max-w-[200px] text-start whitespace-nowrap px-4 py-1 font-medium text-gray-900 border-r border-gray-200">
											<span className="whitespace-normal">{info.name}</span>
										</td>

										<td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900 border-r border-gray-200">
											{info.office}
										</td>

										<td className="items-center h-full px-4 font-medium text-gray-900 border-r border-gray-200">
											<div className="grid grid-cols-report-teacher">
												{info.datesWork.map((dateWork: any, index: number) => (
													<div key={`date=${index}`} className={`w-fit h-auto break-inside-avoid flex flex-row items-center justify-start px-2 gap-1 ${index !== info.datesWork.length - 1 && (index === 0 || index % 4 !== 0) ? "border-r border-gray-200" : ""}`}>
														<span>{isValid(new Date(dateWork[0])) ? format(new Date(dateWork[0]), "dd/MM") : ""}</span>
														<span>-</span>
														<span>{dateWork[1]}h</span>
													</div>
												))}
											</div>
										</td>
										<td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900 border-r border-gray-200">
											{`${info.office.split("-")[0].trim()} = ${info.amountTime}h`}
										</td>

										<td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900 border-r border-gray-200">
											<textarea
												className="w-full px-4 outline-none rounded-md resize-none"
												rows={3}
												name="observação"
												defaultValue="-----------------------"
											/>
										</td>
									</>
								) : (
									<>
										<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
										<td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
											{"lessonDay" in info && (
												<span className='whitespace-nowrap'>{isValid(new Date(info.lessonDay)) ? format(new Date(info.lessonDay), "dd/MM/yyyy") : ""}</span>
											)
											}
										</td>
										<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
											{"registerSchool" in info && info.registerSchool.name}
										</td>
										<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{"amountTime" in info && info.amountTime}</td>
									</>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
