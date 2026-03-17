'use client'
import PostForm from "../PostForm";
import PostCard from "../PostCard";
import Pagination from "../Pagination";
import { usePosts } from "@/src/hooks/usePost";

export default function Timeline() {
    const { data, isLoading, isError} = usePosts();
    const posts = data?.posts || [];
    return (
        <div className="flex flex-col gap-8 w-full">
            <PostForm/>
            {posts?.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
            <Pagination/>
        </div>
    )
}