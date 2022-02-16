export interface User {
    id: number,
    displayName: string,
    downVotes: number,
    location: string,
    reputation: number,
    upVotes: number,
    views: number,
    websiteUrl: string,
}

export interface UserRequest {
    content: Array<User>,
    totalPages: number,
}