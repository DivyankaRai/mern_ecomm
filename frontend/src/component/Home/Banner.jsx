import Carousel from 'react-bootstrap/Carousel';

function Carrousell() {
  return (
    <>
    <h2>ertyui</h2>
    {/* <p></p> */}
    <Carousel>     
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 mt-3"
          src="https://images-static.nykaa.com/creatives/a180b3ef-abeb-4d33-acea-95a91c4ac1c2/default.jpg?tr=w-1200,cm-pad_resize"
          alt="First slide"
          // style={}
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 mt-3" 
          src="https://images-static.nykaa.com/creatives/2d96fd53-a09e-4598-890c-f3929e03da11/default.jpg?tr=w-1200,cm-pad_resize"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 mt-3"
          src="https://images-static.nykaa.com/uploads/d23b82c7-5fa6-4d22-8ada-0b3d2580d6f1.jpg?tr=w-1200,cm-pad_resize"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default Carrousell;