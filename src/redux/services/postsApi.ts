import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
export interface IPost {
  id: number,
  title: string,
  userId: number
}
interface ITransformResponse {
  data: IPost[],
  totalCount: number
}
interface IArguments {
  postsLimit: number,
  currentPage: number,
}
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<ITransformResponse, IArguments>({
      query: ({postsLimit, currentPage}) => ({
        url: '/posts',
        params: {
          _limit: postsLimit,
          _page: currentPage,
        }
      }),
      transformResponse: (data: IPost[], meta: any) => (
        {data, totalCount: Number(meta.response.headers.get('X-Total-Count'))}
      ),
    }),
  })
})
export const {useGetPostsQuery} = postsApi;