import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';
import Image from 'next/image';
import moment from 'moment';
const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  const postImages = (post: any) => {
    const post_images = post.images?.map((image: any, id: number) => (
      <div className="relative w-40 h-40" key={id}>
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt=""
          className="shadow-xl"
        />
      </div>
    ));
    return post_images;
  };

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-gray-100 rounded-xl shadow-xl p-8 w-1/2 m-auto mb-4"
        >
          <div className="text-xl">{post.caption}</div>
          <div className="flex space-x-3">{postImages(post)}</div>
          <p className="text-right text-gray-700 my-3">
            {moment(post.timestamp).fromNow()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
