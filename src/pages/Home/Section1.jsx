import imgUrl from '../../assets/home-section-1.webp';
import { LinkBtn1 } from '../../components/ui/LinkBtn1';

export default function Section1() {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='flex max-w-[1536px] flex-col items-center justify-evenly gap-8 p-8 text-center lg:flex-row lg:gap-4'>
        <div className='flex-[1_0_50%]'>
          <h1>Start Booking</h1>
          <p className='py-6'>
            Are you ready to take your fitness journey to the next level? It&apos;s time to make a powerful decision for
            your health and well-being. Whether you&apos;re a seasoned fitness enthusiast or just beginning your fitness
            odyssey, our expert trainers are here to guide and support you every step of the way. Click the &apos;Start
            Booking&apos; button to kick-start your fitness adventure with our invigorating gym classes.
          </p>
          <LinkBtn1 to='/bookings'>Start Booking</LinkBtn1>
        </div>
        <div className='flex flex-[1_0_50%] items-center justify-center'>
          <img src={imgUrl} className='max-w-sm rounded-lg shadow-2xl' />
        </div>
      </div>
    </div>
  );
}
