import { formatDate } from "@/src/utils/format-date"
import { PostType } from "@/types/post"
import Image from "next/image"

interface IPostCardPorps {
    post:PostType
}

export default function PostCard({ post }: IPostCardPorps) {
    function formatUserName(name:string) {
        return `@${name.replace(" ", "").toLowerCase()}`
    }
    return (
        <div className="w-full bg-white rounded-lg border border-[#E2E8F0] p-4">
            <div className="mb-3">
                <span className="text-[#314158] text-[16px] leading-6 font-bold">{post.authorName}</span>
                <span className="text-[#62748E] text-[14px] leading-5"> {formatUserName(post.authorName)} · {formatDate(post.createdAt)}</span>
            </div>
            <div className="mb-3">
                <span className="text-[#314158] text-[18px] leading-7 font-bold">{post.title}</span>
                <p className="text-[#314158] text-[16px] leading-6.5">{post.content}</p>
            </div>
            {post.image && (
                <div className="mb-3">
                    <Image
                        src={post.image}
                        alt=""
                        width={100}
                        height={100}
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            )}
            <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.6901C2 5.6001 4.49 3.1001 7.56 3.1001C9.38 3.1001 10.99 3.9801 12 5.3401C13.01 3.9801 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.6001 22 8.6901C22 15.6901 15.52 19.8201 12.62 20.8101Z" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    )
}