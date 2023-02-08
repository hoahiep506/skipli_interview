import { Button, InputText } from '../../component';

const VerifyPage = () => {
  return (
    <div className='h-full w-full center'>
      <div className='bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl w-80'>
        <InputText label='Phone number' containerClassName='mb-3' />
        <InputText label='Access code' containerClassName='mb-6' />
        <div className='flex gap-3'>
          <Button label='Verify' type='button' containerClassName='w-full' />
          <Button label='Send code' type='button' containerClassName='w-full' />
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
