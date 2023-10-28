const ImageComponent = ({ imageUrl }) => {
  return <img src={imageUrl} alt="Superhero" />;
};

const SuperheroImages = ({ images }) => {
  return (
    <div>
      {images.map((imageUrl, index) => (
        <ImageComponent key={index} imageUrl={imageUrl} />
      ))}
    </div>
  );
};

export default SuperheroImages;
