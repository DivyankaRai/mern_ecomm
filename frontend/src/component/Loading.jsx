import Spinner from 'react-bootstrap/Spinner';

export const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-align-items-center  mt-10" style={{width:"100%", marginTop:"15%",}}>
       <Spinner animation="border" variant="primary" size='md'/>
    </div>
  );
};
