// InfiniteScroll.js
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteScroll = ({ loadMore }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return (
    <div className="load-more" ref={ref}>
      more movies loading...
    </div>
  );
};

export default InfiniteScroll;
