

const categoryPage = async ({ params }: { params: { category: string } }) => {
  const decodedCategory = decodeURIComponent(params.category);

  return <div>Сторінка категорії: {decodedCategory}</div>;
};

export default categoryPage;