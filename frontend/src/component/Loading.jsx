import Spinner from 'react-bootstrap/Spinner';

export const Loader = () => {
  return (
    <div style={{width:"15%", margin:"auto", marginTop:"12%"}}>
       {/* <Spinner animation="border" variant="primary" size='md'/> */}
       <img style={{width:"100%"}} src='https://aquamarineexotic.com/adminpanel/assets/images/ajax-spinner.gif' alt=''/>
    </div>
  );
};
// https://i.pinimg.com/originals/34/ed/ee/34edee79ef304420d200a66b69b4bd4a.gif