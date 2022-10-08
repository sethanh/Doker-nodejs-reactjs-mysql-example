import { toast } from 'react-toastify';

const Message = (message:string, icon:any) => {
  return (
    <div>
      <span className={icon} style={{ color: 'white' }} />
      {'        '}
      {message}
    </div>
  );
};
export const errorNote = (message:string) => {
  const icon = 'fa fa-exclamation-triangle';
  toast.error(Message(message, icon));
};
export const warningNote = (message:string) => {
  const icon = 'fa fa-flash';
  toast.warn(Message(message, icon));
};
export const infoNote = (message:string) => {
  const icon = 'fa fa-headphones';
  toast.info(Message(message, icon), {
    autoClose: 1000,
  });
};
export const successNote = (message:string) => {
  const icon = 'fa fa-check-circle';
  toast.success(Message(message, icon), {
    autoClose: 1000,
  });
};
