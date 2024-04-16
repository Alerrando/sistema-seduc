import { LessonInfos } from "@/utils/type";
import { format, isValid } from "date-fns";

type RenderLessonColumnsProps = {
  lesson: LessonInfos;
  index: number;
};

export default function RenderLessonColumns({ lesson, index }: RenderLessonColumnsProps) {
  return (
    <>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{lesson.registerTeacher.name}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{lesson.amountTime}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{lesson.registerSchool.name}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        <span className="whitespace-nowrap">
          {isValid(new Date(lesson.lessonDay)) ? format(new Date(lesson.lessonDay), "dd/MM/yyyy") : ""}
        </span>
      </td>
    </>
  );
}
