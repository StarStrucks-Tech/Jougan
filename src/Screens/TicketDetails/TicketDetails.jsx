import React, { useState, useRef } from 'react';
import { createTicket } from '../../utils/networkHelper';
import './TicketDetails.css';

function TicketDetails() {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const developerRef = useRef(null);
  const statusRef = useRef(null);
  const productRef = useRef(null);
  const typeRef = useRef(null);
  const priorityRef = useRef(null);
  const subjectRef = useRef(null);
  const descriptionRef = useRef(null);

  const toggleErrorState = (message, isError) => {
    setErrorMessage(isError ? message : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    const ticketData = {
      developer: developerRef.current.value,
      status: statusRef.current.value,
      product: productRef.current.value,
      type: typeRef.current.value,
      priority: priorityRef.current.value,
      subject: subjectRef.current.value,
      description: descriptionRef.current.value,
    };
  
    const result = await createTicket(ticketData, toggleErrorState);
    
    setIsLoading(false);
    if (result.success) {
      console.log("Ticket created successfully with ID:", result.id);
      setSuccessMessage("Ticket created successfully");
      // Clear the form
      [developerRef, statusRef, productRef, typeRef, priorityRef, subjectRef, descriptionRef].forEach(ref => {
        if (ref.current) ref.current.value = '';
      });
    } else {
      console.log("Failed to create ticket");
      // Note: Error message is already set by toggleErrorState in createTicket function
    }
  };

  return (
    <>
      <nav className="nav-container">
        <div className="heading-container">
          <span className="ticket">New Ticket</span>
        </div>
      </nav>
      
      <form onSubmit={handleSubmit} className="ticketpage_container">
        <div className="left-section">
          <div className="form-group">
            <label htmlFor="developer">Developer</label>
            <div style={{ position: 'relative' }}>
           <span className="material-icons icon">person</span>
            <select id="developer" name="developer" ref={developerRef}>
              <option value="dev1">Developer 1</option>
              <option value="dev2">Developer 2</option>
            </select>
          </div>
          </div>
          <div className="form-group">
            <label htmlFor="status">Ticket Status</label>
            <select id="status" name="status" ref={statusRef}>
              <option value="done">Done</option>
              <option value="in-progress">In Progress</option>
              <option value="not-started">Not yet started</option>
              <option value="merged">Merged and review</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="product">Ticket Product</label>
            <select id="product" name="product" ref={productRef}>
              <option value="product1">Product 1</option>
              <option value="product2">Product 2</option>
            </select>
          </div>
          <div className="horizontal-group">
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select id="type" name="type" ref={typeRef}>
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" name="priority" ref={priorityRef}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="heading-tab">Subject</div>
          <div className="box1">
            <textarea ref={subjectRef} placeholder="Enter ticket subject" rows="4"></textarea>
          </div>
          <div className="box2">
            <textarea ref={descriptionRef} placeholder="Enter ticket description" rows="4"></textarea>
          </div>
        </div>
        {isLoading && <div className="loading-message">Creating ticket...</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="footer">
          <button type="submit" className="button-submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
}

export default TicketDetails;


// import React from 'react';
// import './TicketDetails.css';

// function TicketDetails() {
//   return (
//     <>
//       <nav className="nav-container">
//         <div className="heading-container">
//           <span className="ticket">New Ticket</span>
//         </div>
//       </nav>

//       <div className="ticketpage_container">
//         <div className="left-section">
//           <div className="form-group">
//             <label htmlFor="developer">Developer</label>
//             <div style={{ position: 'relative' }}>
//               <span className="material-icons icon">person</span>
//               <select id="developer" name="developer" style={{ paddingLeft: '2rem' }}>
//                 <option value="dev1">Developer 1</option>
//                 <option value="dev2">Developer 2</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="status">Ticket Status</label>
//             <select id="status" name="status">
//               <option value="done">Done</option>
//               <option value="in-progress">In Progress</option>
//               <option value="not-started">Not yet started</option>
//               <option value="merged">Merged and review</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="product">Ticket Product</label>
//             <select id="product" name="product">
//               <option value="product1">Product 1</option>
//               <option value="product2">Product 2</option>
//             </select>
//           </div>
//           <div className="horizontal-group">
//             <div className="form-group">
//               <label htmlFor="type">Type</label>
//               <select id="type" name="type">
//                 <option value="bug">Bug</option>
//                 <option value="feature">Feature</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="priority">Priority</label>
//               <select id="priority" name="priority">
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="right-section">
//           <div className="heading-tab">Subject</div>
//           <div className="box1">
//             <textarea placeholder="User views in the first box" rows="4"></textarea>
//           </div>
//           <div className="box2">
//             <textarea placeholder="User views in the second box" rows="4"></textarea>
//           </div>
//         </div>
//       </div>
//       <div className="footer">
//         <button className="button-submit">Submit</button>
//       </div>
//     </>
//   );
// }

// export default TicketDetails;