import { forwardRef, useImperativeHandle, useState } from 'react';

type TModalProps = {
  children: React.ReactNode;
};

const Modal = (props: TModalProps, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsModalOpen(true),
      closeModal: () => setIsModalOpen(false),
    };
  });

  return (
    <>
      {isModalOpen && (
        <div
          className='fixed inset-0 z-50 bg-black bg-opacity-50 center'
          onClick={() => setIsModalOpen(false)}
        >
          {props.children}
        </div>
      )}
    </>
  );
};

export default forwardRef(Modal);
