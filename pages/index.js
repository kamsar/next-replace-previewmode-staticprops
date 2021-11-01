import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home({ count }) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("reloading");
      router.replace(router.asPath);
    }, 2000);

    return () => clearInterval(interval);
  }, [count, router]);

  return (
    <div>
      Count is: {count}

      <p>How to reproduce:</p>
      <ol>
        <li>Load this page in server mode (yarn && yarn build && yarn start)</li>
        <li>You will see <em>reloading</em> in the console every two seconds, but the displayed count value will not update. This is good; SSG need not reload props normally.</li>
        <li>Visit <code>/api/hello</code> to turn on preview mode. Now we <em>do</em> want to reload static props, since it is previewing them, but it will keep the cached props instead. This is the bug.</li>
        <li>Reload the page while in preview mode. The count will change, as getStaticProps is being correctly invoked dynamically in preview mode.</li>
      </ol>

      <p>This worked fine in Next 11.2</p>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      count: Math.random(),
    },
  };
}
