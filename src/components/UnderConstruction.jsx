export default function UnderConstruction({ pageName, imageUrl }) {
  return (
    <div className='flex flex-col items-center gap-6'>
      <h1 className=''>This is my {pageName.toUpperCase()} page</h1>
      <h2>⚒️ Under Construction ⚒️</h2>
      <img
        src={
          imageUrl ||
          'https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80'
        }
        alt={`${pageName.toUpperCase()} route's hero image`}
        className='grayscale rounded-3xl transition-all duration-5000 hover:rounded-md'
      />
    </div>
  );
}
