import { mockPosts } from "@/src/data/posts";
import PostForm from "../PostForm";
import PostCard from "../PostCard";
import Pagination from "../Pagination";

export default function Timeline() {
    return (
        <div className="flex flex-col gap-8">
            <PostForm/>
            {mockPosts.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
            <Pagination/>
        </div>
    )
}