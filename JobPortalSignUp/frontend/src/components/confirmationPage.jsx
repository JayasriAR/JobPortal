import React, { useEffect } from "react";
import Swal from "sweetalert2";

function ConfirmationPage() {
  useEffect(() => {
    Swal.fire({
      title: 'Success!',
      text: 'Thank you for signing up! Your information has been successfully submitted.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }, []); 

  return (
    <div>
      <h2 className="text-center m-2 mt-5">Your form has been submitted!<br></br> YourHR will contact you soon</h2>
    </div>
  );
}

export default ConfirmationPage;
