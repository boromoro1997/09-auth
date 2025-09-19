'use client';
import { useState } from 'react';
import css from '@/app/(private routes)/notes/filter/[...slug]/NotesPage.module.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Toaster } from 'react-hot-toast';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import { useDebouncedCallback } from 'use-debounce';
import { Tag } from '@/lib/constants';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api/clientApi';
type NotesClientProps = {
  tag?: Tag;
};
function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['notes', { search: searchQuery, page: currentPage, tag }],
    queryFn: () => fetchNotes(currentPage, searchQuery, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const totalPages = data?.totalPages || 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          searchQuery={searchQuery}
          onSearch={debouncedSearch} /// SUDA DEBAUNCE
        />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <Link className={css.button} href={'/notes/action/create'}>
          Create note+
        </Link>
      </header>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {isSuccess && !isLoading && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      <Toaster />
    </div>
  );
}

export default NotesClient;
