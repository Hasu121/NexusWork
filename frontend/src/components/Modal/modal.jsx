import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


const Modal = (props) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      props.closeModal();
    }
  };

  return (
    <div 
      className='bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-4' 
      onClick={handleBackdropClick}
    >
        <div className='w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden'>
            <div className='flex justify-between items-center p-6 border-b border-gray-200'>
                <div className='text-2xl font-semibold text-gray-800'>{props.title}</div>
                <button 
                  onClick={props.closeModal} 
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300'
                >
                  <CloseIcon className="text-gray-600" />
                </button>
            </div>
            <div className='p-6 overflow-y-auto max-h-[calc(90vh-80px)]'>
              {props.children}
            </div>
        </div>
    </div>
  )
}

export default Modal
