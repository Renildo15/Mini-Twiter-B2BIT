export type Post = {
  id: string
  author: {
    name: string
    username: string
    avatar?: string
  }
  title: string;
  content: string
  image?: string
  likes: number
  createdAt: string
  hashTags?: Hashtag[]
}

export type Hashtag = {
    name: string;
}

export const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Lucas Costa",
      username: "lucascosta",
      avatar: "/avatars/lucas.png"
    },
    title: "Iniciando um novo processo seletivo! 🚀 ",
    content: "Really excited to share what we've been working on. The team has put in countless hours to make this seamless. Check out the screenshot below!",
    image: "https://img.freepik.com/free-photo/beautiful-shot-forest-with-yellow-green-leafed-trees-with-sun-shining-through-branches_181624-21909.jpg",
    likes: 12,
    hashTags: [
        {
            name: "product"
        },
        {
            name: "launch"
        }
    ],
    createdAt: "2026-02-15"
  },
  {
    id: "2",
    author: {
      name: "Lucas Costa",
      username: "lucascosta",
      avatar: "/avatars/lucas.png"
    },
    title: "Dark Mode is great!",
    content: "Loving the dark mode update on this app. It's so much easier on the eyes at night 😅",
    likes: 8,
    createdAt: "2026-02-15"
  },
  {
    id: "3",
    author: {
      name: "Lucas Costa",
      username: "lucascosta",
      avatar: "/avatars/lucas.png"
    },
    title: "Dark Mode is great!",
    content: "Loving the dark mode update on this app. It's so much easier on the eyes at night 😅",
    likes: 8,
    createdAt: "2026-02-15"
  }
]