"use client";

import { client } from "./_trpc/client";

export default function Home() {
  const { mutateAsync, data } = client.test.addTest.useMutation();
  const handleClick = async () => {
    await mutateAsync("test");
  }

  return (
    <div>
      <button onClick={handleClick}>
        submit
      </button>
      {data && <div>{data}</div>}
    </div>
  )
}