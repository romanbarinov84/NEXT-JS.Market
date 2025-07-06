const ProductPage = async ({ params }: { params: { id: string } }) => {
  const decodedCategory = decodeURIComponent(params.id);

  return <div>Сторінка категорії: {decodedCategory}</div>;
};

export default ProductPage;