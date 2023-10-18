
import { BookHistoryParams } from '@/utils/props/carProps'
import { fetchCarBooks } from '@/utils/actions/carbook.actions'

export default async function  BookLists({searchParams}:BookHistoryParams) {
  const result = await fetchCarBooks(searchParams.bookStatus, searchParams.page, searchParams.pageSize);

  return (
    <>
      <div className='pt-36'>Javascript master {searchParams.bookStatus}</div>

      <div className="bg-gray-100 md:w-full w-full">
      {result.carbooks.length === 0 ? (
      <p className="no-result">No book cars found</p>
      ) : (
        <>
          {result.carbooks.map((book: any) => (
            < BookCard book={book}/>
          ))}
        </>
      )}
      </div>
    </>
  );

};

