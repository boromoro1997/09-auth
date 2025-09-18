'use client';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';
import { fetchNoteById } from '@/lib/api/clientApi';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();
  const back = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  //   const formattedDate = note.updatedAt
  //     ? `Updated at: ${note.updatedAt}`
  //     : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
        <p className={css.tag}>{note.tag}</p>
      </div>
      <button className={css.backBtn} onClick={back}>
        Back
      </button>
    </div>
  );
};

export default NoteDetailsClient;
