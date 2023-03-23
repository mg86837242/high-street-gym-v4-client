export default function UnderConstruction({ pageName, imageUrl }) {
  return (
    <>
      <h1 className=''>This is my {pageName.toUpperCase()} page</h1>
      <h2>⚒️ Under Construction ⚒️</h2>
      <img
        src={imageUrl}
        alt={`${pageName.toUpperCase()} route's hero image`}
        className='grayscale rounded-3xl transition-all duration-5000 hover:rounded-md'
      />
    </>
  );
}
