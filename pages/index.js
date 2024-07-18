import { useState } from 'react';
import Head from 'next/head';
import BlogForm from '../components/BlogForm';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
  };

  return (
    <div>
      <Head>
        <title>Simple Blog App</title>
        <meta name="description" content="Create and display blog entries" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <BlogForm onAddBlog={addBlog} />
        {/* You'll need to implement BlogEntries component to display each blog entry */}
        {/* <BlogEntries blogs={blogs} /> */}
      </main>
    </div>
  );
}
