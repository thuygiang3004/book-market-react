import {useQuery} from "@tanstack/react-query";
import {getListings} from "../Services/HttpServices";
import React, {useState} from "react";
import {loginUserInfo} from "./Login";
import {BookLists} from "../Components/BookLists";

export interface IBook {
    id: number;
    title: string;
    author: string;
    publisher: string;
}

export interface IListing {
    id: string;
    title: string;
    books: IBook[];
    user_id: string;
    price: string;
    status: string;
    images: string;
    created_at: string;
    updated_at: string;
}

export const AllListings = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const listingsQuery = useQuery({
        queryKey: ['listings', currentPage],
        queryFn: () => getListings(currentPage),
    })

    console.log(listingsQuery.data)
    if (listingsQuery.isLoading) return <div>Loading...</div>;
    if (listingsQuery.isError) return <div>{JSON.stringify(listingsQuery.error)}</div>;

    // @ts-ignore
    const data = listingsQuery.data?.data || [];
    // @ts-ignore
    const meta = listingsQuery.data?.meta;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (data.length === 0) {
        return <div>No listings found</div>;
    }

    return <>
        <div className="flex gap-4">
            <h2>User:</h2>
            <p>{loginUserInfo.value.userEmail}</p>
        </div>
        <h1>All Listings</h1>
        <div className="flex flex-col gap-4 m-4">
            {data.map((listing: IListing) => (
                <div key={listing.id} className="border-black border-2 p-2">
                    <p>Listing title: {listing.title}</p>
                    {listing.images &&
                        <img className="w-20" src={`http://localhost:8000/storage/${listing.images}`} alt="image"/>}
                    <BookLists books={listing.books}/>
                    <p>Price: {listing.price}</p>
                </div>
            ))}
        </div>
        <div className="flex gap-2">
            {Array.from({length: meta?.last_page}, (_, i) => i + 1).map(page => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={currentPage === page}
                >
                    {page}
                </button>
            ))}
        </div>
    </>
}