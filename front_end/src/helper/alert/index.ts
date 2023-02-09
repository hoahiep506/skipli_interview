import Swal from 'sweetalert2';

export const swalAlert = (text: string, title?: string) => {
  Swal.fire({
    title: title || 'System Message',
    text,
    timer: 2000,
    position: 'top',
    showConfirmButton: false,
    customClass: {
      popup: '!w-[250px] !text-base !font-semibold !h-[130px] !p-2',
      title: '!text-xl !mb-0',
    },
    timerProgressBar: true,
  });
};
