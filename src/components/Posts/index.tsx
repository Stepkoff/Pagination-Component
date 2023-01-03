import React, { useState } from 'react';
import {useGetPostsQuery} from "../../redux/services/postsApi";
import Pagination from "../Pagination";
import Loading from "../Loading";

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsLimit, setPostsLimit] = useState(10);
  const {data, isLoading} = useGetPostsQuery({postsLimit, currentPage});


  return (
    <div className={'countries'}>
      <h1 className={'countries__title'}>Countries</h1>
      {isLoading ? <Loading/>: null}
      <div className={'countries__content'}>
        {data?.data.map(item => (
          <div key={item.id}>{item.id}: {item.title}</div>
        ))}
      </div>
      {data?.data ? <Pagination setCurrentPage={setCurrentPage} pages={Math.ceil(data?.totalCount / postsLimit)}/> : null}
    </div>
  );
};

export default Posts;