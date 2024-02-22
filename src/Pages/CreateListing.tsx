import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useMutation, useQuery} from "@tanstack/react-query";
import {getBooks, postListing} from "../Services/HttpServices";
import {useNavigate} from "react-router-dom";
import {loginUserInfo} from "./Login";

type Book = {
    id: number;
    title: string;
    author?: string;
    publisher?: string;
    created_at?: string;
    updated_at?: string;
};

type FormData = {
    title: string;
    bookId: number;
    price: number;
    image: FileList | null | undefined;
};

const CreateListing: React.FC = () => {
    const {register, handleSubmit} = useForm<FormData>();

    const booksQuery = useQuery({
        queryKey: ['books'],
        queryFn: getBooks()
    })

    const navigate = useNavigate();

    const newListingMutation = useMutation({
        mutationFn: postListing,
        onSuccess: () => {
            navigate('/listings')
        }
    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const formData = new FormData();
        if (data.image) formData.append("image", data.image[0]);
        formData.append("title", data.title);
        formData.append("books[]", data.bookId.toString());
        formData.append("price", data.price.toString());
        formData.append("status", "new");
        newListingMutation.mutate(formData)
    };

    if (booksQuery.isLoading) return <div>Loading...</div>
    if (booksQuery.isError) return <div>{JSON.stringify(booksQuery.error)}</div>

    return (
        <div className="bg-blue-200">
            <div className="flex gap-4">
                <h2>User:</h2>
                <p>{loginUserInfo.value.userEmail}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div>
                    <label>Title</label>
                    <input {...register('title', {required: true})}/>
                </div>

                <div>
                    <label>Book Name</label>
                    <select {...register('bookId', {required: true})}>
                        <option value="">Select a book</option>
                        {booksQuery.data.map((book: Book) => (
                            <option key={book.id} value={book.id}>
                                {book.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Price</label>
                    <input {...register('price', {required: true, pattern: /^\d+(\.\d{1,2})?$/})} type="number"
                           step="0.01"/>
                </div>

                <div>
                    <label>Image</label>
                    <input {...register('image', {required: false})} type="file" accept="image/*"/>
                </div>

                <button type="submit">Submit</button>
                {newListingMutation.isPending && <div>I am sending to backend...</div>}
            </form>
        </div>

    );
};

export default CreateListing;
