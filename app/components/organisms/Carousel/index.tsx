'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import { blogPosts } from '@/app/helpers';
import Button from '@/app/components/atoms/button';

const CarouselWrapper = styled.div`
  width: 400px;
  height: 500px;
  border-radius: 7px;
  border: 1px solid #6b7280;
  margin: 3rem auto;
`;

const ImageContainer = styled.div<{ $imgUrl: string }>`
  height: 240px;
  background-image: url(${({ $imgUrl }) => $imgUrl});
  background-size: cover;
  background-position: center;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, auto) 1fr 1fr;
`;

const Carousel = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleSetPosts = () => {
      setPosts(blogPosts);
    }

    handleSetPosts();
  }, []);

  const handleClickNextIndex = () => {
    // add your logic here

    console.log(currentIndex);
  }

  const handleClickPrevIndex = () => {
    // add your logic here
  };

  return (
    <Container>
      {posts.map(
        (post: any, index: number) =>
          index === currentIndex && (
            <CarouselWrapper key={index}>
              <ImageContainer $imgUrl={post.imageUrl} />
              <h1>{post.title}</h1>
              <Button
                variant="outlined"
                onClick={() => handleClickPrevIndex(index)}
              >
                Previous
              </Button>
              <Button variant="outlined" onClick={handleClickNextIndex}>
                Next
              </Button>
            </CarouselWrapper>
          )
      )}
    </Container>
  );
};

export default Carousel;