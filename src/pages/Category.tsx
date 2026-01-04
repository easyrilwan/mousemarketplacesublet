import { useParams } from "react-router-dom";

export default function Category() {
  const { categoryName } = useParams();
  console.log(categoryName);

  return <div>Category</div>;
}
