export declare const assignprogramsToTeacher: (data: any) => Promise<any>;
export declare const getStudentsForTeacher: (teacher_id: any) => Promise<any>;
export declare const getTeacherProgram: (teacher_id: any) => Promise<any>;
export declare const findTeacher: (teacherId: any) => Promise<any>;
export declare const findUnApprovedTeacher: ({
    page,
    limit,
    search,
}: {
    page?: number;
    limit?: number;
    search?: string;
}) => Promise<
    | false
    | {
          unApprovedTeachers: any;
          totalTeachers: any;
          currentPage: number;
          totalPages: number;
      }
>;
export declare const updateTeacherPrograms: (
    teacher_Id: string,
    program_ids: string[]
) => Promise<any>;
export declare const findTeacherByIdAndUpdate: (
    id: string,
    data: any
) => Promise<any>;
