import { Skeleton } from '@mui/material';
import { getInterviews } from '../../firebase/providers';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { DocumentData } from 'firebase/firestore/lite';
import { useInterviewColumns } from './helpers/useInterviewColumns';
import CustomDataGrid from '../../helpers/CustomDataGrid';
import CustomDataGridSkeleton from '../../helpers/CustomDataGridSkeleton';
import { useResetStudentAndInterviewState } from '../../hooks/useResetStudentAndInterviewState';
import { useAppSelector } from '../../store/useAppDispatch';

export const ListInterviews = () => {
  const { isModalOpen } = useAppSelector(state => state.modalState);
  const [interviews, setInterviews] = useState<DocumentData[]>([]);
  const { data, isLoading, isFetching } = useQuery(["interviews"], () =>
    getInterviews()
  );
  const resetStudentAndInterviewState = useResetStudentAndInterviewState();
  const columns = useInterviewColumns();

  useEffect(() => {
    if(!isModalOpen) resetStudentAndInterviewState();
    if (data) setInterviews(data);
  }, [isFetching]);

  return (
    <>
      {!isLoading ? (
        <CustomDataGrid columns={columns} data={interviews} idType="interview" />
      ) : (
        <CustomDataGridSkeleton />
      )}
    </>
  )
}
